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
};
</script>

