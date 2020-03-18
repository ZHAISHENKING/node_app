const http = require('http')
const fs = require('fs')
const rs2 = fs.createReadStream('../04_io/image.jpg')
const ws2 = fs.createWriteStream('./01.jpg')

rs2.pipe(ws2)

const server = http.createServer((request, response) => {
  // 显示首页
  const {url, method, headers} = request;
  if (url === '/' && method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        response.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'});
        response.end('500,服务器错误')
      }
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html')
      response.end(data);
    })
  } else if (url === '/users' && method === 'GET') {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({name: 'tom', age: 20}))
  } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
    fs.createReadStream('.' + url).pipe(response)
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain;charset=utf-8');
    response.end('404, 页面没有找到')
  }
})
server.listen(3000);

// 打印原型链
function getPrototypeChain(obj) {
  let protoChain = [];
  while (obj = Object.getPrototypeOf(obj)) {
    protoChain.push(obj)
  }
  protoChain.push(null)
  return protoChain
}

