const Koa = require('koa')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa();
const secret = `it's a secret`
app.keys = ['virtual secret']

app.use(static(__dirname + '/'))
app.use(bodyParser())

router.post(
  '/login-token',
  async ctx => {
    const {body} = ctx.request
    const user_info = body.username
    ctx.body = {
      message: 'login success',
      user: user_info,
      token: jwt.sign(
        {
          data: user_info,
          exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret
      )
    }
  })

router.get(
  '/token',
  jwtAuth({secret}),
  async ctx => {
    ctx.body = {
      message: 'success',
      user_info: ctx.state.user.data
    }
  }
)

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000)