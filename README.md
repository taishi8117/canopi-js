# Canopi Climate API client for TypeScript

An API client for Canopi Climate API.

[Documentation](https://www.canopi.cash/api-docs)


```javascript
const canopi = require('canopi-climate');
const { Client } = canopi;

const API_KEY = process.env.CANOPI_API_KEY;

const client = new Client({
    apiKey: API_KEY
});

client.getProjects().then(
    v => console.log(v)
).catch(err => console.log(err));
```


