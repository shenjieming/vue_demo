<template>
  <div  >
    <el-breadcrumb separator="/"  style="padding: 5px; font-size: 16px;">
      <el-breadcrumb-item :to="{ path: 'myorderlist' }">手术订单</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      <span style="float: right">
        <el-button type="primary" size="small" @click="$router.back(-1)">上一页</el-button>
      </span>
    </el-breadcrumb>

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 原始订单</span>
        <initOrder  :order-detail='bindData.orderDetail'></initOrder>
      </el-tab-pane>
      <el-tab-pane label="精确订单">
        精确订单
      </el-tab-pane>
      <el-tab-pane label="出库单">
        出库单
      </el-tab-pane>
      <el-tab-pane label="反馈单">
        反馈单
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import apiCfg from '@/api/apiCfg'
  import API_URL from  '@/api/apiurl'
  const api = new apiCfg();
  import  initOrder from  '@/views/demo/solt/initOrderDetail'
  export default {
    data() {
      return {
        bindData:{
          orderDetail:{
            ownerManagement:new Object(),
            pictureList:[],
          },
          inInProdLn:new Array(),
          accProdLn:new Array(),
          outBoundDetail:new Object(),
          feedbackOrderDetail:new Object()
        }
      }
    },
    methods: {},
    mounted() {
      const  that =this;
      api.post(API_URL.OMS_API.ORDER.DETAIL.ORDER_DETAIL,this.$route.query, function (response) {
        that.bindData.orderDetail=response;
        that.bindData.orderDetail.pictureList=new Array();
        for(let value of response.eventInfo){
          if(value.eventCode=="0001_0011"){
            for(let pictureData of value.attachmentList){
               that.bindData.orderDetail.pictureList.push({url:pictureData.attachmentDir,desc:pictureData.attachmentNameCodeName})
            }
          }
        }
      })
    },
    components:{
      initOrder:initOrder
    }
  }
</script>
