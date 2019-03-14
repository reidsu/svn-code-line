<template>
  <div class="svn-login">
    <div class="svn-login__title">
      <h1 class="svn-login__title--inner">SVN代码行数GUI展示工具</h1>
    </div>
    <div class="svn-login__form">
      <!-- 是否存在svn命令 -->
      <div class="svn-exit">
        <p class="svn-exit-check">检测到您的计算机中尚未安装SVN命令行工具，请安装后重启</p>
        <p>安装教程：<a @click="openWeb">传送门</a></p>
        <!-- <el-button v-if="!svnLink" @click="handleExitSvn" type="text">请点击检测是否已安装svn命令</el-button> -->
        <!-- <div v-else class="svn-exit__result">
          <p>您还未安装svn命令，请安装后重试</p>
          <p>下载地址：{{svnLink}}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import svnProvider from "../../api/SVNProvider.js";
const {shell } = window.require("electron");

export default {
  data() {
    return {
      svnLink: ""
    };
  },
  mounted() {
    svnProvider.isExist().then(res => {
      if ((Number(res.code) === 200)) {
        this.$router.push("/home/manage");
      }
    })
  },
  methods: {
    // 检测是否存在svn命令
    openWeb() {
      shell.openExternal('https://stackoverflow.com/questions/2341134/command-line-svn-for-windows')
    }
  }
};
</script>

