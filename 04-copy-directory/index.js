const path = require('path');
const fs = require('fs').promises;

const pathToFolder = path.join(__dirname, 'files');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
fs.readdir(path.join(__dirname, 'files-copy')).then((files) => {
  for (let i = 0; i < files.length; i += 1) {
    const dist = path.resolve(__dirname, 'files-copy', files[i]);
    fs.unlink(dist);
  }
  fs.readdir(pathToFolder).then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      const src = path.join(pathToFolder, data[i]);
      const dist = path.resolve(__dirname, 'files-copy', data[i]);
      fs.writeFile(dist, '', (err) => {
        if (err) throw err;
      });
      fs.copyFile(src, dist);
    }
  });
});
