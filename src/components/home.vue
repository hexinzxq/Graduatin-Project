<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>大学生档案后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>

        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse = "isCollapse"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区域 -->
            <template>
              <!-- 图标 -->
            </template>

            <!-- 二级菜单 -->
            <el-menu-item>
              <!-- 图标 -->
              <span></span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
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
      isCollapse : false
    }
  },
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
      ).catch((err) => err)
       if (confirmResult !== "confirm") {
        return this.$message.info("已撤销请求")
      }
      //清除token重定向到登录页面
      window.sessionStorage.clear();
      this.$message.success('成功退出当前页面')
      this.$router.push("/login");
    },
    // 控制侧边栏目的收缩与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
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
    }
  }
}
.home-container {
  height: 100%;
}
.el-aside {
  background-color: #333744;
  height: 100vh;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
