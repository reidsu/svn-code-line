<template>
    <div>
    <el-dialog
      title="添加svn分支路径"
      :visible='true'
      width="50%"
      :before-close="handleClose"
      >
      <el-form class="svn-branch__add" ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label-width="80px" label="分组" prop="group">
          <el-select v-model="form.group" placeholder="请选择分组">
            <el-option 
              v-for="(group, index) in groups" 
              :key="index"
              :label="group.name" 
              :value="group.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="80px" label="分组路径" prop="branch">
          <el-input v-model="form.branch"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button 
          @click="handleClose" 
          :style="{
            background: '#fff',
            color: '#333'
          }" 
          class="svn-btn" >
          取 消</el-button>
        <el-button @click="editForm" type="primary" class="svn-btn" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    const checkGroup = function(rules, value, cb) {
      if (!value) {
        return cb(new Error("请选择一个分组"));
      };
      cb();
    }
    const checkBranch = function(rules, value, cb) {
      if (!value) {
        return cb(new Error("SVN分支路径不能为空"));
      }
      cb();
    }
    const form = {
      group: this.$route.query.group
    };
    return {
      groups: [],
      form,
      rules: {
        group: [{ validator: checkGroup, required: true, trigger: ["blur"] }],
        branch: [{ validator: checkBranch, required: true, trigger: ["blur"] }],
      }
    }
  },
  mounted() {
    const groups = window.localStorage.getItem("groups");
    this.groups = groups ? JSON.parse(groups) : [];
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
          that.addBranch(that.form.group, that.form.branch);
          that.$message({
            type: "success",
            message: "添加成功",
          });
          that.$bus.emit("init-group");
          that.handleClose();
        }
      })
    },
    addBranch(group, branchName) {
      const target = this.groups.find(g => g.name === group);
      target.svn.unshift(branchName);
      window.localStorage.setItem("groups", JSON.stringify(this.groups));
    }
  },
}
</script>
<style lang="less">

</style>
