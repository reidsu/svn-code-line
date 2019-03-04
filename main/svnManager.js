const { execSync } = require('child_process');
let iconv = require('iconv-lite');

class SVNManager {
  constructor() {
    
  }
  setting(account, password) {
    this.password = password;
    this.account = account;
  }


  findLogs(projectPath) {
    const commond = `svn log ${projectPath}`;
    const buf = execSync(commond);
    const resource = buf.toString().split("------------------------------------------------------------------------");

    const data = resource.filter(a => a);
    const result = data.map(str => {
      const info = str.split("|");
      try {
        return {
          version: info[0].replace(/\n|\s/g, ""),
          author: info[1].replace(/\s/g, ""),
          time: info[2].substr(0, 20),
          message: info[3].replace(/^.+\r\n\r\n|\n/g, "")
        }
      } catch(_) {}
    });   
    console.log(result);  
    return result;
  }
}

const sm = new SVNManager();

sm.findLogs("https://192.0.0.241/Civil-Platform/Product/ys7/openweb_node/branches/v3.9.5")