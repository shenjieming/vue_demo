/**
 * Created by medlog-dev-2 on 2017/6/27.
 */
const APIURL={
  OMS_API:{
    USER: {
      //登录
      PC_LOGIN: '/login/pcLogin',
      //登出
      LOGOUT: '/login/logout',
      //获取当前用户信息
      CURRENT_USER:  '/user/getCurrentUserInfo',
      //修改当前用户密码
      MODIFY_PASSWORD:  '/user/modifyPassword',
      //用户下拉框
      USER_LIST: '/user/userList',
    },
    ORDER: {
      KANBANLIST:{
        //待处理订单——待出库
        WAIT_DELIVERING:'/kanban/order/waitDelivering',
        //待处理订单-——待返库
        WAIT_RETURN_WARE_HOUSE:'/kanban/order/waitReturnWareHouse',
        //页面滚动--待接单和待报台
        GET_TODAY_ORDER_NOTIFY:'/kanban/order/getTodayOrderNotify'
      },
      LIST:{
        SALES_MY_ORDER_LIST:  '/order/salesMyOrderList',
      },
      DETAIL:{
        //订单详情
        ORDER_DETAIL: '/order/detail/orderDetail',
        //出库单详情
        OUT_BOUND_DETAIL_ORDER:  '/order/detail/outBoundDetailOrder',
        //出库单详情（lot表,待报台从出库清单选择用）
        OUT_BOUND_MATERIAL_DETAIL_FROM_WMS:  '/order/detail/outBoundMaterialFromWMS',
        //出库单详情（根据单号分组,出库单详情显示用）
        OUT_BOUND_MATERIAL_FROM_LOT_WMS: '/order/detail/outBoundMaterialFromLotWMS',
        //反馈单器械消耗信息
        FEED_BACK_DETAIL_ORDER: '/order/detail/feedBackDetailOrder',
        //订单事件跟踪
        ORDER_EVENT_INFO:  '/order/detail/orderEventInfo',
        //获取模糊订单物料详情
        INIT_ORDER_MATERIAL:  '/order/detail/initOrderMaterial',
        //获取精确订单物料详情
        ORDER_MATERIAL:  '/order/detail/orderMaterial',
      },
      BUSINESS_DATA:{
        //经销商代理货主下拉框
        DL_AGENT_OI_LIST: '/businessData/dl/dlAgentOiList',
        //常用医生列表
        OFTEN_DOCTOR_LIST: '/businessData/sales/userOftenUseDoctorList',
      }
    },

  }
}
export default  APIURL

