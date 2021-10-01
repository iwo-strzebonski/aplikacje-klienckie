function readSingleFile(e) {
    let file = e.target.files[0]

    if (!file) {
        return
    }

    let reader = new FileReader()

    reader.onload = function (e) {
        let contents = e.target.result
        main(contents)
    }

    reader.readAsText(file)
}

const renderWoj = (xml) => {
    let path = '/teryt/catalog/row[NAZWA_DOD[text()]="województwo"]'

	let wojList = getNodes(xml, path)
	
	let table = document.createElement('table')
	
	let row = document.createElement('thead')
	let cell = document.createElement('th')
	let tbody = document.createElement('tbody')
	
	cell.innerText = 'NR'
	row.append(cell)
	cell.innerText = 'Województwo'
	row.append(cell)
	table.append(row)
	
	for (let i in wojList) {
		row = document.createElement('tr')
		row.onclick = (e) => renderCities(e, xml)
		
		cell = document.createElement('td')
		
		cell.append(wojList[i].children[0].childNodes[0])
		row.append(cell)
		
		cell = document.createElement('td')
		cell.append(wojList[i].children[4].childNodes[0])
		row.append(cell)
		
		tbody.append(row)
	}
	
	table.append(tbody)
	document.body.append(table)
}

const renderCities = (e, xml) => {
	let wojNum = e.target.parentNode.children[0].innerText
	let wojName = e.target.parentNode.children[1].innerText
	
	let path = `/teryt/catalog/row[NAZWA_DOD[contains(text(), "miasto")] and WOJ[text() = "${wojNum}"]]/NAZWA/text()`
	
	let cityList = getNodes(xml, path)

	let out = cityList.map(function(el) {
		return el.data
	}).join('\n')
	
	alert(wojName + '\n' + out)
}

const getNodes = (xml, path) => {
	let xmlEval = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)
	
	let result = []
	let iter = xmlEval.iterateNext()
	
	while (iter) {
        result.push(iter)
        iter = xmlEval.iterateNext()
    }
	
	return result
}

window.onload = function () {
    document.getElementById('file-input')
        .addEventListener('change', readSingleFile, false)
}

function main(text) {
    let parser = new DOMParser();
    let xml = parser.parseFromString(text, "text/xml")
	
	renderWoj(xml)
}