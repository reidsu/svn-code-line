<template>
  <div class="svn-branches">
    <div class="svn-content svn-branches__main">
      <div class="svn-content__add--wrap">
        <div class="svn-content__return">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{groupName}}</el-breadcrumb-item>
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
                <el-tooltip class="item" effect="dark" content="查看提交记录" placement="top-start">
                  <a
                    @click="checkBranches(currentGroup.name, item)"
                    class="svn-branches__btn"
                    href="javascript:void(0);"
                  >
                    <i class="iconfont svn-icon-view2"></i>
                  </a>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="代码总行数统计" placement="top-start">
                  <a
                    @click="countBranches(currentGroup.name, item)"
                    class="svn-branches__btn"
                    href="javascript:void(0);"
                  >
                    <i class="iconfont svn-icon-statistics"></i>
                  </a>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除分支" placement="top-start">
                  <a
                    @click="delBranches(currentGroup.name, item)"
                    class="svn-branches__btn"
                    href="javascript:void(0);"
                  >
                    <i class="el-icon-delete"></i>
                  </a>
                </el-tooltip>
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
      currentGroup: {},
      groupName: ""
    };
  },
  mounted() {
    this.init();
    this.$bus.on("init-group", this.init);
    this.groupName = this.$route.query.group;
  },
  destroyed() {
    this.$bus.off("init-group", this.init);
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
      this.getGroups();
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
    addBranches(e) {
      this.$router.push({
        name: "addBranches",
        query: {
          group: this.$route.query.group
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
      this.init();
      this.$message({
        type: "success",duration: 1000,
        message: "删除成功!"
      });
    }
  }
};
</script>

