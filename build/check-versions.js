var chalk = require('chalk')   //处理提示文字信息的颜色  font-color
var semver = require('semver')  //处理版本号
var packageConfig = require('../package.json')
var shell = require('shelljs')  //用来执行终端命令
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

/*定义版本命令*/
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),   //获取当前版本
    versionRequirement: packageConfig.engines.npm   //版本要求
  })
}
/*遍历循环 本地目录的版本号，比对最低要求版本，如果不符合则打印提示，并停止执行*/
module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
