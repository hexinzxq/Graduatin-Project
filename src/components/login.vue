<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avator_box">
        <img src="https://z3.ax1x.com/2021/04/25/cxl5kj.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="loginName" style="margin-top: 120px">
          <el-input
            placeholder="请输入账号"
            prefix-icon="iconfont icon-user"
            v-model="loginForm.loginName"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="loginPassword">
          <el-input
            :show-password="isShowPas"
            placeholder="请输入密码"
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.loginPassword"
          ></el-input>
        </el-form-item>

        <!-- 验证码区域 -->
        <el-form-item style="width: 180px" prop="identifyCode">
          <el-input
            type="text"
            prefix-icon="el-icon-lollipop"
            v-model="loginForm.identifyCode"
            placeholder="请输入验证码"
            style="flex: left"
            class="identify-input"
          ></el-input>
          <div class="login-code" @click="refreshCode">
            <!--验证码组件-->
            <identify :identifyCode="identifyCode"></identify>
          </div>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="login"
            v-loading.fullscreen.lock="fullscreenLoading"
            >登录</el-button
          >
          <el-button type="warning" @click="resetInfo('loginFormRef')"
            >重置</el-button
          >
          <!-- <el-button type="danger" @click="modifyPasswordVisible = true"
            >修改登录密码</el-button
          > -->
        </el-form-item>
      </el-form>
    </div>

    <el-dialog
      title="个人登录密码修改"
      :visible.sync="modifyPasswordVisible"
      :fullscreen="isFull"
      :destroy-on-close="isDitroy"
      :close-on-click-modal="isModal"
      :close-on-press-escape="isCloseEsc"
    >
      <el-form label-width="8vh" class="demo-ruleForm">
        <el-form-item label="学籍号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="确认">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
        <el-button @click="modifyPasswordVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Identify from "./identify";
export default {
  components: { Identify },
  name: "Login",
  data() {
    return {
      isShowPas: true,
      isDitroy: true,
      isCloseEsc: false,
      isModal: false,
      isFull: true,
      modifyPasswordVisible: false,
      identifyCodes: "1234567890",
      identifyCode: "",
      fullscreenLoading: false,
      // 登录表单的数据绑定对象
      loginForm: {
        loginName: "",
        loginPassword: "",
        identifyCode: "", //text框输入的验证码
      },
      //表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        loginName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        loginPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 4,
            max: 15,
            message: "长度在 4 到 15 个字符",
            trigger: "blur",
          },
        ],
        // 验证验证码规则
        identifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "请注意输入的验证码长度，验证码为4位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.refreshCode();
  },
  created() {
    this.refreshCode();
  },
  methods: {
    //验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      // console.log(this.identifyCode);
    },
    // 重置表单信息操作
    resetInfo(loginFormRef) {
      this.$refs[loginFormRef].resetFields();
    },
    // 处理登录请求
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        if (this.identifyCode !== this.loginForm.identifyCode) {
          this.$notify({
            message: "验证码错误，请重新输入",
            type: "error",
          });
          this.loginForm.identifyCode = "";
          this.refreshCode();
          return;
        }
        this.fullscreenLoading = true;
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        if (res.err_code != 200) {
          this.$notify({
            message: "账号或密码有误",
            type: "error",
          });
          this.fullscreenLoading = false;
        }
        if (res.role.roleId == 1) {
          this.fullscreenLoading = false;
          this.$notify({
            title: "亲爱的管理员",
            message: "新版本大学生档案管理系统欢迎您",
            type: "success",
          });
          //1.将登录成功之后的token，保存到客户端的sessionStorage中
          //1.1项目中除了登陆之外的其他API接口，必须在登录之后才能访问
          //1.2token只应当在当前网站打开期间生效，所以将token保存在sessionStorage中
          window.sessionStorage.setItem("token", res.token);
          window.localStorage.setItem("admin_name", res.role.loginName);
          //2.通过编程式导航跳转到后台主页，路由地址是/home
          this.$router.push("/home");
        } else if (res.role.roleId == 0) {
          this.fullscreenLoading = false;
          // this.$message.success(res.role.stuName + "同学你好！欢迎你");
          this.$notify({
            title: "亲爱的" + res.role.stuName,
            message: "欢迎回来",
            type: "success",
          });
          window.sessionStorage.setItem("token", res.token);
          //本地存储用户信息
          window.localStorage.setItem(
            "stu_enrollmentNumber",
            res.role.stuEnrollmentNumber
          );
          window.localStorage.setItem("stu_name", res.role.stuName);
          window.localStorage.setItem("stu_passKey", res.role.stuPassword);
          window.localStorage.setItem("avartar_src", res.role.stuAvatar);
          this.$router.push("/stuhome");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: url(https://z3.ax1x.com/2021/04/28/gihrZj.jpg);
  // background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
}

.login_box {
  width: 350px;
  height: 400px;
  background: linear-gradient(to right, #108dc7, #ef8e38);
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}

.avator_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: space-between;
  // margin-left: 12px;
}
// .identify-input {
//   width: 170px;
//   height: 31px;
//   border: 1px solid #eee;
//   background-color: #eee;
// }
.login-code {
  cursor: pointer;
  margin-left: 185px;
  border-radius: 40%;
  margin-top: -36px;
}
</style>
