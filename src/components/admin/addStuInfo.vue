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
      <el-form
        ref="addFormRules"
        label-width="80px"
        :rules="addFormRules"
        :model="addInfo"
      >
        <el-form-item label="学籍号" prop="stuEnrollmentNumber">
          <el-input v-model="addInfo.stuEnrollmentNumber"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="stuIdentifyNum">
          <el-input v-model="addInfo.stuIdentifyNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="addInfo.stuName"></el-input>
        </el-form-item>
        <el-form-item label="曾用名" prop="stuPassName">
          <el-input v-model="addInfo.stuPassName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="stuGender">
          <el-select v-model="addInfo.stuGender" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="women"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="stuAge">
          <el-input v-model="addInfo.stuAge"></el-input>
        </el-form-item>
        <el-form-item label="户籍所在" prop="stuAddress">
          <el-input v-model="addInfo.stuAddress"></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="stuPoliticsStatus">
          <el-select
            v-model="addInfo.stuPoliticsStatus"
            placeholder="请选择政治面貌"
          >
            <el-option label="社会人士" value="socialman"></el-option>
            <el-option label="共青团员" value="leaguemember"></el-option>
            <el-option label="中共党员" value="chinamember"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" prop="stuNativePlace">
          <el-input v-model="addInfo.stuNativePlace"></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="stuNation">
          <el-input v-model="addInfo.stuNation"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="stuPhoneNumber">
          <el-input v-model="addInfo.stuPhoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="stuHomeAddress">
          <el-input v-model="addInfo.stuHomeAddress"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="stuPostCode">
          <el-input v-model="addInfo.stuPostCode"></el-input>
        </el-form-item>
        <el-form-item label="健康状况" prop="stuHealth">
          <el-select v-model="addInfo.stuHealth" placeholder="请选择健康情况">
            <el-option label="健康" value="health"></el-option>
            <el-option label="良好" value="better"></el-option>
            <el-option label="不健康" value="nothealth"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教育经历" prop="stuEducationExperience">
          <el-input v-model="addInfo.stuEducationExperience"></el-input>
        </el-form-item>
        <el-form-item label="荣誉信息" prop="stuHonor">
          <el-input v-model="addInfo.stuHonor"></el-input>
        </el-form-item>
        <el-form-item label="受罚记录" prop="stuPunishment">
          <el-input v-model="addInfo.stuPunishment"></el-input>
        </el-form-item>
        <!-- <el-form-item label="教育经历">
          <el-link type="primary">点击设置教育经历</el-link>
        </el-form-item>
        <el-form-item label="荣誉信息">
          <el-link type="primary">点击添加荣誉信息</el-link>
        </el-form-item>
        <el-form-item label="受罚记录">
          <el-link type="primary">点击添加惩罚记录</el-link>
        </el-form-item>
          <el-button type="primary">点击新增学籍信息</el-button>
        </el-form-item> -->
      </el-form>
      <div style="float: right; margin-bottom: 10px">
        <el-button
          type="primary"
          @click="addStudentInfo()"
          v-loading.fullscreen.lock="fullscreenLoading"
          icon="el-icon-circle-plus"
          >新增</el-button
        >
        <el-button
          type="warning"
          @click="resetInfo('addFormRules')"
          icon="el-icon-refresh-right"
          >重置</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      fullscreenLoading: false,
      // 新增学生的数据
      addInfo: {
        stuEnrollmentNumber: "",
        stuIdentifyNum: "",
        stuName: "",
        stuPassName: "",
        stuGender: "",
        stuAge: "",
        stuAddress: "",
        stuPoliticsStatus: "",
        stuNativePlace: "",
        stuNation: "",
        stuPhoneNumber: "",
        stuHomeAddress: "",
        stuPostCode: "",
        stuHealth: "",
        stuEducationExperience: "",
        stuHonor: "",
        stuPunishment: "",
      },
      //新增学籍的表单的验证规则对象
      addFormRules: {
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
        // 验证年龄
        stuAge: [
          { required: true, message: "请填写姓名", trigger: "blur" },
          {
            min: 2,
            max: 2,
            message: "年龄为10-100岁！！！",
            trigger: "blur",
          },
        ],
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
    };
  },
  methods: {
    async addStudentInfo() {
      if (this.addInfo.stuGender === "man") {
        this.addInfo.stuGender = Number(0);
      } else if (this.addInfo.stuGender === "women") {
        this.addInfo.stuGender = Number(1);
      }
      if (this.addInfo.stuPoliticsStatus === "socialman") {
        this.addInfo.stuPoliticsStatus = Number(0);
      } else if (this.addInfo.stuPoliticsStatus === "leaguemember") {
        this.addInfo.stuPoliticsStatus = Number(1);
      } else if (this.addInfo.stuPoliticsStatus === "chinamember") {
        this.addInfo.stuPoliticsStatus = Number(2);
      }
      if (this.addInfo.stuHealth === "health") {
        this.addInfo.stuHealth = Number(0);
      } else if (this.addInfo.stuHealth === "better") {
        this.addInfo.stuHealth = Number(1);
      } else if (this.addInfo.stuHealth === "nothealth") {
        this.addInfo.stuHealth = Number(-1);
      }
      if (this.addInfo.stuHonor === "") {
        this.addInfo.stuHonor = Number(0);
      } else {
        this.addInfo.stuHonor = Number(1);
      }
      if (this.addInfo.stuPunishment === "") {
        this.addInfo.stuPunishment = Number(0);
      } else {
        this.addInfo.stuPunishment = Number(1);
      }
      // console.log(this.addInfo);
      this.$refs.addFormRules.validate(async (valid) => {
        if (!valid) return;
        const confirmResult = await this.$confirm(
          "请再次确认添加信息是否正确?",
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
        this.fullscreenLoading = true;
        const { data: res } = await this.$http.post(
          "/graduate-project/addStuInfo",
          this.addInfo
        );
        if (res.status !== 200) {
          this.$http.error("学籍信息添加失败，请核查！");
        }
        // console.log(res);
        this.fullscreenLoading = false;
        this.$message.success(res.message);
        this.addInfo = {};
      });
    },
    resetInfo(addFormRules) {
      this.fullscreenLoading = true;
      this.$refs[addFormRules].resetFields();
      this.fullscreenLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>
