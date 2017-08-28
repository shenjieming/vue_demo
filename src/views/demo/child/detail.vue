<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 原始订单</span>
        <initOrder  :order-detail='bindData.orderDetail'></initOrder>
      </el-tab-pane>
      <el-tab-pane label="精确订单">
          <span slot="label"><i class="el-icon-document"></i>
          精确订单
          </span>
      </el-tab-pane>
      <el-tab-pane label="出库单">
           <span slot="label"><i class="el-icon-document"></i>
          出库单
          </span>

      </el-tab-pane>
      <el-tab-pane label="反馈单">
        <span slot="label"><i class="el-icon-document"></i>
         反馈单
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
  import apiCfg from '@/api/apiCfg'
  import API_URL from  '@/api/apiurl'
  import { Loading } from 'element-ui'
  import messageCFG from '@/common/message/messageCfg'
  const message=new messageCFG();
  const api = new apiCfg();


  import  initOrder from  '@/views/demo/solt/initOrderDetail'
  export default {
    data() {
      return {
        bindData:{
          orderDetail:new Object(),
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
        that.bindData.orderDetail= response;
      })
    },
    components:{
      initOrder:initOrder
    }
  }
</script>
