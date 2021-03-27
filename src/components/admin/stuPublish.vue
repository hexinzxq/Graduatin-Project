<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>大学生档案管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>处分未销学生学籍</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card> 
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input
            :clearable="true"
            placeholder="请输入处分未销的学生名称"
          >
            <el-button
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
            >搜索</el-button
          >
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table border stripe :data="dataSource">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="学籍号" prop="stuEnrollmentNumber" width="180px"></el-table-column>
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
        <el-table-column label="健康状况" width="180px" prop="stuHelth"> </el-table-column>
        <el-table-column label="教育经历" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column>
        <el-table-column label="荣誉信息" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column>
        <el-table-column label="受罚记录" width="180px"><el-link type="primary" icon="el-icon-s-promotion" :underline="false">查看</el-link></el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-link type="primary" :underline="false" icon="el-icon-paperclip">处分预览</el-link> 
        <el-link type="danger" :underline="false" icon="el-icon-close">撤销处分</el-link>
      </template>
    </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      dataSource: [
        {
          stuEnrollmentNumber: "L511826198711230014",
          stuIdentifyNum: "513127198711230567",
          stuName: "张三丰",
          stuPassName: "张秋秋",
          stuGender: "男",
          stuAge: "33",
          stuAddress: "四川省雅安市芦山县太平镇钟灵村123号",
          stuPoliticsStatus: "共青团员",
          stuNativePlace: "四川·芦山",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省雅安市芦山县太平镇钟灵村123号",
          stuPostCode: "657033",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826199906170015",
          stuIdentifyNum: "513227199906179802",
          stuName: "王新立",
          stuPassName: "王二蛋",
          stuGender: "男",
          stuAge: "22",
          stuAddress: "四川省资阳市天明区5幢2单元1号",
          stuPoliticsStatus: "中共党员",
          stuNativePlace: "四川·资阳",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省资阳市天明区5幢2单元1号",
          stuPostCode: "632009",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826199906170016",
          stuIdentifyNum: "513227199906179128",
          stuName: "左琴琴",
          stuPassName: "左华华",
          stuGender: "女",
          stuAge: "22",
          stuAddress: "四川省资阳市天明区5幢2单元1号",
          stuPoliticsStatus: "中共党员",
          stuNativePlace: "四川·资阳",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省资阳市天明区5幢2单元1号",
          stuPostCode: "632009",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826199906170020",
          stuIdentifyNum: "513227200006230872",
          stuName: "杨秋浩",
          stuPassName: "无",
          stuGender: "女",
          stuAge: "20",
          stuAddress: "四川省资阳市天明区5幢2单元1号",
          stuPoliticsStatus: "中共党员",
          stuNativePlace: "四川·资阳",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省资阳市天明区5幢2单元1号",
          stuPostCode: "632009",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826199906170017",
          stuIdentifyNum: "513227199906178201",
          stuName: "司玉华",
          stuPassName: "司马光",
          stuGender: "男",
          stuAge: "22",
          stuAddress: "四川省资阳市天明区5幢2单元1号",
          stuPoliticsStatus: "中共党员",
          stuNativePlace: "四川·资阳",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省资阳市天明区5幢2单元1号",
          stuPostCode: "632009",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826198711230014",
          stuIdentifyNum: "513127198711230567",
          stuName: "张三",
          stuPassName: "张全蛋",
          stuGender: "男",
          stuAge: "33",
          stuAddress: "四川省雅安市芦山县太平镇钟灵村123号",
          stuPoliticsStatus: "共青团员",
          stuNativePlace: "四川·芦山",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省雅安市芦山县太平镇钟灵村123号",
          stuPostCode: "657033",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826199906170015",
          stuIdentifyNum: "513227199906179802",
          stuName: "王继亚",
          stuPassName: "无",
          stuGender: "男",
          stuAge: "22",
          stuAddress: "四川省资阳市天明区5幢2单元1号",
          stuPoliticsStatus: "中共党员",
          stuNativePlace: "四川·资阳",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省资阳市天明区5幢2单元1号",
          stuPostCode: "632009",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826199906170016",
          stuIdentifyNum: "513227199906179128",
          stuName: "李立媛",
          stuPassName: "李元丹",
          stuGender: "女",
          stuAge: "22",
          stuAddress: "四川省资阳市天明区5幢2单元1号",
          stuPoliticsStatus: "中共党员",
          stuNativePlace: "四川·资阳",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省资阳市天明区5幢2单元1号",
          stuPostCode: "632009",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826199906170020",
          stuIdentifyNum: "513227200006230872",
          stuName: "秦思欣",
          stuPassName: "无",
          stuGender: "女",
          stuAge: "20",
          stuAddress: "四川省资阳市天明区5幢2单元1号",
          stuPoliticsStatus: "中共党员",
          stuNativePlace: "四川·资阳",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省资阳市天明区5幢2单元1号",
          stuPostCode: "632009",
          stuHelth: "健康",
        },
        {
          stuEnrollmentNumber: "L511826199906170017",
          stuIdentifyNum: "513227199906178201",
          stuName: "司马求凤",
          stuPassName: "司马光",
          stuGender: "男",
          stuAge: "22",
          stuAddress: "四川省资阳市天明区5幢2单元1号",
          stuPoliticsStatus: "中共党员",
          stuNativePlace: "四川·资阳",
          stuNation: "汉族",
          stuPhoneNumber: "17370345620",
          stuHomeAddress: "四川省资阳市天明区5幢2单元1号",
          stuPostCode: "632009",
          stuHelth: "健康",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>
