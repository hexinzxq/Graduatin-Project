<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avator_box">
        <img src="../assets/logo.png" alt="" />
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
        <el-form-item prop="loginName">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.loginName"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="loginPassword">
          <el-input
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.loginPassword"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="restLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        loginName: "",
        loginPassword: "",
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
      },
    };
  },
  methods: {
    //重置表单的方法
    restLoginForm() {
      this.loginForm.loginName = "";
      this.loginForm.loginPassword = "";
    },
    // 处理登录请求
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        // console.log(res);
        if (res.err_code != 200) return this.$message.error('账号或密码错误')
        if (res.role.roleId == 1) {
          this.$message.success("管理员登陆成功 ");         
        } else if (res.role.roleId == 0) {
          this.$message.success("学生登陆成功");
        }
        //1.将登录成功之后的token，保存到客户端的sessionStorage中
        //1.1项目中除了登陆之外的其他API接口，必须在登录之后才能访问
        //1.2token只应当在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem("token", res.message);
        //2.通过编程式导航跳转到后台主页，路由地址是/home
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-image: url('../assets/bacgroundimg.png');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 100vh;
}

.login_box { 
  width: 450px;
  height: 300px;
  background-color: grey;
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
  justify-content: flex-end;
}
</style>
