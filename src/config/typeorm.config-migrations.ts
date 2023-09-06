import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';

const dataSource = new DataSource(typeOrmConfig);

export async function testDataSource() {
  console.log(await dataSource.createQueryRunner().query('SHOW TABLES'));
}

export default dataSource;
