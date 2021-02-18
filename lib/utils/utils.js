/*
 * @Author: yeyusong
 * @Date: 2021-01-29 10:51:51
 * @LastEditors: yeyusong
 * @LastEditTime: 2021-02-03 16:51:27
 * @Description:
 */
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

const compile = (name, data) => {
  const templatePosition = `../templates/${name}`
  const templatePath = path.resolve(__dirname, templatePosition)
  return new Promise((res, rej) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err)
        rej(err)
        return
      }
      res(result)
    })
  })
}

const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync,
}
