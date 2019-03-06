<template>
  <div>
    <el-dialog
      :title="title"
      :visible='true'
      width="50%"
      :before-close="handleClose"
      >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="分组名称" prop="name">
          <el-input v-model="form.name"></el-input>
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
    const checkGroupName = function(rule, value, cb) {
      if (!value) {
        cb("分组名字不能为空");
        return;
      } else if (!/^[\u4e00-\u9fa5A-Za-z0-9.]+$/.test(value)) {
        cb(new Error("请输入中英文、数字或符号."));
        return;
      }
      cb();
    }
    const form = {
      name: this.$route.query.name
    }
    return {
      title: this.$route.path.search("add") > -1 ? "添加分组" : "编辑分组",
      form: form,
      rules: {
        name: [{ validator: checkGroupName, required: true, trigger: ["blur"] }]
      }
    }
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
          try {
            if (that.$route.path.search("add") > -1 ) {
              that.addGroup(that.form.name); 
            } else {
              that.editGroup(that.form.name);
            }
            that.$message({
              type: "success",
              message: "操作成功",
            })
            that.$bus.$emit("init-group");
            that.form = {};
            that.$router.go(-1)
          } catch (err) {
            that.$message({
              type: "error",
              message: err.message
            })
          }
        }
      })
    },
    addGroup(name) {
      let groups = window.localStorage.getItem("groups");
      if (!groups) {
        groups = [{
          name,
          svn: []
        }];
      } else {
        groups = JSON.parse(groups);
        if (groups.find(g => g.name === name)) {
          throw new Error("分组名字已经存在");
        } else {
          groups.unshift({
            name,
            svn: []
          })
        }
      }
      window.localStorage.setItem("groups", JSON.stringify(groups));
    },
    editGroup(name) {
      let groups = window.localStorage.getItem("groups");
      if (!groups) {
        groups = [{
          name,
          svn: []
        }];
      } else {
        groups = JSON.parse(groups);
        let svn = [];
        groups = groups.filter(g => {
          if (g.name !== this.$route.query.name) {
            return true
          }
          svn = g.svn;
          return false;
        });
        groups.unshift({
          name,
          svn: svn
        })
      }
      window.localStorage.setItem("groups", JSON.stringify(groups));
    }
  },
 
}
</script>

<style lang="less">

</style>
