import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import adminHome from '../components/admin/adminHome.vue'
import StuHome from '../components/student/stuHome.vue'
import StuPrintExcel from '../components/student/stuPrintExcel.vue'
import StuPersonalInfo from '../components/student/stuPersonalInfo.vue'
import Welcome from '../components/welcome/Welcom.vue'
import StuInfo from '../components/admin/stuInfo.vue'
import AddStuInfo from '../components/admin/addStuInfo.vue'
import StuPubish from '../components/admin/stuPublish.vue'
import StuWelcome from '../components/welcome/StuWelcome.vue'
import StuHonor from '../components/admin/stuHonor.vue'
import StuHornor from '../components/student/stuHornor.vue'
import StuPunish from '../components/student/stuPunish.vue';
import addHonorInfo from '../components/admin/addHonorInfo.vue'
import addPunishInfo from '../components/admin/addPunishInfo.vue'
import viewStuAchieve from '../components/admin/viewStuAchieve.vue'
import printStuAchieve from '../components/admin/printStuAchieve.vue'
import StuErrReportInfo from '../components/student/stuErrReportInfo.vue'
import StuErrReportDeal from '../components/admin/stuErrReportsDeal.vue'
import PasswordService from '../components/student/passwordService.vue'
import MyMaterials from '../components/student/stuMaterials.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: adminHome,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/stuInfo',
        component: StuInfo
      },
      {
        path: '/addStuInfo',
        component: AddStuInfo
      },
      {
        path: '/stuPublish',
        component: StuPubish
      },
      {
        path: '/stuHonor',
        component: StuHonor
      },
      {
        path: '/addStuHonor',
        component: addHonorInfo
      },
      {
        path: '/addStuPunish',
        component: addPunishInfo
      },
      {
        path: '/stuAchievementOpration',
        component: viewStuAchieve
      },
      {
        path: '/stuAchievement/print',
        component: printStuAchieve
      },
      {
        path: '/stuErrReportsDeal',
        component: StuErrReportDeal
      }
    ]
  },
  {
    path: '/stuhome',
    component: StuHome,
    redirect: '/stuWelcome',
    children: [{
        path: '/stuWelcome',
        component: StuWelcome
      },
      {
        path: '/stuPersonalInfo',
        component: StuPersonalInfo
      },
      {
        path: '/stuPrintExcel',
        component: StuPrintExcel
      },
      {
        path: '/stuPersonalHonor',
        component: StuHornor
      },
      {
        path: '/stuPersonalPublish',
        component: StuPunish
      },
      {
        path: '/stuPersonalReport',
        component: StuErrReportInfo
      },
      {
        path: '/passwordService',
        component: PasswordService
      },
      {
        path: '/stuMaterials',
        component: MyMaterials,
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: "hash"
})

// 挂载路由导航守卫(用作访问权限)
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从那个路径跳转1而来
  // next 是一个函数，表示放行
  //    ------next() 放行   next('/login')  强制跳转

  if (to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login');
  next();
})

export default router