<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img :src="avartarSrc" alt="">
        <span>个人中心</span>
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
          <el-menu-item index="/stuWelcome">
            <i class="el-icon-s-platform"></i>
            <span slot="title">欢迎页面</span>
          </el-menu-item>
          <el-menu-item index="/stuPersonalInfo">
            <i class="el-icon-menu"></i>
            <span slot="title">我的学籍信息</span>
          </el-menu-item>
          <el-menu-item index="/stuPersonalReport">
            <i class="el-icon-s-finance"></i>
            <span slot="title">我的申报内容</span>
          </el-menu-item>
          <el-menu-item index="/stuPersonalHonor">
            <i class="el-icon-user-solid"></i>
            <span slot="title">我的荣誉</span>
          </el-menu-item>
          <el-menu-item index="/stuPersonalPublish">
            <i class="el-icon-s-release"></i>
            <span slot="title">我的处分</span>
          </el-menu-item>
          <el-menu-item index="/stuPrintExcel">
            <i class="el-icon-download"></i>
            <span slot="title">我的成绩表</span>
          </el-menu-item>
          <!-- <el-menu-item index="/stuMaterials">
            <i class="el-icon-star-on"></i>
            <span slot="title">我的资料</span> -->
          </el-menu-item>
          <el-menu-item index="/passwordService">
            <i class="el-icon-s-tools"></i>
            <span slot="title">趣味中心</span>
          </el-menu-item>
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
      // 头像src属性
      avartarSrc: "",
      // 控制侧边栏目的收缩与展开
      isCollapse: false,
      // 默认激活属性
      activePath: "/stuWelcome",
    };
  },
  mounted() {
    this.avartarSrc= localStorage.getItem("avartar_src")
    // console.log(this.avartarSrc);
  },
  created() {
    this.avartarSrc= localStorage.getItem("avartar_src")
  },
  methods: {
    async logout() {
      // 询问是否退出
      const confirmResult = await this.$confirm(
        "亲爱的"+localStorage.getItem('stu_name')+",真的要退出吗?",
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
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background: linear-gradient(to right, #70e1f5, #ffd194);
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
  background: linear-gradient(to right, #70e1f5, #ffd194);
  height: 92vh;
  .el-menu {
    background: linear-gradient(to right, #70e1f5, #ffd194);
    background-color: "#333744";
    text-color: "#fff";
    active-text-color: "#409EFF";
    border-right: none;
  }
}
.el-main {
  background: linear-gradient(to right, #70e1f5, #ffd194);
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background: linear-gradient(to right, #70e1f5, #ffd194);
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
