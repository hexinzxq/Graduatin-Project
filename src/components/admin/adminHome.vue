<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="https://z3.ax1x.com/2021/04/25/cxl5kj.png" alt="" />
        <span>大学生档案后台管理系统</span>
      </div>
      <el-button
        type="danger"
        @click="logout"
        plain
        icon="el-icon-switch-button"
        >退出</el-button
      >
    </el-header>
    <!-- 页面主体区域 -->
    <el-container style="height: 100vh">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" style="height: 100vh">
        <div class="toggle-button" @click="toggleCollapse">|||</div>

        <!-- 侧边栏菜单区域 -->
        <el-menu
          :collapse="isCollapse"
          :router="true"
          :default-active="activePath"
          :collapse-transition="false"
        >
          <el-menu-item index="/welcome">
            <i class="el-icon-s-platform"></i>
            <span slot="title">欢迎页面</span>
          </el-menu-item>
          <el-menu-item index="/stuInfo">
            <i class="el-icon-user-solid"></i>
            <span slot="title" @getStuInfoList="getStuInfoList()"
              >学生学籍信息查询</span
            >
          </el-menu-item>
          <el-menu-item index="/addStuInfo">
            <i class="el-icon-circle-plus-outline"></i>
            <span slot="title">学生学籍信息添加</span>
          </el-menu-item>
          <el-menu-item index="/stuPublish">
            <i class="el-icon-notebook-1"></i>
            <span slot="title" @getPulishStudentsInfo="getPulishStudentsInfo()"
              >处分未销学生学籍</span
            >
          </el-menu-item>
          <el-menu-item index="/stuHonor">
            <i class="el-icon-copy-document"></i>
            <span slot="title" @getPulishStudentsInfo="getHonorStudentsInfo()"
              >获奖学生学籍信息</span
            >
          </el-menu-item>
          <el-menu-item index="/addStuHonor">
            <i class="el-icon-circle-plus"></i>
            <span slot="title" @getPulishStudentsInfo="addHonorStudentsInfo()"
              >学生获奖记录添加</span
            >
          </el-menu-item>
          <el-menu-item index="/addStuPunish">
            <i class="el-icon-set-up"></i>
            <span slot="title" @getPulishStudentsInfo="addPunishStudentsInfo()"
              >学生惩罚记录添加</span
            >
          </el-menu-item>
          <el-menu-item index="/stuErrReportsDeal">
            <i class="el-icon-s-comment"></i>
            <span slot="title" @getPulishStudentsInfo="addPunishStudentsInfo()"
              >档案信息申报处理</span
            >
          </el-menu-item>
          <el-menu-item index="/stuAchievementOpration"
            ><i class="el-icon-reading"></i>
            <span slot="title" @getPulishStudentsInfo="addPunishStudentsPonit()"
              >查询操作学生成绩</span
            >
          </el-menu-item>
          <!-- <el-submenu index="/stuAchievement">
            <template slot="title"
              ><i class="el-icon-s-data"></i>成绩表操作</template
            >   
              <el-menu-item index="/stuAchievement/view"><i class="el-icon-reading"></i>查看学生成绩</el-menu-item>
              <el-menu-item index="/stuAchievement/print"><i class="el-icon-download"></i>打印对应的成绩</el-menu-item>
            </el-submenu>
          </el-submenu> -->
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main style="height: 100vh">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 控制侧边栏目的收缩与展开
      isCollapse: false,
      // 默认激活属性
      activePath: "/welcome",
    };
  },
  created() {},
  methods: {
    async logout() {
      // 询问是否退出
      const confirmResult = await this.$confirm(
        "此操作直接退出系统, 是否退出?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已撤销请求");
      }
      //清除token重定向到登录页面
      window.sessionStorage.clear();
      this.$message.success("成功退出当前页面");
      this.$router.push("/login");
    },
    // 控制侧边栏目的收缩与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    getStuInfoList() {
      this.getStuInfoList();
    },
    getPulishStudentsInfo() {
      this.getPulishStudentsInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background: linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2);
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
  }
}
.home-container {
  height: 100%;
}
.el-aside {
  background: linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2);
  background-color: #dbd4b4;
  height: 91vh;
  .el-menu {
    background: linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2);
    text-color: "#fff";
    active-text-color: "#409EFF";
    border-right: none;
  }
}
.el-main {
  background: linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2);
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background: linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2);
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
