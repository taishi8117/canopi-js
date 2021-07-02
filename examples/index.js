const canopi = require('canopi-climate');
const { Client } = canopi;
const client = new Client({ apiKey: "" });



client.getProjects();