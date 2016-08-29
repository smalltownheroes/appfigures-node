'use strict'

const Client = require('../');

const config = {
	client_key: process.env.APPFIGURES_CLIENT_KEY,
	client_secret: process.env.APPFIGURES_CLIENT_SECRET,
	access_token_url: process.env.APPFIGURES_ACCESS_TOKEN_URL,
	request_token_url: process.env.APPFIGURES_REQUEST_TOKEN_URL,
	user_authorization_url: process.env.APPFIGURES_USER_AUTHORIZATION_URL,
	access_token: process.env.APPFIGURES_ACCESS_TOKEN,
	access_token_secret: process.env.APPFIGURES_ACCESS_TOKEN_SECRET,
	api_url: process.env.APPFIGURES_API_URL,
};

describe('Client', () => {

	const client = new Client(config);

	it('is correctly initialized', () => {
		expect(client).to.be.an('object').that.has.property('config');
	});

	it.skip('gets request access tokens', function(done) {
		this.timeout(5000);
		client.getRequestTokens((err, data) => {
			if (err) return done(err);
			expect(client).to.have.property('requestTokens').that.is.an('object');
			expect(client.requestTokens).to.have.property('oauth_token');
			expect(client.requestTokens).to.have.property('oauth_token_secret');
			done();
		});
	});

	it.skip('gets authorization url', function(done) {
		client.getAuthorizationUrl((err, url) => {
			if (err) return done(err);
			done();
		});
	});

	it.skip('gets access tokens', function(done) {
		this.timeout(10000);
		client.getAccessTokens('oauth_req_token', 'oauth_req_token_secret', 'oauth_verifier', (err, tokens) => {
			if (err) return done(err);
			done();
		});
	});

	it.skip('sets access tokens', function() {
		const tokens = {
			oauth_token: 'token',
			oauth_token_secret: 'secret',
		}
		client.setAccessTokens(tokens);
	});

	it('gets oauth headers', function() {
		const oauthHeader = client.getAuthorizationHeader();
	});

	it ('gets downloads for product', function(done) {
		this.timeout(5000);
		client.getDownloads(['41680843951', '41681440814'], '2015-10-01', '2016-09-01', (err, downloads) => {
			if (err) return done(err);
			console.log('--------------->', downloads);
			done()
		});
	});

	it ('gets usages for ga id', function(done) {
		this.timeout(5000);
		client.getUsage(['225289471338'], '2015-10-01', '2016-09-01', (err, usage) => {
			if (err) return done(err);
			console.log('--------------->', usage);
			done()
		});
	});
});
