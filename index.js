const path = require('path');
const { readdirSync, statSync } = require('fs')
const shell = require('shelljs')
const util = require('./util')

// filterList
const filterList = ['.DS_Store']

// 获取时间范围

// 获取日志范围
// 默认为工作目录上一层
// @todo 后续可以改为配置文件
const workPath = path.resolve(__dirname, '..')


// 遍历所有仓库

// 判断是否为 git 仓库
// @todo
const isGitRepo = () => {}

const repos = readdirSync(workPath).filter((d) => {
  console.log(d)
  if (!filterList.includes(d)) {
    // 查看日志
    
  }
})


function getLog () {
  let _cmd = `git log -1 \
  --date=iso --pretty=format:'{"commit": "%h","author": "%aN <%aE>","date": "%ad","message": "%s"},' \
  $@ | \
  perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
  perl -pe 's/},]/}]/'`
  return new Promise((resolve, reject) => {
    shell.exec(_cmd, (code, stdout, stderr) => {
      if (code) {
        reject(stderr)
      } else {
        resolve(JSON.parse(stdout)[0])
      }
    })
  })
}

async function commit () {
  let _gitLog = await getLog()
  console.log(_gitLog)
}

// commit()