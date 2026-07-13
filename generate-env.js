const fs = require('fs');
const path = require('path');

// 1. Resolve path relative to where the command is running
const targetDir = path.join(process.cwd(), 'src', 'environments');
const targetPath = path.join(targetDir, 'environment.prod.ts');

console.log(`[Env Generator] Ensuring directory exists: ${targetDir}`);

// 2. Create the directory if it's missing
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// 3. Define your environment properties
const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL || ""}'
};`;

// 4. Write the file using the absolute targetPath variable
fs.writeFileSync(targetPath, envConfigFile, 'utf8');

console.log(`[Env Generator] Successfully wrote environment file to: ${targetPath}`);