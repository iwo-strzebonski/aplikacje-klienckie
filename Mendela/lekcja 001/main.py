'''
Simple script used to recursively scrape liks and e-mail addresses
using urllib and save them to a JSON file
'''

import urllib.request
import re
import json
import shutil
import tempfile

from socket import timeout
from http.client import InvalidURL
from urllib.error import HTTPError, URLError

__author__ = 'Iwo Strzeboński'
__license__ = 'WTFPL'
__version__ = '1.0.0'


def get_links(url: str, rec: int) -> None:
    '''Generates list of 10 links and 10 e-mail adresses from a website

    Args:
        url (str): Website's URL address
        rec (int): Recursive counter
    '''

    links = []
    mails = []

    try:
        with urllib.request.urlopen(url, timeout=5) as response:
            with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
                shutil.copyfileobj(response, tmp_file)
    except (InvalidURL, HTTPError, URLError, ConnectionResetError, timeout):
        pass
    else:
        with open(tmp_file.name, 'r', encoding='utf-8') as html:
            try:
                data = html.read()
                links = re.findall(REGEX_L, data)[:10]
                mails = re.findall(REGEX_M, data)[:10]
            except UnicodeDecodeError:
                pass

    ADDRS.append({'url': url, 'links': links, 'mails': mails})

    if rec > 0:
        for link in links:
            get_links(link, rec-1)

RECURSIVE = 3
ADDRS = []
REGEX_L = r'a .*?href=\"(https?:\/\/[^\#]*?)\"'
REGEX_M = r'([\w.+-]+@[\w-]+\.[\w.-]+)'
URL = \
    'https://www.zoho.com/mail/how-to/choose-a-professional-email-address.html'

if __name__ == '__main__':
    get_links(URL, RECURSIVE)

    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(ADDRS, f)
        f.close()

    print('\aDone!')
