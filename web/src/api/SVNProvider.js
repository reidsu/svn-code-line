// isExist - 是否存在svn命令（没有提示下载）
// getCommitList（获取版本列表）
// getCountByReverionAndBranch（比较两个或者多个版本下的代码数量）
const {ipcRenderer} = window.require("electron");
export class SVNProvider {
  constructor() {}

  async isExist() {
    return ipcRenderer.sendSync("svn_isExist", "asdas", "ccc");
  }
  async getCommitList(branch) {
    if (branch) {
      ipcRenderer.send("svn_commitList", branch);
      return new Promise((resolve, reject) => {
        ipcRenderer.once("svn_commitList", (event, res) => {
          if (res.code === 200) {
            resolve(res);
            return;
          }
          reject(res);
        });
      })
    }
    return Promise.reject("The branch cannot be empty when querying the commit list");
  }
  getCountByReverionAndBranch(branch, formVersion, lastVersion) {
    if (!branch) {
      return Promise.reject("The branch cannot be empty when querying the code count");
    }
    ipcRenderer.send("svn_codeCount", branch, formVersion, lastVersion);
    return new Promise((resolve, reject) => {
      ipcRenderer.once("svn_codeCount", (event, res) => {
        if (res.code === 200) {
          resolve(res);
          return;
        }
        reject(res);
      });
    })
  }
}

export default new SVNProvider();