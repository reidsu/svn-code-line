<template>
  <div class="svn-content svn-group__main">
    <!-- 添加分支 -->
    <div class="svn-content__add--wrap">
      <a @click="addGroup" class="svn-add--text" href="javascript:void(0);">
        <span>添加分组</span>
        <i class="el-icon-plus"></i>
      </a>
    </div>
    <!-- 分支列表 -->
    <div class="svn-content__inner svn-group__list">
      <!-- 分支列表 -->
      <ul v-if="groups.length>0" class="svn-group__list--inner">
        <li v-for="(item,index) in groups" :key="index" class="svn-group__item--wrap">
          <div class="svn-group__item">
            <p class="svn-group__name">{{item.name}}</p>
            <div class="svn-group__operate">
              <a
                @click="updateGroup(item.name, $event)"
                class="svn-group__btn"
                href="javascript:void(0);"
              >
                <i class="el-icon-edit"></i>
              </a>
              <a
                @click="delGroup(item.name, $event)"
                class="svn-group__btn"
                href="javascript:void(0);"
              >
                <i class="el-icon-delete"></i>
              </a>
            </div>
          </div>
        </li>
      </ul>
      <!-- 没有分支 -->
      <div v-else class="svn-empty">
        <p class="svn-empty__info">暂未添加分支</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groups: []
    };
  },
  mounted() {
    this.getGroups();
    this.$bus.on("init-group", this.getGroups);
  },
  destroyed() {
    this.$bus.off("init-group", this.getGroups);
  },
  methods: {
    // 获取分组列表
    getGroups() {
      const groups = window.localStorage.getItem("groups");
      if (!groups) {
        return;
      }
      this.groups = JSON.parse(groups);
    },
    // 添加分组
    addGroup() {
      this.$router.push({
        name: "editManage",
        params: {
          type: "add"
        },
        append: true
      });
    },
    // 编辑分组
    updateGroup(name, e) {
      e.preventDefault();
      this.$router.push({
        name: "editManage",
        params: {
          name: name,
          type: "update"
        },
        append: true
      });
    },
    // 删除分组
    delGroup(name, e) {
      e.preventDefault();
      const that = this;
      this.$confirm("此操作将删除该分组及分组里面的svn路径", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let groups = window.localStorage.getItem("groups");
          if (groups) {
            groups = JSON.parse(groups);
            groups = groups.filter(g => g.name !== name);
          }
          window.localStorage.setItem("groups", JSON.stringify(groups));
          that.$message({
            type: "success",
            message: "删除成功!"
          });
          that.getGroups();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

