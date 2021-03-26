<template>
<div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/stuhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案系统个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎页面</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>Welcome to this College Students' Archives System</h1>
</div>
</template>

<script>
export default {
  name: "Welcome",
}
</script>

<style lang="less" scoped>
h1{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% , -50%);
}
</style>
