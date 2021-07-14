const canopi = require('canopi-climate');
const moment = require('moment');
const { Client } = canopi;

const BASE_PATH = process.env.CANOPI_API_BASE || 'https://api.canopi.cash/v0';
const API_KEY = process.env.CANOPI_API_KEY;

if (!API_KEY) {
	throw Error("API key must be specified");
}

async function example() {
	const client = new Client({ apiKey: API_KEY, basePath: BASE_PATH });

	const projects = await client.getProjects();
	console.log('Our project partners:')
	console.log(projects);

	const crypto_footprint = await client.calculateCryptoAverageEmissions(
		'BTC',
		0.75,
		moment().subtract(1, 'year').toDate(),
		moment().toDate(),
	);
	console.log('Footprint of holding 0.75 BTC for a year:')
	console.log(crypto_footprint)

	const txn_footprints = await client.calculateTransactionEmissions([{
		amount: {
			value: 120.50,
			currency: 'USD',
		},
		reference: 'Test transaction',
		timestamp: moment().toDate(),
		// airlines
		plaid_category_code: "22001000", 
		note: "Flight ticket",
		name: "United Airlines",
		merchant_name: "United Airlines",
	}]);
	console.log("Footprint of a financial transaction:")
	console.log(txn_footprints['footprints'][0]);


	const stats = await client.getMyStats();
	console.log('My stats:')
	console.log(stats);

	const orders = await client.listOrders();
	console.log('My orders:');
	console.log(orders);

}

example()