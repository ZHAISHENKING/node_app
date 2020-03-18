const {promisify} = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const {clone} = require('./download')
const open = require('open')

// 对接输出流， promisify化spawn
const spawn = async (...args) => {
  const {spawn} = require('child_process');
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', ()=>{
      resolve()
    })
  })
}

module.exports = async name=>{
  clear()
  const data = await figlet('zs welcome')
  log(data)

  log('🚀创建项目：'+ name)
  // github克隆项目到指定文件夹
  await clone('github:su37josephxia/vue-template', name)

  log('安装依赖')
  await spawn('npm', ['install'], {cwd: `./${name}`})
  log(chalk.green(`
✅安装完成：
To get start:
=========================
      cd ${name}
      npm run server
=========================
  `))

  log('运行项目')
  open(`http://localhost:8080`);
  await spawn('npm', ['run', 'serve'], {cwd: `./${name}`})
}
