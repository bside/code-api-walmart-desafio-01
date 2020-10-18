import {Client, expect} from '@loopback/testlab';
import {App} from '../..';
import {setupApplication, givenProduct} from '../helpers/helpers';

describe('ProductsControllerAcceptance', () => {
  let app: App;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /products (filter id = 100)', async () => {
    const res = await client.get('/products?filter={"where":{"custom":"100"}}').expect(200);
    const stub = givenProduct();
    expect(res.body).to.containEql(stub);
  });
});
