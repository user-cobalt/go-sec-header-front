const fs = require('fs');

fs.writeFileSync('./src/environments/environment.ts', `export const environment = {
  production: false,
  apiUrl: '${process.env.API_URL}',
  apiKey: '${process.env.API_KEY}',
};
`);

fs.writeFileSync('./src/environments/environment.prod.ts', `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  apiKey: '${process.env.API_KEY}',
};
`);

console.log('environment files overwritten successfully');