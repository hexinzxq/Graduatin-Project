<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/stuHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的学籍信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 学籍信息列表区域 -->
      <el-table border stripe :data="dataSource" v-loading="loading">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          label="学籍号"
          prop="stuEnrollmentNumber"
          width="200px"
        ></el-table-column>
        <el-table-column
          label="身份证号"
          prop="stuIdentifyNum"
          width="180px"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="stuName"
          width="180px"
        ></el-table-column>
        <el-table-column
          label="曾用名"
          prop="stuPassName"
          width="180px"
        ></el-table-column>
        <el-table-column label="性别" width="180px" prop="stuGender">
        </el-table-column>
        <el-table-column label="年龄" width="180px" prop="stuAge">
        </el-table-column>
        <el-table-column label="户籍所在地" width="180px" prop="stuAddress">
        </el-table-column>
        <el-table-column
          label="政治面貌"
          width="180px"
          prop="stuPoliticsStatus"
        >
        </el-table-column>
        <el-table-column label="籍贯" width="180px" prop="stuNativePlace">
        </el-table-column>
        <el-table-column label="民族" width="180px" prop="stuNation">
        </el-table-column>
        <el-table-column label="联系电话" width="180px" prop="stuPhoneNumber">
        </el-table-column>
        <el-table-column label="家庭住址" width="180px" prop="stuHomeAddress">
        </el-table-column>
        <el-table-column label="邮政编码" width="180px" prop="stuPostCode">
        </el-table-column>
        <el-table-column label="健康状况" width="180px" prop="stuHealth">
        </el-table-column>
        <!-- <el-table-column label="教育经历" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column>
        <el-table-column label="荣誉信息" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column>
        <el-table-column label="受罚记录" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column> -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              icon="el-icon-position"
              @click="viewMyInfo(scope.row)"
              >信息审核</el-link
            >
            <el-link
              type="danger"
              :underline="false"
              icon="el-icon-link"
              @click="errorReport(scope.row)"
              >错误申报</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 错误申报对话框 -->
    <el-dialog
      @close="errReportDialogClosed"
      title="错误申报"
      :visible.sync="errorDialogVisible"
      width="60%"
    >
      <!-- 内容主体区域 -->
      <el-form
        :rules="errFormRules"
        :model="errReportForm"
        ref="errReportFormRef"
        label-width="170px"
      >
        <el-form-item prop="questionModule" label="出现问题的属性模块">
          <el-input v-model="errReportForm.questionModule"></el-input>
        </el-form-item>
        <el-form-item prop="questionDesc" label="请描述您所遇到的问题">
          <el-input v-model="errReportForm.questionDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitErrReport()" v-loading.fullscreen.lock="fullscreenLoading">提 交</el-button>
        <el-button @click="errorDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 学籍信息审核对话框 -->
    <el-dialog title="信息审核" :visible.sync="viewDialogVisible" :fullscreen="isFull">
      <!-- 内容主体区域 -->
      <el-form :model="viewForm" ref="viewFormRef" label-width="70px">
        <el-form-item label="学籍号">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuEnrollmentNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuIdentifyNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuName"
          ></el-input>
        </el-form-item>
        <el-form-item label="曾用名">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuPassName"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuGender"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input :disabled="isDisabled" v-model="viewForm.stuAge"></el-input>
        </el-form-item>
        <el-form-item label="户籍所在">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuAddress"
          ></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuPoliticsStatus"
          ></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="stuNativePlace">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuNativePlace"
          ></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="stuNation">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuNation"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuPhoneNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuHomeAddress"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuPostCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="健康状况">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuHealth"
          ></el-input>
        </el-form-item>
        <el-form-item label="教育经历">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuEducationExperience"
          ></el-input>
        </el-form-item>
        <el-form-item label="荣誉信息">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuHonor"
          ></el-input>
        </el-form-item>
        <el-form-item label="受罚记录">
          <el-input
            :disabled="isDisabled"
            v-model="viewForm.stuPunishment"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "stuPersonalInfo",
  data() {
    return {
      isFull: true,
      fullscreenLoading: false,
      loading: false,
      errFormRules: {
        questionModule: [
          { required: true, message: "请填写对应的有误模块", trigger: "blur" },
          {
            min: 2,
            max: 30,
            message: "长度为2到30个字符！！！",
            trigger: "blur",
          },
        ],
        questionDesc: [
          { required: true, message: "请填写对应的描述信息", trigger: "blur" },
          {
            min: 2,
            max: 30,
            message: "长度为2到30个字符！！！",
            trigger: "blur",
          },
        ],
      },
      errReportForm: {
        questionStatus: 0,
        stuEnrollmentNumber: localStorage.getItem("stu_enrollmentNumber"),
        stuName: localStorage.getItem("stu_name"),
        questionModule: "",
        questionDesc: "",
      },
      // 处理错误申报弹出框显示
      errorDialogVisible: false,
      isDisabled: true,
      viewForm: {
        stuEnrollmentNumber: "",
        stuIdentifyNum: "",
        stuName: "",
        stuPassName: "",
        stuGender: "",
        stuAge: "",
        stuAddress: "",
        stuNativePlace: "",
        stuNation: "",
        stuPhoneNumber: "",
        stuHomeAddress: "",
        stuPostCode: "",
        stuHealth: "",
        stuEducationExperience: "",
        stuPoliticsStatus: "",
        stuHonor: "",
        stuPunishment: "",
      },
      // 对话框的可见性属性
      viewDialogVisible: false,
      dataSource: [],
      url: {
        stuInfoUrl:
          "/graduate-project/viewStuInfo?stuEnrollmentNumber=" +
          localStorage.getItem("stu_enrollmentNumber"),
      },
    };
  },
  mounted() {
    this.getStuInfo();
  },
  methods: {
    submitErrReport() {
      this.$refs.errReportFormRef.validate(async (valid) => {
        if (!valid) return;
         this.fullscreenLoading = true
        const { data: res } = await this.$http.post(
          "/graduate-project/saveErrReport",
          this.errReportForm
        );
        if (res.status !== 200) {
          this.$message.err("出了些问题");
        }
        this.switchErrStatus()
        this.$message.success(res.message);
        this.errReportDialogClosed()
         this.fullscreenLoading = false
      });
    },
    // 更改错误识别码
    async switchErrStatus() {
     const {data:res}= await this.$http.get(
        "/graduate-project/switchErrStatus?stuEnrollmentNumber=" +
          localStorage.getItem("stu_enrollmentNumber")
      );
      if(res.status !== 200) {
        this.$message.error(res.message)
      }
    },
    errReportDialogClosed() {
      this.errorDialogVisible = false
      this.$refs.errReportFormRef.resetFields();
    },
    // 处理错误申报
    errorReport(row) {
      this.errorDialogVisible = true;
    },
    // 信息审核
    async viewMyInfo(row) {
      this.loading= true
      this.viewDialogVisible = true;
      const { data: res } = await this.$http.get(
        "/graduate-project/viewStuPersonalInfo?stuEnrollmentNumber=" +
          row.stuEnrollmentNumber
      );
      if (res.status !== 200) {
        this.$message.error("获取信息出错");
      }
      if (res.result[0].stuGender === 0) {
        res.result[0].stuGender = "男";
      } else {
        res.result[0].stuGender = "女";
      }
      if (res.result[0].stuPoliticsStatus === 0) {
        res.result[0].stuPoliticsStatus = "社会人士";
      } else if (res.result[0].stuPoliticsStatus === 1) {
        res.result[0].stuPoliticsStatus = "共青团员";
      } else {
        res.result[0].stuPoliticsStatus = "中共党员";
      }
      if (res.result[0].stuHealth == 0) {
        res.result[0].stuHealth = "健康";
      } else if (res.result[0].stuHealth == 1) {
        res.result[0].stuHealth = "良好";
      } else {
        res.result[0].stuHealth = "不健康";
      }
      if (res.result[0].stuHonor === 0) {
        res.result[0].stuHonor = "无";
      } else {
        res.result[0].stuHonor = "有（请前往个人中心--->我的荣誉查看）";
      }
      if (res.result[0].stuPunishment === 0) {
        res.result[0].stuPunishment = "无";
      } else {
        res.result[0].stuPunishment = "有（请前往个人中心--->我的处分查看）";
      }
      this.viewForm = res.result[0];
      this.loading= false
    },
    async getStuInfo() {
      this.loading= true
      const { data: res } = await this.$http.get(this.url.stuInfoUrl);
      // console.log(res.student);
      if (res.status === 200) {
        this.dataSource = res.result;
        this.dataSource.forEach((value, key) => {
          // console.log(value);
          if (value.stuGender === 0) {
            value.stuGender = "男";
          } else {
            value.stuGender = "女";
          }
          if (value.stuHealth == 0) {
            value.stuHealth = "健康";
          } else if (value.stuHealth == 1) {
            value.stuHealth = "良好";
          } else if (value.stuHealth == -1) {
            value.stuHealth = "不健康";
          }
          if (value.stuPoliticsStatus === 0) {
            value.stuPoliticsStatus = "社会人士";
          } else if (value.stuPoliticsStatus === 1) {
            value.stuPoliticsStatus = "共青团员";
          } else if (value.stuPoliticsStatus === 2) {
            value.stuPoliticsStatus = "中共党员";
          }
        });
        this.loading= false
        // console.log(this.dataSource);
        // this.dataSource = res.result;
      } else if (res.status === 500) {
        this.$message.console.error("未能请求到您的学籍档案数据");
      }
    },
  },
};
</script>

<style scoped>
.el-table th > .cell {
  text-align: center;
}

.el-table .cell {
  text-align: center;
}
</style>
