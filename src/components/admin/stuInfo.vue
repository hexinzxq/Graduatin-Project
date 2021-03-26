<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>学生学籍信息查询</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input
            :clearable="true"
            placeholder="请输入学生名称"
          >
            <el-button
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
            >搜索学生档案</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="学籍号" prop="username" width="180px"></el-table-column>
        <el-table-column label="身份证号" prop="email" width="180px"></el-table-column>
        <el-table-column label="姓名" prop="mobile" width="180px"></el-table-column>
        <el-table-column label="曾用名" prop="role_name" width="180px"></el-table-column>
        <el-table-column label="性别" width="180px"> </el-table-column>
        <el-table-column label="年龄" width="180px"> </el-table-column>
        <el-table-column label="户籍所在地" width="180px"> </el-table-column>
        <el-table-column label="政治面貌" width="180px"> </el-table-column>
        <el-table-column label="籍贯" width="180px"> </el-table-column>
        <el-table-column label="民族" width="180px"> </el-table-column>
        <el-table-column label="联系电话" width="180px"> </el-table-column>
        <el-table-column label="家庭住址" width="180px"> </el-table-column>
        <el-table-column label="邮政编码" width="180px"> </el-table-column>
        <el-table-column label="教育经历" width="180px"> </el-table-column>
        <el-table-column label="健康状况" width="180px"> </el-table-column>
        <el-table-column label="荣誉信息" width="180px"> </el-table-column>
        <el-table-column label="受罚记录" width="180px"> </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="less" scoped>
</style>
