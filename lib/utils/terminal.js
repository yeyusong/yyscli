/*
 * @Author: your name
 * @Date: 2021-01-28 15:21:58
 * @LastEditTime: 2021-02-03 13:58:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ye\test\node\脚手架\learn_cli\lib\utils\terminal.js
 */
// 执行终端命令相关的代码
const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn,
}
