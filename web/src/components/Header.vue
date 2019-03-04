<template>
  <el-header class="svn-header">
    <div class="svn-header__title--wrap">
      <h1 class="svn-header__title">SVN代码行数GUI展示工具</h1>
    </div>
    <div class="svn-header__info">
      <span class="svn-header__username">{{username}}</span>
    </div>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      username: "username"
    };
  }
};
</script>

