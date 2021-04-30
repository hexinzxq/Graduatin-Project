<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>档案信息申报处理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table border stripe :data="errReportData" style="width: 100%">
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
              @click="handleViewInfo(scope.row)"
              v-loading.fullscreen.lock="fullscreenLoading"
              >查看申报信息</el-link
            >
            <el-link
              type="primary"
              :underline="true"
              icon="el-icon-edit"
              @click="handleDeal(scope.row)"
              v-loading.fullscreen.lock="fullscreenLoading"
              >处理</el-link
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

    <!-- 查看申报信息弹窗 -->
    <el-dialog
      @close="editDialogClosed"
      title="查看申报信息"
      :visible.sync="viewReportVisible"
      width="60%"
    >
      <el-table border stripe :data="errReportTableData" style="width: 100%" v-loading="loading">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="questionModule" label="出错的属性">
        </el-table-column>
        <el-table-column prop="questionDesc" label="错误的描述">
        </el-table-column>
        <el-table-column prop="questionStatus" label="状态"> </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 处理审核信息对话框 -->
    <el-dialog
      @close="editDialogClosed"
      title="申报信息处理"
      :visible.sync="editDialogVisible"
      fullscreen= "true"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="学籍号" prop="stuEnrollmentNumber">
          <el-input v-model="editForm.stuEnrollmentNumber"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="stuIdentifyNum">
          <el-input v-model="editForm.stuIdentifyNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="editForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="曾用名" prop="stuPassName">
          <el-input v-model="editForm.stuPassName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="stuGender">
          <el-select v-model="editForm.stuGender" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="women"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="stuAge">
          <el-input v-model="editForm.stuAge"></el-input>
        </el-form-item>
        <el-form-item label="户籍所在" prop="stuAddress">
          <el-input v-model="editForm.stuAddress"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="stuPoliticsStatus">
          <el-select
            v-model="editForm.stuPoliticsStatus"
            placeholder="请选择政治面貌"
          >
            <el-option label="社会人士" value="socialman"></el-option>
            <el-option label="共青团员" value="leaguemember"></el-option>
            <el-option label="中共党员" value="chinamember"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" prop="stuNativePlace">
          <el-input v-model="editForm.stuNativePlace"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="stuNation">
          <el-input v-model="editForm.stuNation"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="stuPhoneNumber">
          <el-input v-model="editForm.stuPhoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="stuHomeAddress">
          <el-input v-model="editForm.stuHomeAddress"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="stuPostCode">
          <el-input v-model="editForm.stuPostCode"></el-input>
        </el-form-item>
        <el-form-item label="健康状况" prop="stuHealth">
          <el-select v-model="editForm.stuHealth" placeholder="请选择健康情况">
            <el-option label="健康" value="health"></el-option>
            <el-option label="良好" value="better"></el-option>
            <el-option label="不健康" value="nothealth"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教育经历" prop="stuEducationExperience">
          <el-input v-model="editForm.stuEducationExperience"></el-input>
        </el-form-item>
        <el-form-item label="荣誉信息" prop="stuHonor">
          <el-input v-model="editForm.stuHonor"></el-input>
        </el-form-item>
        <el-form-item label="受罚记录" prop="stuPunishment">
          <el-input v-model="editForm.stuPunishment"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editInfo()" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      loading: false,
      fullscreenLoading: false,
      editDialogVisible: false,
      viewReportVisible: false,
      total: 0,
      // 分页查询参数
      queryPageInfo: {
        pagenum: 1,
        pagesize: 5,
      },
      errReportData: [],
      errReportTableData: [],
      // 编辑学籍的验证规则对象
      editFormRules: {
        //验证学籍号是否合法
        stuEnrollmentNumber: [
          { required: true, message: "请填写学生学籍号", trigger: "blur" },
          {
            min: 20,
            max: 20,
            message: "长度为 20 个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证身份证是否合法
        stuIdentifyNum: [
          { required: true, message: "请填写身份证号码", trigger: "blur" },
          {
            min: 18,
            max: 18,
            message: "长度为 18 个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证姓名
        stuName: [
          { required: true, message: "请填写姓名", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度为2到8个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证曾用名
        stuPassName: [
          { required: false },
          {
            min: 2,
            max: 8,
            message: "长度为2到8个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证性别
        stuGender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        // 验证户籍所在地
        stuAddress: [
          { required: true, message: "请填写户籍所在地", trigger: "blur" },
          {
            min: 4,
            max: 40,
            message: "长度为4到40个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证政治面貌
        stuPoliticsStatus: [
          { required: true, message: "请选择政治面貌", trigger: "blur" },
        ],
        // 验证籍贯
        stuNativePlace: [
          { required: true, message: "请填写籍贯信息", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度为3到12个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证民族
        stuNation: [
          { required: true, message: "请填写所属民族", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度为2到12个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证电话号码
        stuPhoneNumber: [
          { required: true, message: "请填写姓名", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度为11个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证家庭住址
        stuHomeAddress: [
          { required: true, message: "请填写家庭住址", trigger: "blur" },
          {
            min: 4,
            max: 40,
            message: "长度为4到40个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证邮编
        stuPostCode: [
          { required: true, message: "请填写邮政编码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "长度为6个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证健康状况
        stuHealth: [
          { required: true, message: "请选择健康状况", trigger: "blur" },
        ],
        // 验证教育经历
        stuEducationExperience: [
          { required: true, message: "请填写教育经历", trigger: "blur" },
          {
            min: 10,
            message: "至少10个字符！！！",
            trigger: "blur",
          },
        ],
        // 验证姓名
        stuName: [
          { required: true, message: "请填写姓名", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度为2到8个字符！！！",
            trigger: "blur",
          },
        ],
      },
      // 编辑学籍信息的数据
      editForm: {},
    };
  },
  mounted() {
    this.getStudentsHaveErr();
  },
  methods: {
    // 处理编辑学生对话框和编辑数据发送
    handleDeal(row) {
      this.fullscreenLoading = true
      this.editDialogVisible = true;
      if (row.stuGender === "男") {
        row.stuGender = Number(0);
      } else if (row.stuGender === "女") {
        row.stuGender = Number(1);
      }
      if (row.stuPoliticsStatus === "社会人士") {
        row.stuPoliticsStatus = Number(0);
      } else if (row.stuPoliticsStatus === "共青团员") {
        row.stuPoliticsStatus = Number(1);
      } else if (row.stuPoliticsStatus === "中共党员") {
        row.stuPoliticsStatus = Number(2);
      }
      if (row.stuHealth === "健康") {
        row.stuHealth = Number(0);
      } else if (row.stuHealth === "良好") {
        row.stuHealth = Number(1);
      } else if (row.stuHealth === "不健康") {
        row.stuHealth = Number(-1);
      }
      if (row.stuHonor === "") {
        row.stuHonor = "";
      } else {
        row.stuHonor = Number(1);
      }
      if (row.stuPunishment === "") {
        row.stuPunishment = "";
      } else {
        row.stuPunishment = Number(1);
      }
      this.editForm = row;
      this.fullscreenLoading = false
      // console.log(this.editForm);
    },
    // 处理提交编辑结果更新学籍信息列表解决其信息错误
    editInfo() {
      if (this.editForm.stuGender === "man") {
        this.editForm.stuGender = Number(0);
      } else if (this.editForm.stuGender === "women") {
        this.editForm.stuGender = Number(1);
      }
      if (this.editForm.stuPoliticsStatus === "socialman") {
        this.editForm.stuPoliticsStatus = Number(0);
      } else if (this.editForm.stuPoliticsStatus === "leaguemember") {
        this.editForm.stuPoliticsStatus = Number(1);
      } else if (this.editForm.stuPoliticsStatus === "chinamember") {
        this.editForm.stuPoliticsStatus = Number(2);
      }
      if (this.editForm.stuHealth === "health") {
        this.editForm.stuHealth = Number(0);
      } else if (this.editForm.stuHealth === "better") {
        this.editForm.stuHealth = Number(1);
      } else if (this.editForm.stuHealth === "nohealth") {
        this.editForm.stuHealth = Number(-1);
      }
      if (this.editForm.stuHonor === "") {
        this.editForm.stuHonor = "";
      } else {
        this.editForm.stuHonor = Number(1);
      }
      if (this.editForm.stuPunishment === "") {
        this.editForm.stuPunishment = "";
      } else {
        this.editForm.stuPunishment = Number(1);
      }
      // console.log(this.editForm);
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        const confirmResult = await this.$confirm(
          "请再次确认是否已正确修改所有的申报错误?",
          "提示",
          {
            confirmButtonText: "确认无误",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch((err) => err);
        if (confirmResult !== "confirm") {
          return this.$message.info("已取消");
        }
        this.fullscreenLoading = true
        const { data: res } = await this.$http.post(
          "/graduate-project/editStuInfo",
          this.editForm
        );
        if (res.status !== 200) {
          this.$message.error("编辑失败");
        }
        // console.log(res.result);
        await this.$http.get(
          "/graduate-project/switchErrStatusToFalse?stuEnrollmentNumber=" +
            this.editForm.stuEnrollmentNumber
        );
        await this.$http.get(
          "/graduate-project/switchquestionStatusToTrue?stuEnrollmentNumber=" +
            this.editForm.stuEnrollmentNumber
        );
        this.$message.success(res.message);
        this.editDialogVisible = false;
        this.getStudentsHaveErr();
        this.fullscreenLoading = false
      });
    },
    async handleViewInfo(row) {
      this.fullscreenLoading = true
      this.viewReportVisible = true;
      const { data: res } = await this.$http.get(
        "/graduate-project/getErrReportsInfo?stuEnrollmentNumber=" +
          row.stuEnrollmentNumber
      );
      if (res.status !== 200) {
        this.$message.warning(res.message);
      } else if (res.status === 200) {
        this.errReportTableData = res.result;
        this.errReportTableData.forEach((value, key) => {
          // console.log(value,key);
          if (value.questionStatus === 0) {
            value.questionStatus = "待审核";
          } else {
            value.questionStatus = "已处理";
          }
        });
        this.fullscreenLoading = false
      }
    },
    //获取所有提交了错误申报的学生信息
    async getStudentsHaveErr() {
      this.loading= true
      const { data: res } = await this.$http.get(
        "/graduate-project/getStuInfoHaveErr",
        {
          params: this.queryPageInfo,
        }
      );
      if (res.status === 200) {
        // console.log(res.result);
        this.errReportData = res.result;
        this.errReportData.forEach((value, key) => {
          // console.log(value);
          if (value.stuGender === 0) {
            value.stuGender = "男";
          } else {
            value.stuGender = "女";
          }
          if (value.stuHealth === 0) {
            value.stuHealth = "健康";
          } else if (value.stuHealth === 1) {
            value.stuHealth = "良好";
          } else if (value.stuHealth === -1) {
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
        // this.$message.success(res.message);
        this.total = res.total;
        this.loading= false
      }
    },
    // 处理查询信息条数改变时列表的展示
    handleSizeChange(newSize) {
      this.queryPageInfo.pagesize = newSize;
      this.getStudentsHaveErr();
    },
    handleCurrentChange(newPage) {
      this.queryPageInfo.pagenum = newPage;
      this.getStudentsHaveErr();
    },
    // 监听编辑对话框关闭事件
    editDialogClosed() {
      this.editDialogVisible = false;
    },
  },
};
</script>

<style scoped>
</style>
