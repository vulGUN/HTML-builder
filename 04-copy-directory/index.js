const path = require('path');
const fs = require('fs').promises;
const pathToFolder = path.join(__dirname, 'files');

fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
  if (err) throw err;
});
fs.readdir(pathToFolder).then((files) => {
  console.log(files);
});
