/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const path = require('path');
const fs = require('fs').promises;

const pathToPD = path.resolve(__dirname, 'project-dist');

// создаем index.html и заменяем в нем шаблонные теги
async function processFile() {
  try {
    let index = await fs.readFile(path.join(__dirname, 'template.html'), 'utf8');
    if (index.includes('{{header}}')) {
      const header = await fs.readFile(path.resolve(__dirname, 'components', 'header.html'), 'utf8');
      index = index.replace(/{{header}}/g, header);
    }
    if (index.includes('{{articles}}')) {
      const articles = await fs.readFile(path.resolve(__dirname, 'components', 'articles.html'), 'utf8');
      index = index.replace(/{{articles}}/g, articles);
    }
    if (index.includes('{{footer}}')) {
      const footer = await fs.readFile(path.resolve(__dirname, 'components', 'footer.html'), 'utf8');
      index = index.replace(/{{footer}}/g, footer);
    }
    await fs.writeFile(path.resolve(pathToPD, 'index.html'), index);
  } catch (err) {
    console.error(err);
  }
}
processFile();

// создаем папку project-dist и в ней папку assets
fs.mkdir(pathToPD, { recursive: true });
fs.mkdir(path.resolve(pathToPD, 'assets'), { recursive: true });

// считываем папку styles, создаем style.css, записываем в него данные
fs.readdir(path.resolve(__dirname, 'styles'), { withFileTypes: true }).then((files) => {
  fs.writeFile(path.resolve(pathToPD, 'style.css'), '');
  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const pathFile = path.resolve(__dirname, 'styles', file.name);
      fs.readFile(pathFile, 'utf-8', (err) => {
        if (err) throw err;
      }).then((data) => fs.appendFile(path.resolve(pathToPD, 'style.css'), `${data}\n`));
    }
  }
});

// создаем папку assets и копируем в нее файлы
fs.readdir(path.resolve(__dirname, 'assets'), { withFileTypes: true }).then((data) => {
  for (const file of data) {
    const src = path.resolve(__dirname, 'assets', file.name);
    const dist = path.resolve(pathToPD, 'assets', file.name);
    if (file.isFile()) {
      fs.writeFile(dist, '');
      fs.copyFile(src, dist);
    } else if (file.isDirectory()) {
      fs.mkdir(dist, { recursive: true });
      fs.readdir(src).then((data2) => {
        for (let i = 0; i < data2.length; i += 1) {
          const copySrc = path.join(src, data2[i]);
          const copyDist = path.resolve(dist, data2[i]);
          fs.writeFile(copyDist, '');
          fs.copyFile(copySrc, copyDist);
        }
      });
    }
  }
});
