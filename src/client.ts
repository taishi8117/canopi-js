import fetch from 'isomorphic-unfetch';

export class Client {
	apiKey: string;
	basePath: string;

	constructor(config: { apiKey: string; }) {
		this.apiKey = config.apiKey;
		this.basePath = 'https://api.canopi.cash/v0';
	}

	request(endpoint: string = "", options: any = {}) {
		let url = this.basePath + endpoint;

		let headers = {
			'X-API-KEY': this.apiKey,
			'Content-Type': 'application/json'
		};

		let config = {
			...options,
			...headers
		};

		return fetch(url, config).then(r => {
			if (r.ok) {
				return r.json();
			}
			throw new Error(`Error ${r.status} at ${r.url}`);
		});
	}

	calculateCryptoEmissions(addresses) {
		return this.request('/emission/calculate/crypto', {
			method: 'POST',
			body: JSON.stringify({ addresses })
		});
	}

	calculateTransactionEmissions(transactions) {
		return this.request('/emission/calculate/transaction', {
			method: 'POST',
			body: JSON.stringify({ transactions })
		});
	}

	calculateActivityEmissions(activities) {
		return this.request('/emission/calculate/activity', {
			method: 'POST',
			body: JSON.stringify({ activities })
		});
	}

	getEmissionHistory() {
		return this.request('/emission/history', { method: 'GET' });
	}

	getProjects() {
		return this.request('/removal/projects', { method: 'GET' });
	}

	getProjectDetailById(id) {
		return this.request(`/removal/project/${id}`, { method: 'GET' });
	}

	offsetCalculation(calculation_id, project_id) {
		return this.request('/removal/offset/calculation', {
			method: 'POST',
			body: JSON.stringify({ calculation_id, project_id })
		});
	}

	createOrder(options) {
		return this.request('/removal/order', {
			method: 'POST',
			body: JSON.stringify(options)
		});
	}

	getOrders() {
		return this.request('/removal/orders', { method: 'GET' });
	}

	getOrderDetailById(id) {
		return this.request(`/removal/order/${id}`, { method: 'GET' });
	}
}
