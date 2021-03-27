<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>学生学籍信息添加</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-form ref="form" label-width="80px">
        <el-form-item label="学籍号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="曾用名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="women"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="户籍所在">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-select placeholder="请选择政治面貌">
            <el-option label="社会人士" value="socialman"></el-option>
            <el-option label="共青团员" value="leaguemember"></el-option>
            <el-option label="中共党员" value="chinamember"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="健康状况">
          <el-select placeholder="请选择健康情况">
            <el-option label="健康" value="health"></el-option>
            <el-option label="良好" value="better"></el-option>
            <el-option label="不健康" value="nothealth"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教育经历">
          <el-link type="primary">点击设置教育经历</el-link>
        </el-form-item>
        <el-form-item label="荣誉信息">
          <el-link type="primary">点击添加荣誉信息</el-link>
        </el-form-item>
        <el-form-item label="受罚记录">
          <el-link type="primary">点击添加惩罚记录</el-link>
        </el-form-item>
          <el-button type="primary">点击新增学籍信息</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      
    }
  },
};
</script>

<style lang="less" scoped>
</style>
