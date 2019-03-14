<template>
  <div class="svn-login">
    <div class="svn-login__title">
      <h1 class="svn-login__title--inner">SVN代码行数GUI展示工具</h1>
    </div>
    <div class="svn-login__form">
      <!-- 登录 -->
      <div class="svn-login__form--inner">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入SVN账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="svn-btn--wrap">
            <el-button class="svn-btn" @click="login">登录</el-button>
            <el-button type="text" @click="handleJump">跳过</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import svnProvider from "../../api/SVNProvider.js";

export default {
  data() {
    const username = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (/\s/.test(value)) {
        callback(new Error("用户名不能包含空格"));
      } else if (value.length > 32) {
        callback(new Error("用户名长度不超过32个字符"));
      } else {
        callback();
      }
    };
    const password = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (/\s/.test(value)) {
        callback(new Error("密码不能包含空格"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            validator: username,
            required: true,
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            validator: password,
            required: true,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    // 登录
    login() {
      // this.$router.push("/home");
      this.$refs.form.validate(valid => {
        if (valid) {
          localStorage.setItem("svnName", this.form.username);
          this.$router.push("/home/branches");
        } else {
          return false;
        }
      });
    },
    // 跳过
    handleJump() {
      this.$router.push("/home/branches");
    },
    async testApi2() {
      console.log("接口测试：getCommitList");
      // await svnProvider.getCommitList("asd").then((res) => {
      //   console.log(res);
      // }).catch(err => console.log(err))
      // await svnProvider.getCommitList("https://192.0.0.140/SaaS-platform/product/SaaS_enterprise/APP_components/saas_enterprise_web/branches/v1.1.1")
      // .then(res=> console.log(res)).catch(err=> console.log(err))
    },
    testApi3() {
      // console.log("接口测试：getCountByReverionAndBranch");
      // svnProvider.getCountByReverionAndBranch("https://192.0.0.140/SaaS-platform/product/SaaS_enterprise/APP_components/saas_enterprise_web/branches/v1.1.1", "5547")
      // .then((res) => {
      //   console.log(res);
      // }).catch(err => console.log(res))
    }
  }
};
</script>

