<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>处分未销学生学籍</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card> </el-card>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="less" scoped>
</style>
