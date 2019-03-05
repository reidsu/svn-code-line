<template>
  <div class="svn-login">
    <div class="svn-login__title">
      <h1 class="svn-login__title--inner">SVN代码行数GUI展示工具</h1>
    </div>
    <div class="svn-login__form">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入SVN账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="svn-btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="testApi1">接口测试：isExist</el-button>
    <el-button @click="testApi2">接口测试：getCommitList</el-button>
    <el-button @click="testApi3">接口测试：getCountByReverionAndBranch</el-button>
  </div>
</template>

<script>
import svnProvider from "../../api/SVNProvider.js";

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
        // } else if (value.length < 8 || value.length > 16) {
        //   callback(new Error("密码长度要求8-16位"));
        // } else if (
        //   !/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)(?!^.*[\u4e00-\u9fa5].*$)\S{8,16}$/.test(
        //     value
        //   )
        // ) {
        //   callback(
        //     new Error("密码只能用数字、小写字母、大写字母、符号的两种及以上组合")
        //   );
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
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            validator: password,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log("登录逻辑");
          this.$router.push("/log");
        } else {
          return false;
        }
      });
    },
    testApi1() {
      console.log("接口测试：isExist");
      svnProvider.isExist()
      .then(res=> console.log(res))
      .catch(err=> console.log(err))
    },
    async testApi2() {
      console.log("接口测试：getCommitList");
      await svnProvider.getCommitList("asd").then((res) => {
        console.log(res);
      }).catch(err => console.log(err))
      await svnProvider.getCommitList("https://192.0.0.140/SaaS-platform/product/SaaS_enterprise/APP_components/saas_enterprise_web/branches/v1.1.1")
      .then(res=> console.log(res)).catch(err=> console.log(err))
    },
    testApi3() {
      console.log("接口测试：getCountByReverionAndBranch");
      svnProvider.getCountByReverionAndBranch("https://192.0.0.140/SaaS-platform/product/SaaS_enterprise/APP_components/saas_enterprise_web/branches/v1.1.1", "5547")
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(res))
    }
  }
};
</script>

