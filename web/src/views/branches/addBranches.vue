<template>
  <el-dialog
    title="添加svn分支路径"
    :visible="dialogVisible"
    width="60%"
    class="svn-dialog svn-dialog__branches"
    :before-close="handleClose"
  >
    <el-form
      class="svn-branch__add"
      ref="form"
      :model="form"
      label-position="left"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item label="分组名称" >
        <el-input disabled  v-model='group'></el-input>
      </el-form-item>
      <el-form-item label="是否批量">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item v-if="!form.delivery" label="分组路径" prop="branch">
        <el-input v-model="form.branch"></el-input>
      </el-form-item>
      <el-form-item v-else label="批量分组" prop="branchs">
        <el-input type="textarea" v-model="form.branchs"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="svn-dialog__footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button @click="editForm" class="svn-btn">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    const checkBranch = function(rules, value, cb) {
      if (!value) {
        return cb(new Error("SVN分支路径不能为空"));
      }
      if (value.search("http") < 0) {
        return cb(new Error("请检查SVN分支路径"));
      }
      cb();
    };
    const checkBranchs = function(rules, value, cb) {
      if (!value) {
        return cb(new Error("SVN分支路径不能为空"));
      }
      cb();
    };
    const form = {
      delivery: false,
      group: this.$route.params.group
    };
    return {
      // 页面配置
      dialogVisible: true,
      // 数据
      group: "",
      groups: [],
      form,
      rules: {
        branch: [{ validator: checkBranch, required: true, trigger: ["blur"] }],
        branchs: [
          { validator: checkBranchs, required: true, trigger: ["blur"] }
        ]
      }
    };
  },
  mounted() {
      const groups = window.localStorage.getItem("groups");
      if (!groups) {
        this.groups = [];
      } else {
        this.groups = JSON.parse(groups);
      }
      this.group = this.$route.query.group
  },

  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    editForm() {
      const that = this;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return;
        } else {
          if (that.form.delivery) {
            that.batchAddBranch(that.$route.query.group, that.form.branchs);
          } else {
            that.addBranch(
              that.$route.query.group,
              that.form.branch.replace(/(^\s*)|(\s*$)/g, "")
            );
          }
          that.$message({
            type: "success",duration: 1000,
            message: "添加成功"
          });
          that.$bus.emit("init-group");
          that.handleClose();
        }
      });
    },
    batchAddBranch(group, branchs) {
      let bs = branchs.split("\n");
      bs = bs.map(branch => {
        return branch.replace(/(^.+(?=http))|(\s*$)/g, "");
      });
      const target = this.groups.find(g => g.name === group);
      bs = bs.filter(b => {
        if (!b) {
          return false;
        }
        if (target.svn.find(s => s === b)) {
          return false;
        }
        return true;
      });
      target.svn = bs.concat(target.svn);
      window.localStorage.setItem("groups", JSON.stringify(this.groups));
    },
    addBranch(group, branchName) {
      const target = this.groups.find(g => g.name === group);
      if (target.svn.find(s => s === branchName)) {
        return;
      }
      target.svn.unshift(branchName);
      window.localStorage.setItem("groups", JSON.stringify(this.groups));
    }
  }
};
</script>
