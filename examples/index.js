const canopi = require('canopi-climate');
const { Client } = canopi;

const API_KEY = process.env.CANOPI_API_KEY;

const client = new Client({ apiKey: API_KEY });


client.getProjects().then(
	v => console.log(v)
).catch(err => console.log(err));