const fs = require('fs');
const path = require('path');

console.log('Current directory:', process.cwd());
console.log('API_URL:', process.env.API_URL ? 'set' : 'NOT SET');
console.log('API_KEY:', process.env.API_KEY ? 'set' : 'NOT SET');

const dir = './src/environments';
console.log('Directory exists:', fs.existsSync(dir));

if (!fs.existsSync(dir)) {
  console.log('Creating directory...');
  fs.mkdirSync(dir, { recursive: true });
  console.log('Directory created:', fs.existsSync(dir));
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