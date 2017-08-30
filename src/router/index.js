/**
 * Created by medlog-dev-2 on 2017/6/21.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//   http  请求需要引入axios
/*引入登录页组件*/
import login from '@/views/login'
/*引入主题框架组件*/
import dashboard from '@/components/dashboard'
/*引入dashboard_home*/
import home from '@/views/home'
/*引入myOrderList*/
import dashboard_myOrderList from '@/views/demo/myOrderList'
/*引入myorderDetail*/
import dashboard_orderSignList from '@/views/demo/orderSignList'
/*引入订单详情*/
import dashboard_myOrderList_detail from '@/views/demo/child/detailOrder'
/*引入下单页面*/
import dashboard_myOrderList_create from  '@/views/demo/child/createOrder'
/*引入订单列表*/
import dashboard_orderList from '@/views/orderList/orderList'
/*引入订单图表*/
import dashboard_orderChart from '@/views/orderChart/orderChart_pie'


let router = new VueRouter({
  mode: 'hash',           /*防止服务端加载获取不到路劲*/
  routes: [
    {
      path: '*',
      redirect: (to) => {
        // if(noCookies){   //如果沒有cookie自动跳转login
        //   return '/login'
        // }else {
        //   return '/dashboard'
        // }
        return '/login'
      }
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/dashboard',
      component: dashboard,
    },
    {
      path: '/dashboard/home',
      component: dashboard,
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard/home', component: home, name: '首页', menuShow: true},
      ]
    },
    {
      path: '/dashboard',
      name: '手术订单',
      component: dashboard,
      redirect: '/dashboard',
      // leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/myorderlist', component: dashboard_myOrderList, name: '我的订单', menuShow: true},
        {path: '/orderSignList', component: dashboard_orderSignList, name: '待签收', menuShow: true},
        {path:'/myorderlist/orderDetail',component:dashboard_myOrderList_detail},
        {path:'/myorderlist/createOrder',component:dashboard_myOrderList_create},
      ]
    },
    /*   {
      // operOrderList
      path: '/dashboard/orderList',
      component: dashboard,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard_orderList', component: dashboard_orderList, name: '订单监控', menuShow: true},
      ]
    },
    {
      // chart
      path: '/dashboard/home',
      component: dashboard,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard_orderChart', component: dashboard_orderChart, name: '订单概览', menuShow: true},
      ]
    },*/
  ]
});
/*用来存用户cookies*/
router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    //删除用户cookies
    next()
  } else {
    // let user = JSON.parse(window.cookise.getItem('token'))
    // console.log(user)
    // if (!user) {
    //   next({path: '/login'})
    // } else {
    //   next()
    // }
    next()
  }
});
export default router;


