<template>
  <div class="svn-main__wrap">
    <div class="svn-aside">
      <ul class="svn-aside__list">
        <li class="svn-aside__item">
          <span
            @mouseover="handleUserOver"
            @mouseleave="handleUserLeave"
            class="svn-aside__btn svn-aside__user"
          >
            <i class="iconfont svn-icon-person"></i>
            <p v-show="isNickname" class="svn-aside__nickname">{{username}}</p>
          </span>
        </li>
        <li class="svn-aside__item">
          <a
            @click="handleGroup()"
            class="svn-aside__btn svn-aside__group"
            :class="isGroup?'active':''"
            href="javascript:void(0)"
          >
            <i class="iconfont svn-icon-card"></i>
          </a>
        </li>
      </ul>
    </div>
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
    this.init();
  },
  methods: {
    // 初始化
    init() {
      if (location.href.indexOf("manage") > -1) {
        this.isGroup = true;
      } else {
        this.isGroup = false;
      }
      const name = localStorage.getItem("svnName");
      this.username = name ? name : "未登录";
    },
    // 个人信息鼠标移入
    handleUserOver() {
      this.isNickname = true;
    },
    // 个人信息鼠标移出
    handleUserLeave() {
      this.isNickname = false;
    },
    // 分组点击
    handleGroup() {
      if (this.isGroup) {
        this.$router.push("branches");
      } else {
        this.$router.push("manage");
      }
      this.isGroup = !this.isGroup;
    }
  }
};
</script>

