export interface Project {
	id: string;
	provider: string;
	name: string;
	slug: string;
	cents_per_kg: string;
	images?: string[];
	project_url?: string;
	description?: string;
	metadata: { [key: string]: string };
}

export interface CryptoAddressDetails {
	address: string;
	currency: 'BTC' | 'ETH';

	query_ts: Date;
	start_ts: Date;
	end_ts: Date;
	scope_desc: string;

	is_contract?: boolean;
	total_transactions?: number;
	total_transactions_in_scope?: number;
	total_gas_used?: number;
	total_gas_in_scope?: number;
	balance?: number;
}

export interface Emission {
	model_version: string;
	timestamp: Date;
	total: number;
	unit: string;
	lower?: number;
	upper?: number;
}

export interface TotalEmission {
	total: number;
	unit: string;
	query_ts?: Date;
	start_ts?: Date;
	end_ts?: Date;
}

export interface TotalOffset {
	total: number;
	total_filled: number;
	unit: string;
}

export interface CryptoFootprintCalculation {
	uuid: string;
	type: 'crypto';
	address_details?: CryptoAddressDetails;
	emission: Emission;
}

export interface CryptoAddress {
	address: string;
	currency: 'BTC' | 'ETH';
}

export interface MonetaryAmount {
	value: number;
	currency: string;
}

export interface Transaction {
	amount: MonetaryAmount;
	reference: string;
	timestamp: Date;
	plaid_category_code: string;

	note?: string;
	name?: string;
	merchant_name?: string;
	payment_channel?: string;
}

export interface TransactionFootprintCalculation {
	uuid: string;
	type: 'transaction';
	transaction: Transaction;
	category_id: number;
	emission: Emission;
}

export type Calculation = TransactionFootprintCalculation | CryptoFootprintCalculation;

export interface Order {
	id: string;
	status: string;
	payment_method: string;

	stripe_session_id?: string;
	stripe_payemnt_intent_id?: string;

	project_id: string;
	project_slug: string;
	project_name: string;
	cents_per_kg: number;
	amount_co2_kg: number;
	total_cents: number;

	calculation_ids: string[];
	timestamps: { [status: string]: Date };
}

export interface Stats {
	total_emission: TotalEmission;
	total_offset: TotalOffset;
}