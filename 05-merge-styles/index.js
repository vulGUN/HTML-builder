const path = require('path');
const fs = require('fs').promises;
const pathToPD = path.resolve(__dirname, 'project-dist');

fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }).then((files) => {
  fs.writeFile(path.resolve(pathToPD, 'bundle.css'), '');
  for (let file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const pathFile = path.resolve(__dirname, 'styles', file.name);
      fs.readFile(pathFile, 'utf-8', (err) => {
        if (err) throw err;
      }).then((data) => fs.appendFile(path.resolve(pathToPD, 'bundle.css'), `${data}\n`));
    }
  }
});
