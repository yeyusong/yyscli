/*
 * @Author: your name
 * @Date: 2021-01-28 11:37:15
 * @LastEditTime: 2021-02-03 18:05:02
 * @LastEditors: yeyusong
 * @Description: In User Settings Edit
 * @FilePath: \ye\test\node\脚手架\learn_cli\lib\core\action.js
 */
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
// const open = require('open')
const path = require('path')
const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

const createProjectAction = async (project) => {
  console.log('疯狂下载中QAQ......')
  // 1-clone项目
  await download(vueRepo, project, { clone: true })
  // 2-执行npm i
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })
  // 3-运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
  // 4-打开浏览器(windows默认已经打开，因此不需要)
  // open('http://localhost:8080/');
}

// 添加组件的action
const addCpnAction = async (name, dest) => {
  // 1.有对应的ejs模块
  // 2.编译ejs模板result
  const result = await compile('vue-component.ejs', {
    name,
    lowerName: name.toLowerCase(),
  })
  // 3.将result写入到.vue文件中
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
  // 4.放到对应的文件夹中
}

// 添加组件和路由
const addpageAndRouterAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() }
  const pageRes = await compile('vue-component.ejs', data)
  const routeRes = await compile('vue-router.ejs', data)
  // 2.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageRes)
    writeToFile(targetRoutePath, routeRes)
  }
}

const addStoreAction = async (name, dest) => {
  const storeRes = await compile('vue-store.ejs', {})
  const typesRes = await compile('vue-types.ejs', {})
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`)
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath, storeRes)
    writeToFile(targetRoutePath, typesRes)
  }
}

module.exports = {
  createProjectAction,
  addCpnAction,
  addpageAndRouterAction,
  addStoreAction,
}
