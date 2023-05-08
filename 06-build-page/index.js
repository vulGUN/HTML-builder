/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const path = require('path');
const fs = require('fs').promises;

const pathToPD = path.resolve(__dirname, 'project-dist');

// создаем папку project-dist и в ней папку assets
fs.mkdir(pathToPD, { recursive: true });
fs.mkdir(path.resolve(pathToPD, 'assets'), { recursive: true });

// создаем index.html и заменяем в нем шаблонные теги
async function generateHtml() {
  let index = await fs.readFile(path.join(__dirname, 'template.html'), 'utf8');
  const components = await fs.readdir(path.resolve(__dirname, 'components'), { withFileTypes: true });
  for (let i = 0; i < components.length; i += 1) {
    const extantion = new RegExp(path.extname(components[i].name));
    const component = components[i].name.replace(extantion, '');
    if (components[i].isFile() && path.extname(components[i].name) === '.html' && index.includes(`{{${component}}}`)) {
      const regExp = new RegExp(`{{${component}}}`, 'g');
      const html = await fs.readFile(path.resolve(__dirname, 'components', components[i].name), 'utf8');
      index = index.replace(regExp, html);
    }
  }
  await fs.writeFile(path.resolve(pathToPD, 'index.html'), index);
}
generateHtml();

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
      fs.readdir(src, { withFileTypes: true }).then((data2) => {
        for (let i = 0; i < data2.length; i += 1) {
          const copySrc = path.resolve(src, data2[i].name);
          const copyDist = path.resolve(dist, data2[i].name);
          fs.writeFile(copyDist, '').then(() => fs.copyFile(copySrc, copyDist));
        }
      });
    }
  }
});
