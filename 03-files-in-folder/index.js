/* eslint-disable no-restricted-syntax */
const path = require('path');
const fs = require('fs').promises;

const { stdout } = process;
const pathToFolder = path.join(__dirname, 'secret-folder');

async function f() {
  try {
    const files = await fs.readdir(pathToFolder, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        // eslint-disable-next-line no-await-in-loop
        const stats = await fs.stat(path.join(pathToFolder, file.name));
        const newFileName = file.name.replace(/\..*/, '');
        stdout.write(`${newFileName} - ${path.extname(file.name).slice(1)} - ${stats.size / 1024}kb\n`);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
f();
