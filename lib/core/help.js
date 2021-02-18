/*
 * @Author: yeyusong
 * @Date: 2021-01-28 10:35:54
 * @LastEditors: yeyusong
 * @LastEditTime: 2021-02-03 14:18:31
 * @Description: file content
 */
const program = require('commander')

const helpOptions = () => {
  // 增加自己的options
  program.option('-y --yys', 'a yys cli')
  program.option(
    '-d --dest <dest>',
    'a destination folder,例如: -d /src/components'
  )
  program.option('-f --framework <framework>', 'your framework')

  program.on('--help', function () {
    console.log(' ')
    console.log('其他:')
    console.log('  原地大喊三声“我是猪头三”即可查看更多~')
  })
}

module.exports = helpOptions
