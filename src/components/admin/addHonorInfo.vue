<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>学生获奖记录添加</el-breadcrumb-item>
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
        <el-form-item label="获奖时间" prop="honorTime">
          <el-input v-model="addInfo.honorTime"></el-input>
        </el-form-item>
        <el-form-item label="获奖名称" prop="honorName">
          <el-input v-model="addInfo.honorName"></el-input>
        </el-form-item>
        <el-form-item label="获奖类型" prop="honorType">
          <el-input v-model="addInfo.honorType"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="honorDesc">
          <el-input v-model="addInfo.honorDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button
          type="primary"
          @click="addStudentHonor()"
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
        honorTime: "",
        honorName: "",
        honorType: "",
        honorDesc: "",
      },
      //新增荣誉信息的表单的验证规则对象
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
        honorTime: [
          { required: true, message: "请填写获得荣誉的时间", trigger: "blur" },
          {
            min: 2,
            message: "至少2字符！！！",
            trigger: "blur",
          },
        ],
        honorName: [
          { required: true, message: "请填写获得荣誉名称", trigger: "blur" },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
        honorType: [
          { required: true, message: "请填写获得荣誉类型", trigger: "blur" },
          {
            min: 2,
            message: "至少2个字符！！！",
            trigger: "blur",
          },
        ],
        honorDesc: [
          { required: true, message: "请填写对该荣誉的描述", trigger: "blur" },
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
    // 添加操作
    addStudentHonor() {
      this.$refs.addFormRules.validate(async (valid) => {
        if (!valid) return;
        const confirmResult = await this.$confirm(
          "请再次确认添加信息是否正确,添加后不可更改！！",
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
          "/graduate-project/addStuHonor",
          this.addInfo
        );
        if (res.status !== 200) {
          this.$http.error("学籍信息添加失败，请核查！");
        }
        this.$http.get(
          "/graduate-project/switchHornorStatus?stuEnrollmentNumber=" +
            this.addInfo.stuEnrollmentNumber
        );
        this.$message.success(res.message);
        this.addInfo = {};
        this.fullscreenLoading = false
      });
    },
    // 重置表单信息操作
    resetInfo(addFormRules) {
      this.$refs[addFormRules].resetFields();
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
