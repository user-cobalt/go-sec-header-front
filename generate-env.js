const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'src', 'environments');
const prodPath = path.join(targetDir, 'environment.prod.ts');
const devPath = path.join(targetDir, 'environment.ts'); // The missing base file

console.log(`[Env Generator] Ensuring directory exists: ${targetDir}`);

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const devConfig = `export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};`;
fs.writeFileSync(devPath, devConfig, 'utf8');
console.log(`[Env Generator] Wrote base file to: ${devPath}`);


const prodConfig = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL || ""}'
};`;
fs.writeFileSync(prodPath, prodConfig, 'utf8');
console.log(`[Env Generator] Wrote production file to: ${prodPath}`);