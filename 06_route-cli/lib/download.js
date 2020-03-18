const {promisify} = require('util')
module.exports.clone = async function (repo, desc) {
  const download = promisify(require('download-git-repo')),
    ora = require('ora'),
    process = ora(`下载......${repo}`);
  process.start()
  await download(repo, desc)
  process.succeed()
}
