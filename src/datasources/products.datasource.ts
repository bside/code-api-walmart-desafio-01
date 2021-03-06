import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Products',
  connector: 'mongodb',
  url: '',
  host: 'code.qdzze.mongodb.net',
  port: 27017,
  user: 'productListUser',
  password: 'productListPassword',
  database: 'promotions',
  useNewUrlParser: true,
  authSource: 'admin',
  protocol: 'mongodb+srv',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProductsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Products';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Products', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
