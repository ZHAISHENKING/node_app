/**
 * 文件系统读写数据库
 * @type {module:fs}
 */
const fs = require('fs');

function get(key) {
  fs.readFile('./db.json', (err, data) => {
    const json = JSON.parse(data.toString());
    console.log(json[key])
  })
}

function set(key, val) {
  fs.readFile('./db.json', (err, data) => {
    // 空文件则设置为空对象
    const json = data.toString() ? JSON.parse(data.toString()) : {};
    console.log(json);
    json[key] = val;
    // 重新写入文件
    fs.writeFile('./db.json', JSON.stringify(json), err => {
      if (err) console.log(err);
      console.log('写入成功')
    })
  })
}

// 命令行接口部分
const readLine = require('readline');
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', input => {
  const [op, key, val] = input.split(' ');

  if (op === 'get') get(key);
  else if (op === 'set') set(key, val);
  else if (op === 'quit') rl.close();
  else console.log('没有该操作')
});

rl.on('close', function () {
  console.log('程序结束');
  process.exit();
});