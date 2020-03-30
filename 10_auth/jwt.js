const jsonwebtoken = require('jsonwebtoken')
const secret = '123444444'
const opt = {secret: 'jwt_secret', key: 'user'}
const user = {username: 'abc', password: '111111'}
const token = jsonwebtoken.sign({
  data: user,
  exp: Math.floor(Date.now() + (60 * 60))
}, secret)

console.log(token)