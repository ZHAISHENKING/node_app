const http = require('07_http')
const fs = require('fs')

const app = http
  .createServer((req, res) => {
    const {method, url} = req;
    if (method === 'GET' && url === '/') {
      fs.readFile('./index.html', (err, data) => {
        res.setHeader('Content-Type', 'text/html')
        res.end(data);
      })
    } else if (method === "GET" && url === "/api/users") {
      res.setHeader('Content-Type', "application/json")
      res.end(JSON.stringify([{name: 'tom', age: 20}]))
    } else if (method === 'POST' && url === '/api/save') {
      let reqData = [];
      let size = 0;
      req.on('data', data => {
        console.log('>>>req on', data)
        reqData.push(data);
        size += data.length;
      })
      req.on('end', () => {
        console.log('end')
        const data = Buffer.concat(reqData, size);
        console.log('data:', size, data.toString())
        res.end(`formdata:${data.toString()}`)
      })
    }
  })


module.exports = app;