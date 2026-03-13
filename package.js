const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const outputFile = 'package.zip';
const sourceDir = __dirname;
const ignoreList = ['.git', 'node_modules', '.DS_Store', 'package.js', outputFile];
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        const relativePath = path.relative(sourceDir, fullPath);
        if (ignoreList.includes(file)) {
            return;
        }
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push({
                fullPath: fullPath,
                relativePath: relativePath
            });
        }
    });
    return arrayOfFiles;
}
console.log('开始打包...');
const files = getAllFiles(sourceDir);
const fileArgs = files.map(f => `"${f.relativePath}"`).join(' ');
const cmd = `zip -r "${outputFile}" . -x "*.git*" -x "package.js" -x "${outputFile}"`;
execSync(cmd, { cwd: sourceDir, stdio: 'inherit' });
console.log(`\n打包完成: ${outputFile}`);
console.log(`共打包 ${files.length} 个文件`);
