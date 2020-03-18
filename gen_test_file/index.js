const path = require('path')
module.exports = class TestNow {
  constructor() {
    this.fs = require('fs')
  }

  /**
   * 生成测试代码
   * @param sourcePath
   */
  genJestSource(sourcePath = resolve('./')) {
    const testPath = `${sourcePath}/__test__`
    if (!this.fs.existsSync(testPath)) {
      console.log(testPath)
      this.fs.mkdirSync(testPath)
    }
    let list = this.fs.readdirSync(sourcePath)
    list
      .map(v => `${sourcePath}/${v}`)
      .filter(v => this.fs.statSync(v).isFile())
      .filter(v => v.indexOf('.spec') === -1)
      .map(v => this.genTestFile(v))
  }

  /**
   * 生成测试文件
   * @param filename
   */
  genTestFile(filename) {
    console.log('genTestFile: ' + filename)
    const testFileName = this.getTestFileName(filename)
    if (this.fs.existsSync(testFileName)) {
      console.log('该测试代码已存在')
    }

    const module = require(filename)
    let source;
    if (typeof module === 'object') {
      source = Object.keys(module).map(v => this.getTestSource(v, path.basename(filename), true))
        .join('\n')
    } else if (typeof module == 'function') {
      const basename = path.basename(filename)
      source = this.getTestSource(basename.replace('.js', ''), basename)
    }
    this.fs.writeFileSync(testFileName, source)
  }

  /**
   * 生成测试文件代码
   * @param methodName
   * @param classFile
   * @param isClass
   * @returns {string}
   */
  getTestSource(methodName, classFile, isClass = false) {
    return `
test('${'TEST ' + methodName}', () => {
  const ${isClass ? '{' + methodName + '}' : methodName} = require('${'../' + classFile}')
  const ret = ${methodName}()
  // expect(ret)
  //  .toBe('test ret')
})
`
  }

  /**
   * 生成测试文件名
   * @param filename
   * @returns {string}
   */
  getTestFileName(filename) {
    const dirName = path.dirname(filename)
    const baseName = path.basename(filename)
    const extname = path.extname(filename)
    const testName = baseName.replace(extname, `.spec${extname}`)

    return path.format({
      root: dirName + '/__test__/',
      base: testName
    })
  }

}
