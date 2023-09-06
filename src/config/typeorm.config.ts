import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { pgConfig } from 'src/environments';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<PostgresConnectionOptions> => ({
    type: 'postgres',
    ssl: pgConfig.PG_SSL,
    host: pgConfig.PG_HOST,
    port: pgConfig.PG_PORT,
    username: pgConfig.PG_USER,
    database: pgConfig.PG_DATABASE,
    password: pgConfig.PG_PASSWORD,
    entities: ['dist/entities/**/*{.js,.ts}'],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
  }),
};

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  ssl: pgConfig.PG_SSL,
  host: pgConfig.PG_HOST,
  port: pgConfig.PG_PORT,
  username: pgConfig.PG_USER,
  database: pgConfig.PG_DATABASE,
  password: pgConfig.PG_PASSWORD,
  entities: ['dist/entities/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  namingStrategy: new SnakeNamingStrategy(),
};
