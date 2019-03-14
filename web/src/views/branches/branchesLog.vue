<template>
  <el-container class="svn-log">
    <svn-header/>
    <el-main class="svn-content">
      <div class="svn-commit-header">
        <el-button 
          @click="returnHome" 
          type="primary" 
          class="svn-btn" 
          icon="el-icon-back" 
          circle>
        </el-button>
        <el-button @click="compute" class="svn-btn">统计</el-button>
        <el-button @click="closeSelect" class="svn-btn">取消选择</el-button>
        <span>(计算代码量时，只能选择连续的提交记录)</span>
      </div>
      <div class="svn-commit-table">
        <el-table
          ref="commitTable"
          :data="mockCommits"
          tooltip-effect="dark"
          style="width: 100%"
          @select="handleSelectionChange"
          >
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            prop="version"
            label="版本"
            width="60">
          </el-table-column>
          <el-table-column
            prop="author"
            label="开发者"
            width="120">
          </el-table-column>
          <el-table-column
            label="日期"
            prop="time"
            width="130">
          </el-table-column>
          <el-table-column
            prop="message"
            label="内容"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <router-view></router-view>
  </el-container>
</template>

<script>
import SvnHeader from "./../../components/Header";
export default {
  components: {
    SvnHeader
  },
  data() {
    return {
      branch: this.$route.query.branch,
      mockCommits: [{ version: '1',
        author: 'zhangxinfeng3',
        time: ' 2018-12-26 10:29',
        message: '【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）' },
        { version: '2',
        author: 'zhangxinfeng3',
        time: ' 2018-12-26 10:29',
        message: '【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）' }, 
        { version: '3',
        author: 'zhangxinfeng3',
        time: ' 2018-12-26 10:29',
        message: '【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）' }, 
        { version: '4',
        author: 'zhangxinfeng3',
        time: ' 2018-12-26 10:29',
        message: '【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）' }, 
        { version: '5',
        author: 'zhangxinfeng3',
        time: ' 2018-12-26 10:29',
        message: '【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）' },
        { version: '6',
        author: 'zhangxinfeng3',
        time: ' 2018-12-26 10:29',
        message: '【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）' }, 
        { version: '7',
        author: 'zhangxinfeng3',
        time: ' 2018-12-26 10:29',
        message: '【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）' }, 
        { version: '8',
        author: 'zhangxinfeng3',
        time: ' 2018-12-26 10:29',
        message: '【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）' }, 
      ]
    }
  },
  methods: {
    returnHome() {
      this.$router.push("/home");
    },
    closeSelect() {
      this.$refs.commitTable.clearSelection();
    },
    compute() {
      this.$router.push(
        `/commit/code/count?group=${this.$route.query.group}&branch=${this.$route.query.branch}`
      );
    },
    handleSelectionChange(selection, row) {
      selection = selection.sort((r1, r2) => {
        return r1.version > r2.version;
      })
      if (selection.length > 1) {
        const index = this.mockCommits.findIndex(c => c.version === row.version);
        const fromVersion = selection[0].version;
        const toVersion = selection[selection.length - 1].version;
        let fromIndex = this.mockCommits.findIndex(c => c.version === fromVersion);
        let toIndex = this.mockCommits.findIndex(c => c.version === toVersion);
        if (index < fromIndex) {
          fromIndex = index;
        } else if (index > toIndex) {
          toIndex = index;
        }
        const targetRows = this.mockCommits.filter((c, index) => {
          if (index <= toIndex && index >= fromIndex) {
            return true;
          }
          return false
        });
        this.$refs.commitTable.clearSelection();
        targetRows.forEach((r, i) => {
          this.$refs.commitTable.toggleRowSelection(r, true);
        });
      } else {
        this.$refs.commitTable.toggleRowSelection(row, true);
      }
    },
  },
}
</script>

<style lang="less">
  
</style>