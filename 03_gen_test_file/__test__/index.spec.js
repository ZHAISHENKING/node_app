const fs = require('fs')
// beforeEach(()=>{
//   fs.rmdirSync(__dirname + '/data/__test__', {
//     recursive: true
//   })
// })

test('测试文件名称', () => {
  const src = new (require('../index'))
  const ret = src.getTestFileName('/abc/class.js')
  console.log('getSourceName', ret)
  expect(ret)
    .toBe('/abc/__test__/class.spec.js')
})

test('生成测试代码', () => {
  const src = new (require('../index'))
  const ret = src.getTestSource('fun', 'class')
  expect(ret)
    .toBe(
      `
test('TEST fun', () => {
  const fun = require('../class')
  const ret = fun()
  // expect(ret)
  //  .toBe('test ret')
})
`
    )
})

test('单元测试 测试生成测试代码文件', () => {
  const src = new (require('../index'))()
  const f = jest.fn();
  src.genTestFile = f
  src.genJestSource(__dirname + '/data')
  expect(f).toBeCalledTimes(2)
  expect(f).toHaveBeenCalledWith(__dirname + '/data/fun.js')
  expect(f).toHaveBeenCalledWith(__dirname + '/data/class.js')
})

test('单元测试 genTestFile 01 class分支', ()=>{
  const src = new (require('../index'))()
  const getTestSource = jest.fn();
  src.getTestSource = getTestSource
  const writeFileSync = jest.fn();
  src.fs.writeFileSync = writeFileSync
  src.genTestFile(__dirname + '/data/class.js')
  expect(getTestSource).toBeCalledTimes(2)
})

test('单元测试 genTestFile 02 fun分支', ()=>{
  const src = new (require('../index'))()

  const getTestSource = jest.fn();
  src.getTestSource = getTestSource

  const writeFileSync = jest.fn();
  src.fs.writeFileSync = writeFileSync

  src.genTestFile(__dirname + '/data/fun.js')
  expect(getTestSource).toBeCalledTimes(1)
})


