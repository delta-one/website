const supertest = require('supertest');

describe('Routes', () => {
	let server;
	before(() => {
		server = require('../index');
	});
	after(() => {
		server.close();
	});

	describe('Valid routes', () => {
		let routes = ['/api/calendar'];

		routes.forEach(route => {
			it('GET ' + route, done => {
				supertest(server)
				.get(route)
				.expect(200, done);
			});
		});
	});

	describe('Invalid routes', () => {
		let routes = ['/api/test', '/api/foo', '/api/package.json'];

		routes.forEach(route => {
			it('GET ' + route + ' => 404', done => {
				supertest(server)
					.get(route)
					.expect(404, done);
			});
		});
	});
});
