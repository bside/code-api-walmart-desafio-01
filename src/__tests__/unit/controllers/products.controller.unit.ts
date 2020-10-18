import {Client, expect} from '@loopback/testlab';
import {App} from '../../../';
import {
  setupApplication,
  givenProduct,
  givenProductPalindrome,
  givenProductNumberPalindrome,
}
from '../../helpers/helpers';

describe('ProductsControllerUnit', () => {
  let app: App;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /products with no palindrome search', async () => {
    const res = await client.get('/products?filter={"where":{"custom":"100"}}').expect(200);
    const stub = givenProduct();
    expect(res.body).to.containEql(stub);
  });

  it('invokes GET /products with palindrome text search', async () => {
    const res = await client.get('/products?filter={"where":{"custom":"dsaasd"}}').expect(200);
    const stub = givenProductPalindrome();
    expect(res.body).to.containEql(stub);
  });

  it('invokes GET /products with palindrome ID search', async () => {
    const res = await client.get('/products?filter={"where":{"custom":181}}').expect(200);
    const stub = givenProductNumberPalindrome();
    expect(res.body).to.containEql(stub);
  });
});
