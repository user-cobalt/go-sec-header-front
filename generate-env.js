import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const dir = './src/environments';
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

const envDev = `export const environment = {
  production: false,
  apiUrl: '${process.env.API_URL}',
  apiKey: '${process.env.API_KEY}',
};
`;

const envProd = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  apiKey: '${process.env.API_KEY}',
};
`;

writeFileSync(join(dir, 'environment.ts'), envDev);
writeFileSync(join(dir, 'environment.prod.ts'), envProd);
console.log('environment files generated successfully');