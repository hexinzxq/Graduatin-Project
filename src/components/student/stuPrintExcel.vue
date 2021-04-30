<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的成绩表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>


          <span>请选择成绩查询区间：</span>
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>


          <!-- 查询区域 -->
          <el-button type="primary" style="margin-left: 8px" icon="el-icon-search" @click="getPoint()"
            >查询</el-button
          >

          <!-- 导出操作区域 -->
          <el-button type="primary" @click="exportData" icon="el-icon-download"
            >导出</el-button
          >


      <!-- 成绩信息列表区域 -->
      <el-table border stripe :data="dataSource" v-loading="loading">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="科目" prop="stuSubjectName"></el-table-column>
        <el-table-column label="学分" prop="stuCredit"></el-table-column>
        <el-table-column label="绩点" prop="stuGpa"></el-table-column>
        <el-table-column label="成绩" prop="stuGrade"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "stuPrintExcel",
  data() {
    return {
      loading:false,
      options: [
        {
          value: "1",
          label: "第一学年",
        },
        {
          value: "2",
          label: "第二学年",
        },
        {
          value: "3",
          label: "第三学年",
        },
        {
          value: "4",
          label: "第四学年",
        },
        {
          value: "5",
          label: "全部成绩",
        },
      ],
      value: "",
      // 成绩表数据源
      dataSource: [],
    };
  },
  methods: {
    // 导出成绩信息
    exportData() {
      // console.log(this.dataSource);
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = ["科目", "学分", "绩点", "成绩"];
        const filterVal = ["stuSubjectName", "stuCredit", "stuGpa", "stuGrade"];
        const list = this.dataSource;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "我的成绩表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    async getPoint() {
      this.loading= true
      // console.log(this.value);
      if (this.value === "") {
        this.$message.warning("请选择成绩查询区间");
        this.loading=false
      } else if (this.value == 1) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getFirstPoint?stuEnrollmentNumber=" +
            localStorage.getItem("stu_enrollmentNumber")
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading=false
        }
      } else if (this.value == 2) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getSecondPoint?stuEnrollmentNumber=" +
            localStorage.getItem("stu_enrollmentNumber")
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading=false
        }
      } else if (this.value == 3) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getThirdPoint?stuEnrollmentNumber=" +
            localStorage.getItem("stu_enrollmentNumber")
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading=false
        }
      } else if (this.value == 4) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getFourthPoint?stuEnrollmentNumber=" +
            localStorage.getItem("stu_enrollmentNumber")
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading=false
        }
      } else if (this.value == 5) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getAllPoint?stuEnrollmentNumber=" +
            localStorage.getItem("stu_enrollmentNumber")
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading=false
        }
      }
    },
  },
};
</script>

<style scoped>
</style>
