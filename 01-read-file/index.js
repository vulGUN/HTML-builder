const path = require('path');
const fs = require('fs');

const { stdout, exit } = process;

fs.readFile(path.join(__dirname, 'text.txt'), 'utf-8', (err, data) => {
  if (err) throw err;
  stdout.write(data);
  exit();
});
