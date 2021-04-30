<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>查询操作学生成绩</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 查询区域 -->
          <el-input
            :clearable="true"
            v-model="stuEnrollmentNumberQuery"
            placeholder="请输入学籍号查询"
          >
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            @click="searchStudentInfo()"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button type="primary" icon="el-icon-refresh" @click="reset()"
            >重置</el-button
          >
          <el-upload
            style="margin-top: -40px; margin-left: 200px"
            :auto-upload="false"
            action="#"
            :limit="1"
            :on-change="handleUpload"
            ref="upload"
          >
            <el-button type="primary" icon="el-icon-upload2" @click="reset()"
              >批量导入</el-button
            >
          </el-upload>
        </el-col>
      </el-row>

      <el-table border stripe :data="stuInfoData" style="width: 100%" v-loading="loading">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="stuEnrollmentNumber" label="学生学籍号">
        </el-table-column>
        <el-table-column prop="stuName" label="学生姓名"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="true"
              icon="el-icon-chat-dot-round"
              @click="handleViewPoint(scope.row)"
               v-loading.fullscreen.lock="fullscreenLoading"
              >查看·操作</el-link
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        :page-sizes="[3, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="queryPageInfo.pagenum"
        :page-size="queryPageInfo.pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>

    <!-- 查看操作学生成绩表对话框 -->
    <el-dialog
    @close="handleClose()"
      title="查看操作成绩"
      :visible.sync="voPointDialogVisible"
      :fullscreen="isFull"
    >
      <el-row>
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
        <el-button
          style="margin-left: 12px"
          type="primary"
          icon="el-icon-search"
          @click="getPoint()"
          >搜索</el-button
        >

        <!-- 导出导入操作区域 -->
        <el-button
          type="primary"
          @click="exportStudentPoint"
          icon="el-icon-download"
          >导出</el-button
        >
        <!-- <el-upload
          style="margin-top: 15px"
          :auto-upload="false"
          action="#"
          :limit="1"
          :on-change="handleUpload"
          ref="upload"
        >
          <el-button type="primary" icon="el-icon-upload2"
            >点击此处导入学生成绩</el-button
          >
        </el-upload> -->
      </el-row>

      <!-- 成绩信息列表区域 -->
      <el-table border stripe :data="dataSource" v-loading="loading">
        <el-table-column label="#" type="index"></el-table-column>
        <!-- <el-table-column label="学籍号" prop="stuEnrollmentNumber"></el-table-column>
        <el-table-column label="姓名" prop="stuName"></el-table-column>
        <el-table-column label="学期状态" prop="stuPointRange"></el-table-column> -->
        <el-table-column label="科目" prop="stuSubjectName"></el-table-column>
        <el-table-column label="学分" prop="stuCredit"></el-table-column>
        <el-table-column label="绩点" prop="stuGpa"></el-table-column>
        <el-table-column label="成绩" prop="stuGrade"></el-table-column>
      </el-table>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="voPointDialogVisible = false">关 闭</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "../../../node_modules/xlsx/xlsx";
export default {
  name: "app",
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      isFull: true,
      // 分数查询参数
      pointQueryParam: "",
      // 查看操作成绩的对话框
      voPointDialogVisible: false,
      // 学生成绩查询参数
      stuEnrollmentNumberQuery: "",
      // 学生列表数据源
      stuInfoData: [],
      // 总数据条数
      total: 0,
      // 分页查询参数
      queryPageInfo: {
        pagenum: 1,
        pagesize: 5,
      },
      url: {
        stuInfoUrl: "/graduate-project/stuInfo",
      },
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
      // 存放要上传的表格数据
      excelData: [],
    };
  },
  mounted() {
    this.getStuPointData();
  },
  methods: {
    // 上传学生成绩
    async handleUpload(file) {
      let that = this;
      // 判断上传类型是否为Excel
      if (
        file.raw.type !=
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.raw.type != "application/vnd.ms-excel"
      ) {
        this.$notify.error({
          title: "出错啦",
          message: "请上传学生表文件(Excel文件)",
        });
        this.$refs.upload.clearFiles();
        return false;
      }
      //读取文件
      let reader = new FileReader();
      let flag =
        typeof FileReader !== "undefined" &&
        (FileReader.prototype || {}).readAsBinaryString;
      if (flag) {
        reader.readAsBinaryString(file.raw);
      } else {
        reader.readAsArrayBuffer(file.raw);
      }
      reader.onload = await function (e) {
        let data = e.target.result;
        let workBook = XLSX.read(data, { type: "binary" });
        workBook.SheetNames.forEach(function (name) {
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workBook.Sheets[name]
          );
          if (XL_row_object.length > 0) {
            that.excelData = JSON.parse(JSON.stringify(XL_row_object));
          }
          console.log(that.excelData);
          // 处理数据，将json对象转换为数据库需要的对象
          // that.excelData.forEach((item, index) => {
          //   let obj = {};
          //   for (let i in item) {
          //     if (i !== "stuEnrollmentNumber" && i !== "stuName") {
          //       obj[i] = item[i];
          //       delete item[i];
          //     }
          //   }
          //   item.grade = obj;
          // });
          this.loading= true
          that.$http
            .post("/graduate-project/importExcel", that.excelData)
            .then((res) => {
              if (res.data.success) {
                that.$message.success("导入成功");
                that.getPoint();
                this.loading= false
              } else {
                that.$message.error("导入失败");
              }
            });
        });
      };
    },
    // 导出对应的学生成绩
    exportStudentPoint() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../excel/Export2Excel");
        const tHeader = ["学年阶段", "科目", "学分", "绩点", "成绩"];
        const filterVal = [
          "stuPointRange",
          "stuSubjectName",
          "stuCredit",
          "stuGpa",
          "stuGrade",
        ];
        const list = this.dataSource;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "学生成绩表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    // 获取对应的学生的成绩表信息
    async getPoint() {
      // console.log(this.value);
      if (this.value == 1) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getFirstPoint?stuEnrollmentNumber=" +
            this.pointQueryParam
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          console.log(res.result);
          this.dataSource = res.result;
          this.loading= false
        }
      } else if (this.value == 2) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getSecondPoint?stuEnrollmentNumber=" +
            this.pointQueryParam
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading= false
        }
      } else if (this.value == 3) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getThirdPoint?stuEnrollmentNumber=" +
            this.pointQueryParam
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading= false
        }
      } else if (this.value == 4) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getFourthPoint?stuEnrollmentNumber=" +
            this.pointQueryParam
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading= false
        }
      } else if (this.value == 5) {
        const { data: res } = await this.$http.get(
          "/graduate-project/getAllPoint?stuEnrollmentNumber=" +
            this.pointQueryParam
        );
        if (res.status !== 200) {
          this.$message.error("出了点错误，紧急修复中");
        } else {
          // console.log(res.result);
          this.dataSource = res.result;
          this.loading= false
        }
      }
    },
    // 获取对应的所有学生信息
    async getStuPointData() {
      this.loading= true
      const { data: res } = await this.$http.get(this.url.stuInfoUrl, {
        params: this.queryPageInfo,
      });
      // console.log(res);
      if (res.status === 200) {
        this.stuInfoData = res.result;
        this.total = res.total;
        this.loading= false
      } else if (res.status === 500) {
        this.$message.error("学籍信息获取失败");
      }
    },
    handleViewPoint(row) {
      this.fullscreenLoading = true
      this.voPointDialogVisible = true;
      this.pointQueryParam = row.stuEnrollmentNumber;
      this.fullscreenLoading = false
    },
    // 处理搜索相关学生成绩信息
    async searchStudentInfo() {
      this.loading= true
      const { data: res } = await this.$http.post(
        "/graduate-project/searchStuInfoByEnrollmentNumber",
        {
          stuEnrollmentNumber: this.stuEnrollmentNumberQuery.trim(),
          pagenum: this.queryPageInfo.pagenum,
          pagesize: this.queryPageInfo.pagesize,
        }
      );
      if (res.status === 200) {
        // console.log(total);
        this.stuInfoData = res.result;
        this.total = res.result.length;
        this.$message.success(res.message);
        this.loading= false
      }
    },
    reset() {
      this.stuEnrollmentNumberQuery = ""
      this.getStuPointData()
    },
    // 处理查询信息条数改变时列表的展示
    handleSizeChange(newSize) {
      this.queryPageInfo.pagesize = newSize;
      this.getStuPointData();
    },
    handleCurrentChange(newPage) {
      this.queryPageInfo.pagenum = newPage;
      this.getStuPointData();
    },
    handleClose(){
      this.dataSource = []
      this.value = ""
    }
  },
};
</script>

<style scoped>
</style>