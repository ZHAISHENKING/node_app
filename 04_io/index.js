const fs = require('fs') // 二进制io库
const {resolve} = require('path')

// 同步I/O
exports.readFile = ()=>{
  fs.readFile(resolve(__dirname, '.'), (err, result) => {
    console.log('text:', result)
  })
}

// 异步IO
exports.readFileSync = ()=>{
  const result = fs.readFileSync(resolve(__dirname, './text.txt'))
  console.log('text:', result, result.toString())
}

// 异步IO promise化写法
exports.promisify = async ()=>{
  const {promisify} = require('util')
  const readFile = promisify(fs.readFile)
  const result = await readFile(resolve(__dirname, './text.txt'))
  console.log('text:', result.toString())
}

// 图片转base64
exports.imageUrl = ()=>{
  const mime = 'image/png',
    encoding = 'base64',
    base64Data = fs.readFileSync(`${__dirname}/image.jpg`).toString(encoding),
    uri = `data:${mime};${encoding},${base64Data}`;
  fs.writeFileSync(`${__dirname}/index.html`, `<img src='${uri}' />`)
}