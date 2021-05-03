<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>学生惩罚记录添加</el-breadcrumb-item>
    </el-breadcrumb>

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
        <el-form-item label="姓名" prop="stuName">
          <el-input v-model="addInfo.stuName"></el-input>
        </el-form-item>
        <el-form-item label="发起人" prop="punishmentByPerson">
          <el-input v-model="addInfo.punishmentByPerson"></el-input>
        </el-form-item>
        <el-form-item label="处罚名称" prop="punishmentName">
          <el-input v-model="addInfo.punishmentName"></el-input>
        </el-form-item>
        <el-form-item label="处罚类型" prop="punishmentType">
          <el-input v-model="addInfo.punishmentType"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="punishmentDesc">
          <el-input v-model="addInfo.punishmentDesc"></el-input>
        </el-form-item>
        <el-form-item label="获罚时间" prop="punishmentTime">
          <el-input v-model="addInfo.punishmentTime"></el-input>
        </el-form-item>
        <el-form-item label="处罚时长" prop="punishmentTimeLong">
          <el-input v-model="addInfo.punishmentTimeLong"></el-input>
        </el-form-item>
        <el-form-item label="终止时间" prop="punishmentFinish">
          <el-input v-model="addInfo.punishmentFinish"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button
          type="primary"
          @click="addStudentPunish()"
          v-loading.fullscreen.lock="fullscreenLoading"
          ><i class="el-icon-circle-plus"></i>新增</el-button
        >
        <el-button type="warning" @click="resetInfo('addFormRules')"
          ><i class="el-icon-refresh-right"></i>重置</el-button
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      fullscreenLoading: false,
      addInfo: {
        stuEnrollmentNumber: "",
        stuName: "",
        punishmentByPerson: "",
        punishmentName: "",
        punishmentType: "",
        punishmentDesc: "",
        punishmentTime: "",
        punishmentTimeLong: "",
        punishmentFinish: "",
      },
      //新增处罚信息的表单的验证规则对象
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
        punishmentTime: [
          { required: true, message: "请填写获得处罚的时间", trigger: "blur" },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
        punishmentName: [
          { required: true, message: "请填写获得处罚名称", trigger: "blur" },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
        punishmentType: [
          { required: true, message: "请填写获得处罚类型", trigger: "blur" },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
        punishmentDesc: [
          { required: true, message: "请填写对该处罚的描述", trigger: "blur" },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
        punishmentByPerson: [
          { required: true, message: "请填写对该处罚发起人", trigger: "blur" },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
        punishmentTimeLong: [
          {
            required: true,
            message: "请填写对该处罚处罚时长",
            trigger: "blur",
          },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
        punishmentFinish: [
          {
            required: true,
            message: "请填写对该处罚的结束时间",
            trigger: "blur",
          },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 重置表单信息操作
    resetInfo(addFormRules) {
      this.$refs[addFormRules].resetFields();
    },
    addStudentPunish() {
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
          "/graduate-project/addStuPunish",
          this.addInfo
        );
        if (res.status !== 200) {
          this.$http.error("学籍处罚信息添加失败，请核查！");
        }
        this.$http.get(
          "/graduate-project/switchPunishToTrue?stuEnrollmentNumber=" +
            this.addInfo.stuEnrollmentNumber
        );
        this.$message.success(res.message);
        this.addInfo = {};
        this.fullscreenLoading = false;
      });
    },
  },
};
</script>

<style scoped>
.el-row {
  float: right;
  margin-bottom: 15px;
}
</style>
