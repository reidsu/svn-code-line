<template>
  <div class="svn-login">
    <div class="svn-login__title">
      <h1 class="svn-login__title--inner">SVN代码行数GUI展示工具</h1>
    </div>
    <div class="svn-login__form">
      <!-- 是否存在svn命令 -->
      <div class="svn-exit">
        <el-button v-if="!svnLink" @click="handleExitSvn" type="text">请点击检测是否已安装svn命令</el-button>
        <div v-else class="svn-exit__result">
          <p>您还未安装svn命令，请安装后重试</p>
          <p>下载地址：{{svnLink}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svnProvider from "../../api/SVNProvider.js";

export default {
  data() {
    return {
      isExitSVN: false,
      svnLink: ""
    };
  },
  methods: {
    // 检测是否存在svn命令
    handleExitSvn() {
      svnProvider
        .isExist()
        .then(res => {
          console.log(res);
          if ((Number(res.code) === 200) & res.data) {
            this.isExitSVN = true;
            this.$router.push("/login");
          } else {
            this.isExitSVN = false;
            this.svnLink = "www.baidu.com";
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

