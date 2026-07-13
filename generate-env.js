const fs = require('fs');
const path = require('path');

const dirPath = './src/environments';
const filePath = path.join(dirPath, 'environment.prod.ts');


if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const envConfig = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL || "https://your-go-backend.com"}'
};
`;

fs.writeFileSync(filePath, envConfig);
console.log(`Environment file generated successfully at ${filePath}`);