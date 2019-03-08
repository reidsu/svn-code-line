const { execSync, exec } = require('child_process');
const iconv = require('iconv-lite');

class SVNManager {
  constructor() {
    
  }
  setting(account, password) {
    this.password = password;
    this.account = account;
  }


  async getCommitList(projectPath) {
    const commond = `svn log ${projectPath} --stop-on-copy`;
    const buf = await new Promise((r) => {
      exec(commond, { encoding: 'binary', maxBuffer: 200 * 1024 * 20}, (err, b) => {
        r(b);
      })
    });
    const utf8Buf = iconv.decode(new Buffer.from(buf, "binary"), "cp936");
    const resource = utf8Buf.split("------------------------------------------------------------------------");
    const data = resource.filter(a => a);
    const result = data.map(str => {
      const info = str.split("|");
      try {
        return {
          version: info[0].replace(/\n|\s/g, ""),
          author: info[1].replace(/\s/g, ""),
          time: info[2].substr(0, 17),
          message: info[3].replace(/^.+\r\n\r\n|\n|\r/g, "")
        }
      } catch(_) {}
    });   
    return result.filter(a => a);
  }
  isExist() {
    const commond = `svn --help`;
    const buf = execSync(commond);
    const utf8Buf = iconv.decode(new Buffer.from(buf), "GBK");
    if (utf8Buf.search("usage: svn <subcommand> [options] [args]")) {
      return true;
    }
    return false;
  }
  async getCountByReverionAndBranch(branch, fromVersion, toVersion) {
    const allCommitData = await this.getCommitList(branch);
    const last = allCommitData[allCommitData.length - 1].version;
    let from = fromVersion || last.replace("r", "");
    let fromTime, toTime;
    for (const commit of allCommitData) {
      const version = commit.version.replace("r", "");
      if (version == from) {
        fromTime = commit.time;
      }
      if (version == toVersion) {
        toTime = commit.time;
      }
    }
    const toVer = toVersion || allCommitData[0].version;
    toTime = toTime || allCommitData[0].time;
    const version = `-r${from}${toVersion ? ":" + toVersion : ""}`
    const commond = `svn diff ${version} ${branch}`;
    console.log(commond);
    const buf2 = await new Promise((r) => {
      const child =  exec(commond, { encoding: 'binary', maxBuffer: 200 * 1024 * 20 })
      let data = "";
      child.stdout.on('data', function(chunk){
        data += chunk;
      });
      child.on('close', function(e, code) {
        r(data);
      });
    });
    return {
      count: buf2.toString().match(/\n\+(?!\+)/g).length,
      fromTime,
      toTime,
      fromVersion: "r" + from,
      toVersion: toVer
    };
  }
}



const sm = new SVNManager();
// sm.isExist();
module.exports = sm;

// const data = sm.getCommitList("https://192.0.0.140/SaaS-platform/product/SaaS_enterprise/APP_components/saas_enterprise_web/branches/v1.1.1").then((r)=> {
//   console.log(r);
// })
// // console.log(sm.isExist());

// const count = sm.getCountByReverionAndBranch("https://192.0.0.140/SaaS-platform/product/SaaS_enterprise/APP_components/saas_enterprise_web/branches/v1.1.1", "5514", "6997").then((r)=> {
//   console.log(r);
// })

// console.log(count);