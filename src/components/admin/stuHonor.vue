<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>获奖学生学籍信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card> 
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 查询区域 -->
          <el-input
            :clearable="true"
            v-model="stuName"
            placeholder="请输入学生名称"
          >
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="searchPublishInfo()"
            >搜索</el-button
          >
          <el-button type="info" @click="reset()"
            >重置</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table border stripe :data="dataSource" v-loading="loading">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="学籍号" prop="stuEnrollmentNumber" width="200px"></el-table-column>
        <el-table-column label="身份证号" prop="stuIdentifyNum" width="180px"></el-table-column>
        <el-table-column label="姓名" prop="stuName" width="180px"></el-table-column>
        <el-table-column label="曾用名" prop="stuPassName" width="180px"></el-table-column>
        <el-table-column label="性别" width="180px" prop="stuGender"> </el-table-column>
        <el-table-column label="年龄" width="180px" prop="stuAge"> </el-table-column>
        <el-table-column label="户籍所在地" width="180px" prop="stuAddress"> </el-table-column>
        <el-table-column label="政治面貌" width="180px" prop="stuPoliticsStatus" </el-table-column>
        <el-table-column label="籍贯" width="180px" prop="stuNativePlace"> </el-table-column>
        <el-table-column label="民族" width="180px" prop="stuNation" </el-table-column>
        <el-table-column label="联系电话" width="180px" prop="stuPhoneNumber"> </el-table-column>
        <el-table-column label="家庭住址" width="180px" prop="stuHomeAddress"> </el-table-column>
        <el-table-column label="邮政编码" width="180px" prop="stuPostCode"> </el-table-column>
        <el-table-column label="健康状况" width="180px" prop="stuHealth"> </el-table-column>
        <!-- <el-table-column label="教育经历" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column>
        <el-table-column label="荣誉信息" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column>
        <el-table-column label="受罚记录" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column> -->
        <el-table-column
      fixed="right"
      label="操作"
      width="130">
      <template slot-scope="scope">
        <el-link type="primary" :underline="false" icon="el-icon-paperclip" @click="viewHonor(scope.row)" v-loading.fullscreen.lock="fullscreenLoading">获奖信息预览</el-link> 
      </template>
    </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        :page-sizes ="[3,5,10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="queryPageInfo.pagenum"
        :page-size="queryPageInfo.pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>

    <!-- 处分信息预览对话框 -->
    <el-dialog 
      @close="viewDialogClosed"
      title="获奖信息预览"
      :visible.sync="viewDialogVisible"
      width="60%"
      >
       <el-table
       border stripe
      :data="viewTableData"
      style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        prop="honorTime"
        label="获奖时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="honorName"
        label="获奖名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="honorType"
        label="获奖类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="honorDesc"
        label="奖励描述">
      </el-table-column>
    </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "StuPublish",
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      viewTableData: [],
      viewDialogVisible: false,
      // 根据学生姓名查询的参数
      stuName: "",
      total: 0,
      // 分页查询参数
      queryPageInfo: {
        pagenum: 1,
        pagesize: 5,
      },
      dataSource: [],
    };
  },
  mounted() {
    this.getHonorStudentsInfo();
    this.$emit("getHonorStudentsInfo", this.getHonorStudentsInfo);
  },
  methods: {
    // 处理预览学生受罚信息
    async viewHonor(row) {
      this.fullscreenLoading = true
    //   console.log(row.stuEnrollmentNumber);
      const { data: res } = await this.$http.get(
        "/graduate-project-punish/viewHonor?stuEnrollmentNumber=" +
          row.stuEnrollmentNumber
      );
      if (res.status !== 200) {
        this.$message.warning(res.message);
      } else if (res.status === 200) {
        // console.log(res.result);
        this.viewTableData = res.result;
        this.$message.success(res.message);
        this.viewDialogVisible = true;
        this.fullscreenLoading = false
      }
    },
    viewDialogClosed() {
      this.viewDialogVisible = false;
    },
    reset() {
      this.loading = true
      this.stuName = ""
      this.getHonorStudentsInfo()
      this.loading = false
    },
    // 处理搜索相关学生信息
    async searchPublishInfo() {
      this.loading = true
      const {
        data: res,
      } = await this.$http.post(
        "/graduate-project/searchStuInfoHavePublishByName",
        { stuName: this.stuName.trim() }
      );
      if (res.status !== 200) {
        this.$message.error("查询出错！");
      }
      // console.log(res);
      this.dataSource = res.result;
      this.total = res.total
      this.loading = false
    },
    // 处理查询信息条数改变时列表的展示
    handleSizeChange(newSize) {
      this.loading = true
      this.queryPageInfo.pagesize = newSize;
      this.getPulishStudentsInfo();
      this.loading = false
    },
    handleCurrentChange(newPage) {
      this.loading = true
      this.queryPageInfo.pagenum = newPage;
      this.getPulishStudentsInfo();
      this.loading = false
    },
    // 处理销毁学生处分
    async cancelPublish(row) {
      // console.log(row);
      const confirmResult = await this.$confirm(
        "确定要为该学生销毁所有的惩罚数据吗?",
        "提示",
        {
          confirmButtonText: "确定销毁",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      }
      const { data: res } = await this.$http.get(
        "/graduate-project/cancelStuPublish?stuEnrollmentNumber=" +
          row.stuEnrollmentNumber
      );
      if (res.status !== 200) {
        this.$message.error("销罚失败");
      }
      // this.$message.success(res.message);
      // 处理销毁存在处罚的对应学籍信息的处罚
      console.log(row);
      this.deletePunish(row)
      this.getPulishStudentsInfo();
    },
    async deletePunish(row) {
     const {data: res} = await this.$http.delete('/graduate-project-punish/deletePunish?stuEnrollmentNumber='+ row.stuEnrollmentNumber)
     if (res.status !== 200) {
        this.$message.error("惩罚信息删除失败");
      }
      this.$message.success(res.message)
    },
    // 获取所有的含有惩罚的学生
    async getHonorStudentsInfo() {
      this.loading = true
      const {
        data: res,
      } = await this.$http.get(
        "/graduate-project/getStuInfoHaveHonor?stuHonor=" + 1,
        { params: this.queryPageInfo }
      );
      if (res.status === 200) {
        // console.log(res.result);
        this.dataSource = res.result;
        this.dataSource.forEach((value, key) => {
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
        this.loading = false
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
