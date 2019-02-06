var request = require('supertest');
describe('loading express', function () {
  var server;
  before(() => {
    server = require('../server');
  });
  after(() => {
    server.close();
  });
  describe('Routes', () => {
    let routes200 = ['/', '/calendar', '/podcast', '/gallery', '/assets/test_file', '/js/test_file', '/css/test_file'];

    routes200.forEach(route => {
      describe(route, function () {
        it('Should return 200 on a GET request.', (done) => {
          request(server)
            .get(route)
            .expect(200, done);
        });
      });
    });

    let routes404 = ['/test', '/foo', '/package.json'];

    routes404.forEach(route => {
      describe(route, () => {
        it("Should return 404 on a GET request.", (done) => {
          request(server)
            .get(route)
            .expect(404, done);
        });
      });
    });

  });
});