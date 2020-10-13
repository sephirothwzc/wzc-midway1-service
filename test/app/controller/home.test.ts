const { app, assert } = require('midway-mock/bootstrap');

describe('test/app/controller/home.test.ts', () => {
  it('should assert', async () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
    // const ctx = app.mockContext({});
    // await ctx.service.xx();
  });

  it('should GET /api/hello', () => {
    return app
      .httpRequest()
      .get('/api/hello')
      .expect('Welcome to new word!')
      .expect(200);
  });
});
