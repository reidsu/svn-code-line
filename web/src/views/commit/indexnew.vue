<template>
  <div class="svn-content svn-commit__main">
    <!-- 添加分支 -->
    <div class="svn-content__add--wrap">
      <div class="svn-commit__header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home/branches' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>提交记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <el-button type="text" @click="closeSelect">取消选择</el-button>
        </div>
      </div>
    </div>
    <!-- 分支列表 -->
    <div class="svn-content__inner svn-commit__table--wrap">
      <!-- 分支列表 -->
      <div class="svn-commit__table">
        <el-table
          ref="commitTable"
          :data="mockCommits"
          style="width: 100%"
          @select="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="80" class-name="svn-commit__table__select"></el-table-column>
          <el-table-column prop="version" align="center" label="版本" min-width="60"></el-table-column>
          <el-table-column prop="author" align="center" label="开发者" min-width="120"></el-table-column>
          <el-table-column prop="time" align="center" label="日期" min-width="140"></el-table-column>
          <el-table-column
            prop="message"
            label="内容"
            min-width="340"
            label-class-name="svn-commit__table__content"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="svn-commit__bottom">
      <p class="svn-commit__bottom__tips">注意：计算代码量时，只能选择连续的提交记录</p>
      <div class="svn-commit__bottom__btn">
        <el-button @click="compute" class="svn-btn">统计</el-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      branch: this.$route.params.branch,
      mockCommits: [
        {
          version: "1",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "2",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "3",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "4",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "5",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "6",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "7",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "8",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "7",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "8",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "7",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        },
        {
          version: "8",
          author: "zhangxinfeng3",
          time: " 2018-12-26 10:29",
          message: "【配管】开发分支v1.1.1创建（申请者：张翔8 JIRA：SSWEB-126）"
        }
      ]
    };
  },
  methods: {
    closeSelect() {
      this.$refs.commitTable.clearSelection();
    },
    compute() {
      this.$router.push(
        `/commit/code/count?group=${this.$route.query.group}&branch=${
          this.$route.query.branch
        }`
      );
    },
    handleSelectionChange(selection, row) {
      selection = selection.sort((r1, r2) => {
        return r1.version > r2.version;
      });
      if (selection.length > 1) {
        const index = this.mockCommits.findIndex(
          c => c.version === row.version
        );
        const fromVersion = selection[0].version;
        const toVersion = selection[selection.length - 1].version;
        let fromIndex = this.mockCommits.findIndex(
          c => c.version === fromVersion
        );
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
          return false;
        });
        this.$refs.commitTable.clearSelection();
        targetRows.forEach((r, i) => {
          console.log(i);
          this.$refs.commitTable.toggleRowSelection(r, true);
        });
      } else {
        this.$refs.commitTable.toggleRowSelection(row, true);
      }
    }
  }
};
</script>

<style lang="less">
</style>