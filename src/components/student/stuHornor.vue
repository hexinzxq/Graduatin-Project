<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/stuHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的荣誉</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table border stripe :data="viewTableData" style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="honorTime" label="获奖时间"> </el-table-column>
        <el-table-column prop="honorName" label="获奖名称"> </el-table-column>
        <el-table-column prop="honorType" label="获奖类型"> </el-table-column>
        <el-table-column prop="honorDesc" label="奖励描述"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      viewTableData: [],
    };
  },
  mounted() {
    this.getMyHornor()
  },
  methods: {
    async getMyHornor() {
      const { data: res } = await this.$http.get(
        "/graduate-project-punish/viewHonor?stuEnrollmentNumber=" +
          localStorage.getItem("stu_enrollmentNumber")
      );
      if (res.status !== 200) {
        this.$message.warning(res.message);
      } else if (res.status === 200) {
        this.viewTableData = res.result;
      }
    },
  },
};
</script>

<style scoped>
</style>
