import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST?: string;
      DB_PORT?: string;
      DB_USERNAME?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
    }
  }
}

// function checkEnvVar(key: string) {
//   if (!process.env[key]) {
//     throw new Error(`The environment variable is not defined: ${key}.`);
//   }
// }

// function checkEnv() {
//   ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'].forEach(
//     checkEnvVar,
//   );
// }

dotenv.config();

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = +process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

Logger.log(
  'env',
  JSON.stringify({
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
  }),
);

// checkEnv();