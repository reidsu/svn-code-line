<template>
  <el-dialog
    :visible.sync="dialogVisible"
    class="svn-dialog svn-dialog__del"
    width="60%"
    :before-close="handleClose"
  >
    <div>
      <p>确认删除吗？</p>
    </div>
    <div slot="footer" class="svn-dialog__footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button class="svn-btn" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // 弹窗配置
      dialogVisible: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      const data = this.$route.params;
      console.log(data);
    },
    // 确认
    handleConfirm() {
      this.handleClose();
    },
    // 关闭
    handleClose() {
      this.$router.go(-1);
    }
  }
};
</script>
