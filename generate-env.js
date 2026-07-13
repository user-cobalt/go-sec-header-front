const fs = require('fs');

const env = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  apiKey: '${process.env.API_KEY}',
};
`;

fs.writeFileSync('./src/environments/environment.prod.ts', env);
console.log('environment.prod.ts generated successfully');