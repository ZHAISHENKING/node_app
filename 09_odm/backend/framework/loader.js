const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config');

function load(dir, cb) {
  const url = path.resolve(__dirname, dir);
  const files = fs.readdirSync(url);
  files.forEach(filename => {
    filename = filename.replace('.js', '');
    const file = require(url + '/' + filename);
    cb(filename, file)
  })
}

function loadModel(app) {
  // step1: 连接数据库
  mongoose.connect(config.db.url, config.db.options);
  const conn = mongoose.connection;
  conn.on("error", () => console.error('连接数据库失败'));
  // step2: 将model中的文件与数据库集合关联起来，并存入app
  app.$model = {}
  load('../model', (filename, {schema}) => {
    // app.user = mongoose.model()
    app.$model[filename] = mongoose.model(filename, schema)
  })
}

module.exports = {
  loadModel
};
