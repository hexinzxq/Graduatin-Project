<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/stuHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的申报内容</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table border stripe :data="errReportTableData" style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="questionModule" label="出错的属性">
        </el-table-column>
        <el-table-column prop="questionDesc" label="错误的描述">
        </el-table-column>
        <el-table-column prop="questionStatus" label="状态"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      errReportTableData: [],
    };
  },
  mounted() {
    this.getErrReportInfo();
  },
  methods: {
    // 获取所有的个人错误申报信息
    async getErrReportInfo() {
      const { data: res } = await this.$http.get(
        "/graduate-project/getErrReportsInfo?stuEnrollmentNumber=" +
          localStorage.getItem("stu_enrollmentNumber")
      );
      if (res.status !== 200) {
        this.$message.warning(res.message);
      } else if (res.status === 200) {
        this.errReportTableData = res.result;
        this.errReportTableData.forEach((value, key) => {
            // console.log(value,key);
            if(value.questionStatus === 0) {
                value.questionStatus = "待审核"
            }else {
                value.questionStatus = "已处理"
            }
        })
      }
    },
  },
};
</script>

<style scoped>
</style>
