/*
 * @Author: your name
 * @Date: 2021-01-28 10:53:08
 * @LastEditTime: 2021-02-18 10:51:55
 * @LastEditors: yeyusong
 * @Description: In User Settings Edit
 * @FilePath: \ye\test\node\脚手架\learn_cli\lib\core\create.js
 */
const program = require('commander')
const {
  createProjectAction,
  addCpnAction,
  addpageAndRouterAction,
  addStoreAction,
} = require('./action')
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone repository into a folder')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description(
      'add vue component,例：yys addcpn HelloWorld [-d src/components]'
    )
    .action((name) => {
      addCpnAction(name, program._optionValues.dest || 'src/components')
    })

  program
    .command('addpage <page>')
    .description(
      'add vue page and router config,例如: yys addpage Home [-d src/pages]'
    )
    .action((page) => {
      addpageAndRouterAction(page, program._optionValues.dest || 'src/pages')
    })

  program
    .command('addstore <store>')
    .description(
      'add types.js and router config,例如: yys addstore types [-d src/pages]'
    )
    .action((store) => {
      addStoreAction(store, program._optionValues.dest || 'src/store/modules')
    })
}

module.exports = createCommands
