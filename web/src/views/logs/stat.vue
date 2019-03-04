<template>
  <el-container class="svn-stat">
    <svn-header/>
    <el-main class="svn-content">
      <p>统计结果</p>
    </el-main>
  </el-container>
</template>

<script>
import SvnHeader from "./../../components/Header";

export default {
  data() {
    return {};
  },
  components: {
    SvnHeader
  }
};
</script>

