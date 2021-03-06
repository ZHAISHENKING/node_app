const buf1 = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf1)

const buf2 = Buffer.from('a')
console.log(buf2, buf2.toString()) // <Buffer 61> 'a'

const buf3 = Buffer.from('Buffer创建方法')
console.log(buf3) // <Buffer 42 75 66 66 65 72 e5 88 9b e5 bb ba e6 96 b9 e6 b3 95>

// 写入Buffer数据
buf1.write('hello')
console.log(buf1) // <Buffer 68 65 6c 6c 6f 00 00 00 00 00>

// 读取Buffer数据
console.log(buf3.toString()) // Buffer创建方法

// 合并Buffer
const buf4 = Buffer.concat([buf1, buf3])
console.log(buf4.toString()) // hello     Buffer创建方法