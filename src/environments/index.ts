import * as dotenv from 'dotenv';
import * as Joi from 'joi';
dotenv.config();

interface PgConfig {
  PG_SSL: boolean;
  PG_HOST: string;
  PG_PORT: number;
  PG_USER: string;
  PG_DATABASE: string;
  PG_PASSWORD: string;
}

const pgSchema = Joi.object<PgConfig>({
  PG_SSL: Joi.boolean().required(),
  PG_HOST: Joi.string().required(),
  PG_PORT: Joi.number().required(),
  PG_USER: Joi.string().required(),
  PG_DATABASE: Joi.string().required(),
  PG_PASSWORD: Joi.string().required().default(''),
});

const pgConfig = pgSchema.validate(
  {
    PG_SSL: process.env.PG_SSL,
    PG_HOST: process.env.PG_HOST,
    PG_PORT: process.env.PG_PORT,
    PG_USER: process.env.PG_USER,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_PASSWORD: process.env.PG_PASSWORD,
  },
  { abortEarly: true },
).value;

export { pgConfig };
