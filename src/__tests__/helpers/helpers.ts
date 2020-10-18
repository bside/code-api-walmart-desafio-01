import {App} from '../..';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';
import {juggler} from '@loopback/repository';
import {Products} from '../../models';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // port: +process.env.PORT,
  });

  const app = new App({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: App;
  client: Client;
}

export function givenProduct(product?: Partial<Products>) {
  const data = Object.assign(
    {
      id: 100,
      brand: "qeiydij",
      description: "cxzbz lahbhe",
      image: "www.lider.cl/catalogo/images/computerIcon.svg",
      price: 756530
    },
    product,
  );
  // return new Products(data);
  return data;
}

export function givenProductPalindrome(product?: Partial<Products>) {
  const data = Object.assign(
    {
      id: 435,
      brand: "dsaasd",
      description: "vuaj vxdujoqz",
      image: "www.lider.cl/catalogo/images/homeIcon.svg",
      price: 231090,
      discountPercentage: 50,
      originalPrice: 462179
    },
    product,
  );
  // return new Products(data);
  return data;
}

export function givenProductNumberPalindrome(product?: Partial<Products>) {
  const data = Object.assign(
    {
      id: 181,
      brand: "rvblsml",
      description: "goeyxg nbowu",
      image: "www.lider.cl/catalogo/images/toysIcon.svg",
      price: 387861,
      discountPercentage: 50,
      originalPrice: 775722
    },
    product,
  );
  // return new Products(data);
  return data;
}

export const testdb: juggler.DataSource = new juggler.DataSource({
  name: 'db',
  connector: 'memory',
});
