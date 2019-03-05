const { execSync } = require('child_process');
const iconv = require('iconv-lite');

class SVNManager {
  constructor() {
    
  }
  setting(account, password) {
    this.password = password;
    this.account = account;
  }


  getCommitList(projectPath) {
    const commond = `svn log ${projectPath}`;
    const buf = execSync(commond);
    const utf8Buf = iconv.decode(new Buffer.from(buf), "GBK");
    const resource = utf8Buf.split("------------------------------------------------------------------------");
    const data = resource.filter(a => a);
    const result = data.map(str => {
      const info = str.split("|");
      try {
        return {
          version: info[0].replace(/\n|\s/g, ""),
          author: info[1].replace(/\s/g, ""),
          time: info[2].substr(0, 20),
          message: info[3].replace(/^.+\r\n\r\n|\n|\r/g, "")
        }
      } catch(_) {}
    });   
    return result;
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
  getCountByReverionAndBranch(branch, fromVersion, lastVersion) {
    const version = `-r${fromVersion}${lastVersion ? ":" + lastVersion : ""}`
    const commond = `svn diff ${version} ${branch}`;
    const buf = execSync(commond);
    return buf.toString().match(/\n\+\s/g).length;
  }
}



const sm = new SVNManager();
// sm.isExist();
module.exports = sm;

// const data = sm.getCommitList("https://192.0.0.140/SaaS-platform/product/SaaS_enterprise/APP_components/saas_enterprise_web/branches/v1.1.1")
// console.log(data);
// // console.log(sm.isExist());

// const count = sm.getCountByReverionAndBranch("https://192.0.0.140/SaaS-platform/product/SaaS_enterprise/APP_components/saas_enterprise_web/branches/v1.1.1", '5547');

// console.log(count);