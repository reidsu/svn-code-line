<template>
  <el-container class="svn-log">
    <svn-header/>
    <el-main class="svn-content">
      <div class="svn-home__header">
        <el-button  @click="addGroup" class="svn-btn">添加组</el-button>
        <el-button  @click="addBranch" class="svn-btn">添加分支</el-button>
      </div>
      <div class="svn-home__form">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(group, index) in groups" :key="index" :title="group.name">
            <template slot="title">
              <span>{{group.name}}</span>
              <div class="svn-home__form__group--action">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <i class="el-icon-edit" @click="editGroup(group.name, $event)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <i class="el-icon-delete" @click="delGroup(group.name, $event)"></i>
                </el-tooltip>
              </div>
            </template>
            <div v-for="(branch, i) in group.svn" :key="i">
              <span>{{branch}}</span>
              <div class="svn-home__form__group--action">
                <el-tooltip class="item" effect="dark" content="查看提交记录" placement="top">
                  <i @click="openBranch(group.name, branch)" class="el-icon-zoom-in"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="统计总代码量" placement="top">
                  <i @click="openCodeCount(group.name, branch)" class="el-icon-sort"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <i @click="delBranch(group.name, branch)" class="el-icon-delete"></i>
                </el-tooltip>
              </div>
              </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-main>

    <router-view></router-view>
  </el-container>
</template>

<script>
import SvnHeader from "./../../components/Header";
export default {
  components: {
    SvnHeader
  },
  data() {
    return {
      activeName: 1,
      groups: []
    }
  },
  mounted() {
    this.getGroups();
    this.$bus.on("init-group", this.getGroups);
  },
  destroyed() {
    this.$bus.off("init-group", this.getGroups);
  },
  methods: {
    getGroups() {
      const groups = window.localStorage.getItem("groups");
      if (!groups) {
        return;
      }
      this.groups = JSON.parse(groups);
    },
    addGroup() {
      this.$router.push("/home/group/add");
    },
    editGroup(name, e) {
      e.preventDefault();
      e.stopPropagation()
      this.$router.push("/home/group/edit?name=" + name);
    },
    delGroup(name, e) {
      debugger
      e.preventDefault();
      e.stopPropagation()
      const that = this;
      this.$confirm('此操作将删除该分组及分组里面的svn路径', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let groups = window.localStorage.getItem("groups");
        if (groups) {
          groups = JSON.parse(groups);
          groups = groups.filter(g => g.name !== name);
        }
        window.localStorage.setItem("groups", JSON.stringify(groups));
        that.$message({
          type: 'success',
          message: '删除成功!'
        });
        that.getGroups();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    addBranch(e, group) {
      this.$router.push(`/home/branch/add${group ? `?group=${group}` : ""}`);
    },
    openCodeCount(group, branch) {
      this.$router.push(`/home/code/count?group=${group}&branch=${branch}`);
    },
    openBranch(group, branch) {
      this.$router.push(`/commit?branch=${branch}&group=${group}`);
    },
    delBranch(group, branch) {
      let groups = JSON.parse(window.localStorage.getItem("groups"));
      groups = groups.map( g => {
        if (g.name === group) {
          g.svn = g.svn.filter(b => {
            return b!== branch
          });
        } 
        return g;
      })
      window.localStorage.setItem("groups", JSON.stringify(groups));
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.getGroups();
    }
  }
}
</script>

<style lang="less">
  
</style>