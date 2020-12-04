const { app, assert } = require('midway-mock/bootstrap');
import * as crypto from 'crypto';

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
  it('should GET /login', () => {
    const pwd = 'gaosong123456';
    const hash = crypto.createHash('md5');
    hash.update(pwd);
    const newpwd = hash.digest('hex');
    console.log(newpwd);
    assert(newpwd === 'f94057c1f1b4e05b53c15b801b0153a5');
  });
});
