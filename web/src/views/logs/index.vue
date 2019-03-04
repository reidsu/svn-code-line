<template>
  <el-container class="svn-log">
    <svn-header/>
    <el-main class="svn-content">
      <div class="svn-log__search">
        <el-input
          v-model="svnLink"
          @keyup.enter.native="handleSearch"
          clearable
          placeholder="请输入SVN地址查询日志记录"
        ></el-input>
        <el-button @click="handleSearch" class="svn-btn">查询</el-button>
      </div>
      <div class="svn-log__detail">
        <div v-if="logList.length===0" class="svn-log__empty">
          <p class="svn-log__empty--tips">暂无日志记录哟～</p>
        </div>
        <div v-else class="svn-log__table--wrap">
          <el-table
            ref="logTable"
            :data="logList"
            tooltip-effect="dark"
            class="svn-log__table"
            @selection-change="handleSelectionChange"
          >
            <el-table-column fixed type="selection" width="60" align="center"></el-table-column>
            <el-table-column label="版本" width="120" align="center">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="日期" width="120" align="center"></el-table-column>
            <el-table-column prop="address" label="信息"></el-table-column>
          </el-table>
          <div class="svn-log__btn">
            <el-button @click="handleStat" class="svn-btn" :disabled="selectionArr.length===0">统计</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import SvnHeader from "./../../components/Header";

export default {
  data() {
    return {
      svnLink: "",
      logList: [],
      logList1: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      selectionArr: []
    };
  },
  components: {
    SvnHeader
  },
  methods: {
    // 查询
    handleSearch() {
      if (!this.svnLink) {
        this.$message.error("请输入SVN地址");
      } else {
        this.logList = this.logList1;
      }
    },

    // 选中记录
    handleSelectionChange(data) {
      this.selectionArr = data;
    },

    // 统计
    handleStat() {
      console.log("统计");
      this.$router.push({ path: "stat" });
    }
  }
};
</script>

