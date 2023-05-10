const fs = require('fs');
const path = require('path');

const { stdin, stdout, exit } = process;
const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
});

stdout.write('Здравствуйте, введите текст\n');
stdin.on('data', (data) => {
  if (data.includes('exit')) {
    exit();
  } else {
    fs.appendFile(filePath, data, (err) => {
      if (err) throw err;
    });
  }
});
process.on('SIGINT', () => {
  exit();
});
process.on('exit', () => {
  stdout.write('До свидания\n');
});
