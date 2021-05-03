<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/stuHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的处分</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table border stripe :data="viewTableData" style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="punishmentTime" label="获罚时间">
        </el-table-column>
        <el-table-column prop="punishmentTimeLong" label="获罚时长">
        </el-table-column>
        <el-table-column prop="punishmentFinish" label="销罚时间">
        </el-table-column>
        <el-table-column prop="punishmentByPerson" label="发起人">
        </el-table-column>
        <el-table-column prop="punishmentName" label="惩罚名称">
        </el-table-column>
        <el-table-column prop="punishmentType" label="惩罚类型">
        </el-table-column>
        <el-table-column prop="punishmentDesc" label="惩罚描述">
        </el-table-column>
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
    this.viewMyPunish()
  },
  methods: {
    async viewMyPunish() {
      const { data: res } = await this.$http.get(
        "/graduate-project-punish/viewPunish?stuEnrollmentNumber=" +
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