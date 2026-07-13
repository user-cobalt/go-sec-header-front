const fs = require('fs');
const path = require('path');

const dir = './src/environments';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
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

fs.writeFileSync(path.join(dir, 'environment.ts'), envDev);
fs.writeFileSync(path.join(dir, 'environment.prod.ts'), envProd);
console.log('environment files generated successfully');