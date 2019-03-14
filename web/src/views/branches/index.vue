<template>
  <div class="svn-branches">
    <!-- 分组展示 -->
    <!-- <div class="svn-branches__group">
      <h3 class="svn-branches__group__title">SVN分组</h3>
      <ul v-if="groups!==undefined&&groups.length>0" class="svn-branches__group__list">
        <li v-for="(item,index) in groups" :key="index" class="svn-branches__group--wrap">
          <a
            @click="handleGroup(item,index)"
            :class="item.active?'active':''"
            class="svn-branches__group__item"
            href="javascript:void(0);"
          >{{item.name}}</a>
        </li>
      </ul>
      <div v-else class="svn-empty">
        <p class="svn-empty__info">暂未添加分组</p>
      </div>
    </div> -->
    <!-- 分支展示 -->
    <div class="svn-content svn-branches__main">
      <!-- 添加分支 -->
     
      <div class="svn-content__add--wrap">
        <div class="svn-content__return">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分组</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <a @click="addBranches" class="svn-add--text" href="javascript:void(0);">
          <span>添加分支</span>
          <i class="el-icon-plus"></i>
        </a>
      </div>
      <!-- 分支列表 -->
      <div class="svn-content__inner svn-branches__list">
        <!-- 分支列表 -->
        <ul
          v-if="currentGroup!==undefined&&currentGroup.svn!==undefined&&currentGroup.svn.length>0"
          class="svn-branches__list--inner"
        >
          <li
            v-for="(item,index) in currentGroup.svn"
            :key="index"
            class="svn-branches__item--wrap"
          >
            <div class="svn-branches__item">
              <p class="svn-branches__link">{{item}}</p>
              <div class="svn-branches__operate">
                <a
                  @click="checkBranches(currentGroup.name, item)"
                  class="svn-branches__btn"
                  href="javascript:void(0);"
                >
                  <i class="iconfont svn-icon-view2"></i>
                </a>
                <a
                  @click="countBranches(currentGroup.name, item)"
                  class="svn-branches__btn"
                  href="javascript:void(0);"
                >
                  <i class="iconfont svn-icon-statistics"></i>
                </a>
                <a
                  @click="delBranches(currentGroup.name, item)"
                  class="svn-branches__btn"
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
          <p class="svn-empty__info">该分组暂未添加SVN分支</p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groups: [],
      currentGroup: {}
    };
  },
  mounted() {
    this.getGroups();
    this.init();
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
    // 初始化
    init() {
      this.currentGroup = this.groups.find(g => g.name === this.$route.query.group);
    },
    // 点击单个组
    handleGroup(data, currentIndex) {
      this.currentGroup = data;
      this.groups.forEach((item, index) => {
        if (index === currentIndex) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
    // 添加分支
    addBranches(e, group) {
      this.$router.push({
        name: "addBranches",
        params: {
          group: group ? group : ""
        },
        append: true
      });
    },
    // 查看提交记录
    checkBranches(group, branch) {
      this.$router.push({
        name: "commit",
        query: {
          branch,
          group
        },
      });
    },
    // 统计总代码量
    countBranches(group, branch) {
      this.$router.push({
        name: "codeCount",
        params: {
          group: group,
          branch: branch
        },
        query: {
          branch,
          group
        },
        append: true
      });
    },
    // 删除分支
    delBranches(group, branch) {
      let groups = JSON.parse(window.localStorage.getItem("groups"));
      groups = groups.map(g => {
        if (g.name === group) {
          g.svn = g.svn.filter(b => {
            return b !== branch;
          });
        }
        return g;
      });
      window.localStorage.setItem("groups", JSON.stringify(groups));
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.getGroups();
    }
  }
};
</script>

