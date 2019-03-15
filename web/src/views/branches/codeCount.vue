<template>
  <div>
    <el-dialog
      title="SVN代码行数统计"
      :visible='true'
      width="60%"
      top="5vh"
      :before-close="handleClose"
      >
      <div class="svn-count-header">
        <div v-if="codeCount" class="svn-count-nums">
          {{codeCount}}
        </div>
        <div v-else class="svn-count-nums">
          <i class="el-icon-loading"></i>
        </div>
        <p>
          代码提交总行数
        </p>
      </div>
      <div class="svn-count-detail">
        <div class="svn-count-detail__item">
          <div class="svn-count-detail__item--key">
            分组:
          </div>
          <div class="svn-count-detail__item--value">
            {{group}}
          </div>
        </div>
        <div class="svn-count-detail__item">
          <div class="svn-count-detail__item--key">
            分组路径:
          </div>
          <div class="svn-count-detail__item--value">
            {{branch}}
          </div>
        </div>
        <div class="svn-count-detail__item">
          <div class="svn-count-detail__item--key">
            开始时间:
          </div>
          <div class="svn-count-detail__item--value">
            {{startTime}}
          </div>
        </div>
        <div class="svn-count-detail__item">
          <div class="svn-count-detail__item--key">
            结束时间:
          </div>
          <div class="svn-count-detail__item--value">
            {{endTime}}
          </div>
        </div>
        <div class="svn-count-detail__item">
          <div class="svn-count-detail__item--key">
            从版本:
          </div>
          <div class="svn-count-detail__item--value">
            {{fromVersion}}
          </div>
        </div>
        <div class="svn-count-detail__item">
          <div class="svn-count-detail__item--key">
            到版本:
          </div>
          <div class="svn-count-detail__item--value">
            {{toVersion}}
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" type="primary" class="svn-btn" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import svnProvider from "../../api/SVNProvider.js";

export default {
  data() {
    return {
      codeCount: "",
      group: this.$route.query.group,
      branch: this.$route.query.branch,
      startTime: "",
      endTime: "",
      fromVersion: "",
      toVersion: ""
    }
  },
  mounted() {
    const that = this;
    setTimeout(() => {
      that.getCodeCount();
    }, 100);
  },
  methods: {
    async getCodeCount() {
      try {
        const res = await svnProvider.getCountByReverionAndBranch(
          this.$route.query.branch,
          this.$route.query.from,
          this.$route.query.to,
        );
        if (res.code === 200) {
          this.codeCount = res.data.count;
          this.startTime = res.data.fromTime;
          this.endTime = res.data.toTime;
          this.fromVersion = res.data.fromVersion;
          this.toVersion = res.data.toVersion;
        }
      } catch (error) {
        this.$message({
          type: "error",
          message: "查询失败，分支路径错误"
        }),
        this.codeCount = `查询失败,错误的分支路径`
      }
    },
    handleClose() {
      this.$router.go(-1);
    },
  },
}
</script>

<style lang="less">

</style>
