<template>
  <div class="svn-main__wrap">
    <div class="svn-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isGroup: false,
      isNickname: false,
      username: ""
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    // 初始化
    // init() {
    //   if (location.href.indexOf("manage") > -1) {
    //     this.isGroup = true;
    //   } else {
    //     this.isGroup = false;
    //   }
    //   const name = localStorage.getItem("svnName");
    // },
    // 个人信息鼠标移入
    // handleUserOver() {
    //   this.isNickname = true;
    // },
    // // 个人信息鼠标移出
    // handleUserLeave() {
    //   this.isNickname = false;
    // },
    // // 分组点击
    // handleGroup() {
    //   if (this.isGroup) {
    //     this.$router.push("branches");
    //   } else {
    //     this.$router.push("manage");
    //   }
    //   this.isGroup = !this.isGroup;
    // }
  }
};
</script>

