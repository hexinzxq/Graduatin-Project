<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/stuHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>趣味中心</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="密码更改" name="first">
          <el-form
            ref="modifyPasRefs"
            label-width="80px"
            :rules="modifyPasRules"
            :model="modifyPasModel"
          >
            <el-form-item label="学籍号" prop="identifyNum">
              <el-input
                type="text"
                v-model="modifyPasModel.identifyNum"
              ></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="pastPassword">
              <el-input
                type="password"
                :show-password="isShowPas"
                v-model="modifyPasModel.pastPassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input
                :show-password="isShowPas"
                type="password"
                v-model="modifyPasModel.newPassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                :show-password="isShowPas"
                type="password"
                v-model="modifyPasModel.confirmPassword"
              ></el-input>
            </el-form-item>
            <div class="btns">
              <el-button type="primary" @click="handleModifyPas()"
                >确认修改</el-button
              >
              <el-button type="warning" @click="resetInfo('modifyPasRefs')"
                >重置信息</el-button
              >
            </div>
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="校园活动" name="second">校园活动</el-tab-pane> -->
        <el-tab-pane label="日历查看" name="third">
          <el-calendar v-model="value"> </el-calendar>
        </el-tab-pane>
        <!-- <el-tab-pane label="校园风光" name="fourth">校园风光</el-tab-pane> -->
        <el-tab-pane label="学习资料" name="fifth">
          <h1>所有资料均来自哔哩哔哩最热门教程资源......</h1>
          <el-collapse accordion>
            <el-collapse-item title="前端从入门到精通" name="1">
              前端学习路线图【2021版】2021年度全网最全Web前端学习路线：<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/read/cv5650633?spm_id_from=333.788.b_636f6d6d656e74.5</el-link
              ><br />
              前端核心--扎好马步:<br />
              HTML+CSS:李立超HTML与CSS前端入门佳作，百万播放，好评如潮！<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1sW411T78k?spm_id_from=333.788.b_636f6d6d656e74.6</el-link
              ><br />
              HTML5+CSS3(超哥新版):尚硅谷Web前端HTML5+CSS3初学者零基础入门全套完整版<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1XJ411X7Ud?spm_id_from=333.788.b_636f6d6d656e74.4</el-link
              ><br />
              JS核心:尚硅谷最新版JavaScript基础全套教程完整版(140集实战教学,JS从入门到精通)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1YW411T7GX?spm_id_from=333.788.b_636f6d6d656e74.8</el-link
              ><br />
              JS高级:尚硅谷JavaScript高级教程(javascript实战进阶)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV14s411E7qf?spm_id_from=333.788.b_636f6d6d656e74.9</el-link
              ><br />
              jQuery:尚硅谷jQuery教程(jquery从入门到精通)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1ts411E7ag?spm_id_from=333.788.b_636f6d6d656e74.10</el-link
              ><br />
              Bootstrap:尚硅谷Bootstrap教程(bootstrap框架讲解)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1YW411T7yy?spm_id_from=333.788.b_636f6d6d656e74.11</el-link
              ><br />
              AJAX:尚硅谷Web前端Ajax教程初学者零基础入门到精通全套完整版（ajax最新版）<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1WC4y1b78y?spm_id_from=333.788.b_636f6d6d656e74.12</el-link
              ><br />
              必备技术--修炼内功:<br />
              ES6-ES11:尚硅谷Web前端ES6教程，涵盖ES6-ES11<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1uK411H7on?spm_id_from=333.788.b_636f6d6d656e74.13</el-link
              ><br />
              AngularJS:尚硅谷AngularJS实战教程(angular.js框架精讲)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1ts411E7qg?spm_id_from=333.788.b_636f6d6d656e74.14</el-link
              ><br />
              Node.js:【尚硅谷】最经典Node.JS全套完整版教程(快速入门nodejs)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1bs411E7pD?spm_id_from=333.788.b_636f6d6d656e74.15</el-link
              ><br />
              Zepto.js:尚硅谷Zepto教程(zepto.js框架精讲)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV18s411E7b4?spm_id_from=333.788.b_636f6d6d656e74.16</el-link
              ><br />
              MongoDB:尚硅谷MongoDB基础教程(数据库精讲)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV18s411E78K?spm_id_from=333.788.b_636f6d6d656e74.17</el-link
              ><br />
              Webpack:尚硅谷最新版Webpack5实战教程(从入门到精通)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1e7411j7T5?spm_id_from=333.788.b_636f6d6d656e74.18</el-link
              ><br />
              Git:尚硅谷Git教程全套完整版（12h深入掌握git）<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV15J411973T?spm_id_from=333.788.b_636f6d6d656e74.19</el-link
              ><br />
              前沿框架--习得绝学:<br />
              TypeScript:尚硅谷2021版TypeScript教程（李立超老师TS新课）<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1Xy4y1v7S2?spm_id_from=333.788.b_636f6d6d656e74.20</el-link
              ><br />
              React:尚硅谷2021版React技术全家桶全套完整版（零基础入门到精通/男神天禹老师亲授）<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1wy4y1D7JT?spm_id_from=333.788.b_636f6d6d656e74.21</el-link
              ><br />
              Vue:尚硅谷Vue核心技术实战教程全套完整版(vue.js初学者快速入门到精通)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1Wp411d7Ur?spm_id_from=333.788.b_636f6d6d656e74.22</el-link
              ><br />
              Vue3新特性:尚硅谷2021最新Vue.JS教程快速入门到项目实战（Vue3/VueJS技术详解）<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1ra4y1H7ih?spm_id_from=333.788.b_636f6d6d656e74.23</el-link
              ><br />
              Promise:尚硅谷Web前端Promise教程从入门到精通（2021抢先版）<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1GA411x7z1?spm_id_from=333.788.b_636f6d6d656e74.24</el-link
              ><br />
              axios:尚硅谷2021最新版axios入门与源码解析 <br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1wr4y1K7tq?spm_id_from=333.788.b_636f6d6d656e74.25</el-link
              ><br />
              项目实战--身经百战<br />
              Vue硅谷外卖:尚硅谷Vue实战教程(企业级vue项目，Vue项目硅谷外卖)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1Lp411d7w4?spm_id_from=333.788.b_636f6d6d656e74.26</el-link
              ><br />
              React谷粒后台:尚硅谷React项目教程(react实战全栈谷粒后台)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1i4411N7Qc?spm_id_from=333.788.b_636f6d6d656e74.27</el-link
              ><br />
              硅谷直聘:尚硅谷React项目实战，全栈开发Web前端项目《硅谷直聘》<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1ms411E72A?spm_id_from=333.788.b_636f6d6d656e74.28</el-link
              ><br />
              谷粒音乐:尚硅谷前端项目教程_HTML5项目实战《谷粒音乐》<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1hs411E7NC?spm_id_from=333.788.b_636f6d6d656e74.29</el-link
              ><br />
              微信小程序:尚硅谷小程序开发，微信小程序开发<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1jW411R7Xz?spm_id_from=333.788.b_636f6d6d656e74.30</el-link
              ><br />
              公众号开发:尚硅谷2021版微信小程序开发（零基础小程序开发入门到精通）<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV12K411A7A2?spm_id_from=333.788.b_636f6d6d656e74.31</el-link
              ><br />
              前端面试题:尚硅谷经典前端面试题精讲第一季(web前端大咖总结)<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1nb411P7tQ?spm_id_from=333.788.b_636f6d6d656e74.32</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="JAVA从入门到精通" name="2">
              Java -Java 学习- Java 基础到高级-宋红康-零基础自学Java-尚硅谷》<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1Qb411g7cz?from=search&seid=9591958407258890076</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="Python从入门到精通" name="3">
              [小甲鱼]零基础入门学习Python<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1xs411Q799?from=search&seid=5258631508155485925</el-link
              >
              <br />
              黑马程序员Python教程_600集Python从入门到精通教程（懂中文就能学会）<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1ex411x7Em?from=search&seid=5258631508155485925</el-link
              ><br />
              花了2万多买的Python教程全套，现在分享给大家，入门到精通<br />
              链接:<el-link type="primary"
                >https://www.bilibili.com/video/BV1wD4y1o7AS?from=search&seid=5258631508155485925</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="PhotoShop学习" name="4">
              [Photoshop 教程]史上最容易听懂的PS入门基础教程<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1Xs411q7DW?from=search&seid=2056883324442234534</el-link
              ><br />
              <!-- 链接：<el-link type="primary">11</el-link><br /> -->
              PS2019从入门到精通（从安装到卸载）全套<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1A4411M729?from=search&seid=2056883324442234534</el-link
              ><br />
              敬伟PS教程全集<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1YW411e7n5?from=search&seid=2056883324442234534</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="PR学习" name="5">
              [Pr教程]0基础急速上手视频制作！UP主必备<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1Ts411C7Yd?from=search&seid=3266254093276719517</el-link
              ><br />
              <!-- 链接：<el-link type="primary">11</el-link><br /> -->
              Pr教程全57集<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1bb411F7Sh?from=search&seid=3266254093276719517</el-link
              ><br />
              [PR]Premiere Pro CC 全套入门教程<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1ut411S7j7?from=search&seid=3266254093276719517</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="人工智能学习" name="6">
              千锋Python全套视频教程（700集）<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1R7411F7JV?from=search&seid=18362337544692160194</el-link
              ><br />
              求知讲堂2020python+人工智能 99天完整版 学完可就业<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1vA411b7Rn?from=search&seid=18362337544692160194</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="大数据学习" name="7">
              <!-- 链接：<el-link type="primary">11</el-link><br /> -->
              尚学堂2021版大数据就业班全套视频，直达年薪50万—建议三联<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1uo4y197sf?from=search&seid=12128703778115530387</el-link
              ><br />
              [黑马程序员广州中心]2020最新零基础学大数据，从入门到精通<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1NK411W7Gz?from=search&seid=12128703778115530387</el-link
              ><br />
              大数据从入门到精通 完整版共1000节<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV135411P7Ea?from=search&seid=12128703778115530387</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="区块链研究" name="8">
              <!-- 链接：<el-link type="primary">11</el-link><br /> -->
              北京大学肖臻老师《区块链技术与应用》公开课<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1Vt411X7JF?from=search&seid=1795577675693131662</el-link
              ><br />
              尚硅谷最新区块链全套教程完整版(深入掌握以太坊核心技术)<br />
              链接：<el-link type="primary"
                >https://www.bilibili.com/video/BV1NJ411D7rf?from=search&seid=1795577675693131662</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="一些有趣的技术网站" name="9">
              <!-- 链接：<el-link type="primary">11</el-link><br /> -->
              一个好看的渐变色网站推荐<br />
              链接：<el-link type="primary"
                >https://uigradients.com/#Autumn</el-link
              ><br />
              W3CSchool教程网站<br />
              链接：<el-link type="primary"
                >http://www.sz-seo.org/w3cschool/</el-link
              ><br />
              菜鸟教程网站<br />
              链接：<el-link type="primary">https://www.runoob.com/</el-link
              ><br />
              一个好看且可以高清下载图片壁纸的网站<br />
              链接：<el-link type="primary"
                >https://wall.alphacoders.com/</el-link
              ><br />
            </el-collapse-item>
            <el-collapse-item title="放松娱乐一小会儿" name="10">
              <h2>学习是一件快乐的事，不过休息也很重要哟！加油</h2>
              <h2>学习资料逐步更新中......</h2>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isShowPas: true,
      value: new Date(),
      activeName: "first",
      modifyPasRules: {
        pastPassword: [
          { required: true, message: "请输入您的身份证号码", trigger: "blur" },
          {
            min: 6,
            message: "至少6位",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "请输入您的新密码", trigger: "blur" },
          {
            min: 6,
            message: "至少6位",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入您的新密码", trigger: "blur" },
          {
            min: 6,
            message: "至少6位",
            trigger: "blur",
          },
        ],
        identifyNum: [
          { required: true, message: "请输入您的学籍号", trigger: "blur" },
          {
            min: 20,
            max: 20,
            message: "学籍号为20位",
            trigger: "blur",
          },
        ],
      },
      modifyPasModel: {
        identifyNum: "",
        pastPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    // 重置表单信息操作
    resetInfo(modifyPasRefs) {
      this.$refs[modifyPasRefs].resetFields();
    },
    // 处理修改密码
    handleModifyPas() {
      this.$refs.modifyPasRefs.validate(async (valid) => {
        if (!valid) return;
        console.log(localStorage.getItem("stu_passKey"));
        if (
          this.modifyPasModel.identifyNum !==
          localStorage.getItem("stu_enrollmentNumber")
        ) {
          this.$message.error("您的学籍号有误，请检查");
          return;
        }
        if (
          this.modifyPasModel.pastPassword !==
          localStorage.getItem("stu_passKey")
        ) {
          this.$message.error("您的原密码有误，请检查");
          return;
        }
        if (
          this.modifyPasModel.newPassword !==
          this.modifyPasModel.confirmPassword
        ) {
          this.$message.error("两次输入的密码不一致，请检查");
          return;
        }
        const confirmResult = await this.$confirm("确认修改密码吗？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).catch((err) => err);
        if (confirmResult !== "confirm") {
          return this.$message.info("已取消");
        }
        const { data: res } = await this.$http.post(
          "/graduate-project/modifyPassword",
          {
            stuEnrollmentNumber: localStorage.getItem("stu_enrollmentNumber"),
            stuNewPassword: this.modifyPasModel.confirmPassword,
          }
        );
        if (res.status !== 200) {
          this.$messagr.error(res.message);
        }
        this.$message.success(res.message);
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.btns {
  float: right;
}
</style>
