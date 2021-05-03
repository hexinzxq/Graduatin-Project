<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>学生学籍信息查询</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <!-- 搜索区域 -->
          <el-input
            :clearable="true"
            v-model="queryInfo.stuEnrollmentNumber"
            placeholder="请输入学生学籍号"
          >
          </el-input>
        </el-col>
        <el-col :span="5">
          <!-- 搜索区域 -->
          <el-input
            :clearable="true"
            v-model="queryInfo.stuName"
            placeholder="请输入学生姓名"
          >
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchStuInfo()"
            >搜索</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-refresh-right"
            @click="resetFileds()"
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
            <el-button type="success" icon="el-icon-upload2"
              >批量导入</el-button
            >
          </el-upload>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table border stripe :data="dataSource" v-loading="isLoading">
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
        <!-- <el-table-column label="教育经历" width="180px"
          ><el-link type="primary" icon="el-icon-s-promotion" :underline="false"
            >查看</el-link
          ></el-table-column
        >
        <el-table-column label="荣誉信息" width="180px"
          ><el-link type="primary" icon="el-icon-s-promotion" :underline="false"
            >查看</el-link
          ></el-table-column
        >
        <el-table-column label="受罚记录" width="180px"
          ><el-link type="primary" icon="el-icon-s-promotion" :underline="false" @click="handleViewPunish(scope.row)"
            >查看</el-link
          ></el-table-column
        > -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-link
              type="primary"
              :underline="false"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              >编辑</el-link
            > -->
            <el-link
              type="danger"
              :underline="false"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="queryPageInfo.pagenum"
        :page-size="queryPageInfo.pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>

      <!-- <img :src="AvartarData.src1" alt="" id="avartar"> -->
    </el-card>
    <!-- 编辑学籍信息对话框 -->
    <el-dialog
      @close="editDialogClosed"
      title="学籍信息编辑"
      :visible.sync="editDialogVisible"
      width="60%"
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
        <el-button type="primary" @click="editInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "../../../node_modules/xlsx/xlsx";
export default {
  name: "Welcome",
  data() {
    return {
      AvartarData: {
        src1: "https://z3.ax1x.com/2021/05/01/gVXtxS.jpg",
      },
      // 编辑对话框的可见性属性
      editDialogVisible: false,

      // 编辑学籍信息的数据
      editForm: {},

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
      total: 0,
      // 分页查询参数
      queryPageInfo: {
        pagenum: 1,
        pagesize: 5,
      },
      // 查询参数
      queryInfo: {
        stuName: "",
        stuEnrollmentNumber: "",
      },
      isLoading: false,
      dataSource: [],
      url: {
        stuInfoUrl: "/graduate-project/stuInfo",
        searchStuInfoByNameUrl: "/graduate-project/searchStuInfoByName",
        searchStuInfoByEnrollmentNumber:
          "/graduate-project/searchStuInfoByEnrollmentNumber",
        searchStuInfo: "/graduate-project/searchStuInfo",
      },
      // 存放要上传的表格数据
      excelData: [],
    };
  },
  mounted() {
    this.getStuInfoList();
    // this.$emit("getStuInfoList", this.getStuInfoList());
  },
  methods: {
    // 上传学生学籍信息
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
          message: "请上传学生学籍表文件(Excel文件)",
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
          that.isLoading = true;
          that.$http
            .post("/graduate-project/importStuInfo", that.excelData)
            .then((res) => {
              if (res.data.success) {
                that.$refs.upload.clearFiles();
                that.$message.success("导入学籍信息成功");
                that.getStuInfoList();
                that.isLoading = false;
              } else {
                that.$refs.upload.clearFiles();
                that.$message.error("导入失败");
              }
            })
            .catch(() => {
              that.$refs.upload.clearFiles();
              that.$notify.error({
                title: "出错",
                message: "学籍表中有学生已经在籍，请检查",
              });
              that.isLoading = false
            });
        });
      };
    },
    // 监听编辑对话框关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },

    // 处理提交编辑结果更新学籍信息列表
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
        this.editForm.stuHonor = Number(0);
      } else {
        this.editForm.stuHonor = Number(1);
      }
      if (this.editForm.stuPunishment === "") {
        this.editForm.stuPunishment = Number(0);
      } else {
        this.editForm.stuPunishment = Number(1);
      }
      // console.log(this.editForm);
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        const confirmResult = await this.$confirm(
          "请再次确认编辑信息是否正确且完整?",
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
        const { data: res } = await this.$http.post(
          "/graduate-project/editStuInfo",
          this.editForm
        );
        if (res.status !== 200) {
          this.$message.error("编辑失败");
        }
        // console.log(res.result);
        this.$message.success(res.message);
        this.editDialogVisible = false;
        this.getStuInfoList();
      });
    },
    // 处理编辑学生对话框和编辑数据发送
    handleEdit(row) {
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
        row.stuHonor = Number(0);
      } else {
        row.stuHonor = Number(1);
      }
      if (row.stuPunishment === "") {
        row.stuPunishment = Number(0);
      } else {
        row.stuPunishment = Number(1);
      }
      this.editForm = row;
      // console.log(this.editForm);
    },
    // 处理查询信息条数改变时列表的展示
    handleSizeChange(newSize) {
      this.queryPageInfo.pagesize = newSize;
      this.getStuInfoList();
    },
    handleCurrentChange(newPage) {
      this.queryPageInfo.pagenum = newPage;
      this.getStuInfoList();
    },
    // 重置表单信息
    resetFileds() {
      this.isLoading = true;
      this.queryInfo.stuName = "";
      this.queryInfo.stuEnrollmentNumber = "";
      this.getStuInfoList();
      this.isLoading = false;
    },
    // 搜索学生学籍信息
    async searchStuInfo() {
      this.isLoading = true;
      const { data: res } = await this.$http.post(
        this.url.searchStuInfo,
        this.queryInfo
      );
      if (res.status === 200) {
        // console.log(res);
        this.dataSource = res.result;
        this.total = res.total;
        this.$message.success(res.message);
        this.isLoading = false;
      }
    },
    // 获取整个的学生学籍列表信息
    async getStuInfoList() {
      this.isLoading = true;
      const { data: res } = await this.$http.get(this.url.stuInfoUrl, {
        params: this.queryPageInfo,
      });
      // console.log(res);
      if (res.status === 200) {
        this.dataSource = res.result;
        // this.$message.success(res.message);
        this.total = res.total;
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
        // console.log(res.result[0].stuAvatar);
        // this.AvartarData.src1 = res.result[0].stuAvatar
        this.isLoading = false;
        // console.log(this.dataSource);
        // this.dataSource = res.result;
      } else if (res.status === 500) {
        this.$message.error("学籍信息获取失败");
      }
    },
    // 处理删除学生学籍
    async handleDelete(row) {
      // this.isLoading = true;
      //询问用户是否删除数据(点击确定返回值为字符串confirm，取消为cancel字符串)
      const confirmResult = await this.$confirm(
        "此操作将永久删除该条学生学籍, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      } else {
        const confirmResult = await this.$confirm(
          "此操作不可逆，所产生的后果由您承担！！请再次确认您是否要执行?",
          "提示",
          {
            confirmButtonText: "确定删除",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).catch((err) => err);
        if (confirmResult !== "confirm") {
          return this.$message.info("已取消删除");
        }
        this.isLoading = true;
        const { data: res } = await this.$http.delete(
          "/graduate-project/deleteStuInfo?stuEnrollmentNumber=" +
            row.stuEnrollmentNumber
        );
        if (res.status !== 200) {
          return this.$message.error("删除学生学籍操作失败");
        }
        this.$message.success("删除该条学生学籍成功");
        this.getStuInfoList();
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
body {
  margin: 0;
}
#avartar {
  height: 200px;
  width: 200px;
  background-color: blue;
}
</style>
