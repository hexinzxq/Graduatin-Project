<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>成绩表操作</el-breadcrumb-item>
      <el-breadcrumb-item>打印对应的成绩</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card></el-card>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style scoped>
</style>