'use strict';

const request = require('request');
const qs = require('querystring')

class Client {

	constructor(config) {
		this.config = config || {};
		if (this.config.access_token && this.config.access_token_secret) {
			this.setAccessTokens({
				oauth_token: this.config.access_token,
				oauth_token_secret: this.config.access_token_secret,
			});
		}
	}

	getRequestTokens(cb) {
		request.post({
			url: this.config.request_token_url,
			formData: {
				oauth_consumer_key: this.config.client_key,
				oauth_callback: 'oob',
				oauth_signature_method: 'PLAINTEXT',
				oauth_signature: `${this.config.client_secret}&`,
				consumer_secret: this.config.client_secret,
			}
		}, (e1, r1, b1) => {
			if (e1) return cb(e1);
			const tokens = qs.parse(b1);
			this.requestTokens = tokens;
			cb(null, tokens);
		});
	}

	getAuthorizationUrl(cb) {
		this.getRequestTokens((err, tokens) => {
			if (err) return cb(err);
			cb(null, `${this.config.user_authorization_url}?oauth_token=${tokens.oauth_token}`);
		});
	}

	getAccessTokens(oauth_token, oauth_token_secret, oauth_verifier, cb) {
		const oauthHeader = `OAuth oauth_signature_method=PLAINTEXT,oauth_verifier=${oauth_verifier},oauth_consumer_key=${this.config.client_key},oauth_token=${oauth_token},oauth_signature=${this.config.client_secret}&${oauth_token_secret}`;
		request.get({
			url: this.config.access_token_url,
			headers: {
				Authorization: oauthHeader,
			},
		}, (err, response, body) => {
			if (err) return cb(err);
			const accessTokens = qs.parse(body);
			this.setAccessTokens(accessTokens);
			cb(null, accessTokens);
		});
	}

	getAuthorizationHeader(){
		return `OAuth oauth_signature_method=PLAINTEXT,oauth_consumer_key=${this.config.client_key},oauth_token=${this.accessTokens.oauth_token},oauth_signature=${this.config.client_secret}&${this.accessTokens.oauth_token_secret}`;
	}

	get(apiPath, cb) {
		const getUrl = `${this.config.api_url}/${apiPath}`;
		request.get({
			url: getUrl,
			headers: {
				Authorization: this.getAuthorizationHeader(),
			},
		}, (err, response, body) => {
			if (err) return cb(err);
			cb(null, body);
		});
	}

	getProducts(cb){
		this.get('/products/mine', cb);
	}

	setAccessTokens(tokens) {
		this.accessTokens = tokens;
	}

	getDownloads(productIds, start_date, end_date, cb) {
		const products = productIds.join(';');
		this.get(`/reports/sales/?products=${products}&group_by=date&start_date=${start_date}&end_date=${end_date}`, cb);
	}

	getUsage(productIds, start_date, end_date, cb) {
		const products = productIds.join(';');
		this.get(`/reports/usage/?storefront=google_analytics&products=${products}&group_by=date&start_date=${start_date}&end_date=${end_date}`, cb);
	}
}

module.exports = Client;
