<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    class="svn-dialog svn-dialog__group"
    width="60%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-position="left" label-width="100px" :rules="rules">
      <el-form-item label="分组名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="svn-dialog__footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button class="svn-btn" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    const checkGroupName = function(rule, value, cb) {
      if (!value) {
        cb("分组名字不能为空");
        return;
      } else if (!/^[\u4e00-\u9fa5A-Za-z0-9.]+$/.test(value)) {
        cb(new Error("请输入中英文、数字或符号."));
        return;
      }
      cb();
    };
    return {
      // 弹窗配置
      dialogVisible: true,
      // title:  "添加分组" : "编辑分组",
      title: "添加分组",
      pageType: "add",
      // 数据
      form: {
        name: ""
      },
      rules: {
        name: [{ validator: checkGroupName, required: true, trigger: ["blur"] }]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      const data = this.$route.params;
      if (data.type === "add") {
        this.pageType = "add";
        this.title = "添加分组";
      } else if (data.type === "update") {
        this.title = "编辑分组";
        this.pageType = "update";
        this.form.name = data.name;
      }
    },
    // 确认
    handleConfirm() {
      const that = this;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return;
        } else {
          try {
            if (that.pageType === "add") {
              that.addSave(that.form.name);
            } else if (that.pageType === "update") {
              that.updateSave(that.form.name);
            }
            that.$message({
              type: "success",duration: 1000,
              message: "操作成功"
            });
            that.$bus.$emit("init-group");
            that.form = {};
            that.$router.go(-1);
          } catch (err) {
            that.$message({
              type: "error",
              message: err.message
            });
          }
        }
      });
    },
    // 添加提交
    addSave(name) {
      let groups = window.localStorage.getItem("groups");
      if (!groups) {
        groups = [
          {
            name,
            svn: []
          }
        ];
      } else {
        groups = JSON.parse(groups);
        if (groups.find(g => g.name === name)) {
          throw new Error("分组名字已经存在");
        } else {
          groups.unshift({
            name,
            svn: []
          });
        }
      }
      window.localStorage.setItem("groups", JSON.stringify(groups));
    },
    // 编辑提交
    updateSave(name) {
      let groups = window.localStorage.getItem("groups");
      if (!groups) {
        groups = [
          {
            name,
            svn: []
          }
        ];
      } else {
        groups = JSON.parse(groups);
        let svn = [];
        groups = groups.filter(g => {
          if (g.name !== this.$route.params.name) {
            return true;
          }
          svn = g.svn;
          return false;
        });
        groups.unshift({
          name,
          svn: svn
        });
      }
      window.localStorage.setItem("groups", JSON.stringify(groups));
    },

    // 关闭
    handleClose() {
      this.$router.go(-1);
    }
  }
};
</script>
