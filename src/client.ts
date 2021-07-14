import * as fetchImport from 'isomorphic-unfetch'
import { Calculation, CryptoAddress, CryptoFootprintCalculation, Order, Project, Stats, TotalEmission, Transaction, TransactionFootprintCalculation } from './models';
const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default

export class Client {
	apiKey: string;
	basePath: string;

	constructor(config: { apiKey: string; basePath?: string }) {
		this.apiKey = config.apiKey;
		this.basePath = config.basePath || 'https://api.canopi.cash/v0';
	}

	async request(endpoint: string = "", options: any = {}) {
		let url = this.basePath + endpoint;

		let headers = {
			'X-API-KEY': this.apiKey,
			'Content-Type': 'application/json'
		};

		let config = {
			...options,
			headers,
		};

		return fetch(url, config).then(r => {
			if (r.ok) {
				return r.json();
			}
			throw new Error(`Error ${r.status} at ${r.url}`);
		});
	}

	async calculateCryptoEmissions(addresses: CryptoAddress[]): Promise<{ footprints: CryptoFootprintCalculation[] }> {
		return this.request('/emission/calculate/crypto', {
			method: 'POST',
			body: JSON.stringify({ addresses })
		});
	}

	async calculateCryptoAverageEmissions(currency: 'BTC' | 'ETH', balance: number, start: Date, end: Date): Promise<CryptoFootprintCalculation> {
		const body = JSON.stringify({
			currency,
			balance,
			start,
			end
		});
		return this.request('/emission/calculate/crypto/average', {
			method: 'POST',
			body: body,
		});
	}

	async calculateTransactionEmissions(transactions: Transaction[]): Promise<{ footprints: TransactionFootprintCalculation[] }> {
		return this.request('/emission/calculate/transactions', {
			method: 'POST',
			body: JSON.stringify({ transactions })
		});
	}

	async calculateActivityEmissions(activities) {
		return this.request('/emission/calculate/activity', {
			method: 'POST',
			body: JSON.stringify({ activities })
		});
	}

	async getEmissionHistory(): Promise<{ calculations: Calculation[] }> {
		return this.request('/emission/history', { method: 'GET' });
	}

	async getTotalEmission(): Promise<TotalEmission> {
		return this.request('/emission/history/total', { method: 'GET' });
	}

	async getProjects(): Promise<Project[]> {
		return this.request('/removal/projects', { method: 'GET' });
	}

	async getProjectDetailById(id: string): Promise<Project> {
		return this.request(`/removal/project/${id}`, { method: 'GET' });
	}

	async offsetCalculations(calculation_ids: string[], project_id: string): Promise<Order> {
		return this.request('/removal/offset/calculation', {
			method: 'POST',
			body: JSON.stringify({ calculation_ids, project_id })
		});
	}

	async createOrder(amount: number, project_id: string): Promise<Order> {
		return this.request('/removal/order', {
			method: 'POST',
			body: JSON.stringify({ amount_co2_kg: amount, project_id })
		});
	}

	async listOrders(): Promise<Order[]> {
		return this.request('/removal/orders', { method: 'GET' });
	}

	async getOrderDetailById(id: string): Promise<Order> {
		return this.request(`/removal/order/${id}`, { method: 'GET' });
	}

	async getMyStats(): Promise<Stats> {
		return this.request('/user/stats', { method: 'GET' });
	}

}
