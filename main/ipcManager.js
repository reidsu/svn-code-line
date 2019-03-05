const {ipcMain} = require("electron");
const svnManager = require("./svnManager");


class IPCManager {
  constructor() {}
  start() {
    this.lister();
  }
  lister() {
    ipcMain.on("svn_isExist", this.handlerSVNIsExist);
    ipcMain.on("svn_commitList", this.handlerGetCommitList);
    ipcMain.on("svn_codeCount", this.handlerGetCodeCount);

  }

  handlerSVNIsExist(event, arg) {
    event.returnValue= new Response(svnManager.isExist());
  }
  handlerGetCommitList(event, arg) {
    const res = new Response();
    try {
      const result = svnManager.getCommitList(arg);
      res.result = result;
    } catch (error) {
      res.error = error.message;
    }
    event.sender.send("svn_commitList", res);
  }
  handlerGetCodeCount(event, branch, fromVersion, toVersion) {
    const res = new Response();
    try {
      const result = svnManager.getCountByReverionAndBranch(branch, fromVersion, toVersion);
      res.result = result;
    } catch (error) {
      res.error = error.message;
    }
    event.sender.send("svn_codeCount", res);
  }
}

class Response {
  constructor(result, errorInfo) {
    this.code = errorInfo ? 400 : 200;
    this.data = result;
    this.errorInfo = errorInfo;
  }
  set result(result) {
    this.code = 200;
    this.data = result;
  }
  set error(errorInfo) {
    this.code = 400;
    this.errorInfo = errorInfo;
  }
}

module.exports = new IPCManager();