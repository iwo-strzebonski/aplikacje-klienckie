import re
import json
import pprint
import shutil
import tempfile
from datetime import datetime


import urllib.request
from http.client import InvalidURL
from urllib.error import HTTPError, URLError

open('data.json', 'w', encoding='utf-8').close()

regexL = 'a .*?href=\"(https?:\/\/[^\#]*?)\"'
regexM = '^\S+@\S+\.\S+$'
url = 'https://tl.krakow.pl/'

addrs = []
recursive = 3

def getLinks(url : str, rec : int) -> list:
    global addrs

    links = []
    mails = []

    try:
        with urllib.request.urlopen(url) as response:
            with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
                shutil.copyfileobj(response, tmp_file)
    except (InvalidURL, HTTPError, URLError, ConnectionResetError):
        links = []
        mails = []
    else:
        with open(tmp_file.name) as html:
            try:
                links = re.findall(regexL, html.read())
                mails = re.findall(regexL, html.read())
            except UnicodeDecodeError:
                links = []
                mails = []
            else:
                links = links[:10]
                mails = mails[:10]

    with open('data.json', 'a', encoding='utf-8') as f:
        json.dump({'url': url, 'links': links, 'mails': mails}, f)
        f.write('\n')

    if rec > 0:
        [getLinks(url, rec-1) for url in links]
    
    return


start = datetime.utcnow().timestamp() * 1000
getLinks(url, recursive)
stop = datetime.utcnow().timestamp() * 1000

with open('data.json', 'r+', encoding='utf-8') as f:
    json.dump(f.readlines(), f, indent=2)

print(stop - start)

# with open('data.json', 'w', encoding='utf-8') as f:
#     json.dump(addrs, f, ensure_ascii=False, indent=4)
