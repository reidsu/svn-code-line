// isExist - 是否存在svn命令（没有提示下载）
// getBranchList（获取版本列表）
// getCountByReverionAndBranch（比较两个或者多个版本下的代码数量）

export class SVNProvider {
  constructor() {}

  isExist() {
    return true
  }
  getBranchList(branch) {
    if (branch) {
      return [{
      
      }]
    }
  }
  getCountByReverionAndBranch(branch, formVersion, lastVersion) {
    if (branch) {
      if (formVersion || lastVersion) {
        return []
      }
      return []
    }
  }
}