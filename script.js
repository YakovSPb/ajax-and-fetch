const url = 'https://www.cbr-xml-daily.ru/daily_json.js'
const method = 'GET'
const isAsync = false

let valutes = null

const converter = new Proxy({}, {
	get (target, name) {
		if (target[name] !== undefined) {
			return target[name]
		}

		const key = '_to_'
		const indexOfKey = name.indexOf(key)
		const fromCurrency = name.slice(0, indexOfKey)
		const toCurrency = name.slice(indexOfKey + key.length)

		const fromNominal = valutes[fromCurrency].Nominal
		const fromValue = valutes[fromCurrency].Value

		const toNominal = valutes[toCurrency].Nominal
		const toValue = valutes[toCurrency].Value

		return val => val * fromValue / fromNominal / toValue
	}
})

main8()

// function main1() {
// 	const request = new XMLHttpRequest()
// 	request.open(method, url, isAsync)
// 	request.send()

// 	const data = JSON.parse(request.response)
// 	console.log(request)

// }

// function main2 () {
// 	const request = jQuery.ajax({	method,	url,
// 		error (err) {
// 			console.log(err)
// 		}
// 	})
	

// 	request.done(data => {
// 		console.log(data)
// 	})
// }

// function main3 () {
// 	const params = { method, url}

// 	jQuery
// 	.ajax(params)
// 	.done(data => {
// 		data = JSON.parse(data)
// 		console.log(data)
// 	})
// }

// async function main4() {
// 	const params = { method, url }

// 	const request = await jQuery.ajax(params)
// 	const data = JSON.parse(request)

// 	console.log(data)
// }

// function main5 () {
// 	const request = fetch(url)

// 	const jsonStream = request.then(responce => {
// 		return responce.json()
// 	}).catch(err => {
// 		console.log(err)
// 	})

// 	jsonStream.then(data => {
// 		console.log(data)
// 	}).catch(err => {
// 		console.log(err)
// 	})
// }

// function main6 () {
// 	fetch(url)
// 	.then(responce => responce.json())
// 	.then(data => console.log(data))
// 	.catch(err  => {
// 		console.log(err)
// 	})
// }

// async function main7 () {
// 	const responce = await fetch(url)
// 	const data = await responce.json()

// 	console.log(data)
// }

async function main8 () {
	const responce = await fetch(url)
	const data = await responce.json()

	valutes = data.Valute
	
	const result = converter.AMD_to_AUD(100)
	console.log(result)

}



