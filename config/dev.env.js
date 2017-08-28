var merge = require('webpack-merge')  //合并对象
var prodEnv = require('./prod.env')  //导出一个prdn文件

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
