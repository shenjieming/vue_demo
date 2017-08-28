<template>
  <div class="wrapper" style="background-color: #172435;height: 999px ">
    <div class="kanban_title_count">
      <span>待出库（{{bindData.statistics.outBoundQuantity}}刀）</span>
    </div>
    <div style="padding: 10px">
      <el-table :data="tobeOutBoundList"  style="width: 100%">
        <el-table-column prop="serial" label="序" align="center" width="40"  className="kanban_table_tr">
        </el-table-column>
        <el-table-column prop="sONo" label="订单号" align="center" className="kanban_table_tr">
        </el-table-column>
        <el-table-column label="医院" align="center" className="kanban_table_tr">
          <template scope="scope">
            <span >{{ scope.row.hPCodeName?scope.row.hPCodeName:scope.row.initHPCodeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手术日期" align="center" className="kanban_table_tr">
          <template scope="scope">
            <span >{{ scope.row.operationDate?scope.row.operationDate:scope.row.initOperationDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品线" align="center" className="kanban_table_tr">
          <template scope="scope">
            <span>{{ scope.row.medProdLnCodeNames?scope.row.medProdLnCodeNames:scope.row.initMedProdLnName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sOOIOrgCodeName" label="货主" align="center" className="kanban_table_tr"></el-table-column>
        <el-table-column prop="statusName" label="状态" align="right" className="kanban_table_tr"></el-table-column>
      </el-table>
    </div>
    <div class="kanban_title_count">
      <span>待返库（{{bindData.statistics.feedBackQuantity}}刀）</span>
    </div>
    <div style="padding: 10px">
      <el-table :data="tobeFeedBackList"  style="width: 100%">
        <el-table-column prop="serial" label="序" align="center" width="40"  className="kanban_table_tr">
        </el-table-column>
        <el-table-column prop="sONo" label="订单号" align="center" className="kanban_table_tr">
        </el-table-column>
        <el-table-column label="医院" align="center" className="kanban_table_tr">
          <template scope="scope">
            <span >{{ scope.row.hPCodeName?scope.row.hPCodeName:scope.row.initHPCodeName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手术日期" align="center" className="kanban_table_tr">
          <template scope="scope">
            <span >{{ scope.row.operationDate?scope.row.operationDate:scope.row.initOperationDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品线" align="center" className="kanban_table_tr">
          <template scope="scope">
            <span>{{ scope.row.medProdLnCodeNames?scope.row.medProdLnCodeNames:scope.row.initMedProdLnName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sOOIOrgCodeName" label="货主" align="center" className="kanban_table_tr"></el-table-column>
        <el-table-column prop="statusName" label="状态" align="right" className="kanban_table_tr"></el-table-column>
      </el-table>
    </div>
    <!--<div class="list_lh" style="position:fixed;bottom: 10px;width: 100%;text-align: center;font-size: 24px;" ref="list_lh">-->
      <!--<ul v-for="(item,index) in orderScrollList">-->
        <!--<li >-->
          <!--<p> ☆订单({{item.sONo}}) {{item.hPCodeName?item.hPCodeName:item.initHPCodeName}}-{{item.dTCodeName?item.dTCodeName:item.initDTCodeName}}今天手术，请及时处理☆</p>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
  </div>
</template>

<script >
  import API_URL  from '@/api/apiurl'
  import apiCfg from '@/api/apiCfg'
  import { Loading } from 'element-ui';
//  import myScroll from '@/common/helper/myScorll'
  const api = new apiCfg();
  const initParams = {
    outBoundHttpParams: {
      pageNum: 1,
      pageSize:5
    },
    feedBackParams: {
      pageNum: 1,
      pageSize: 5
    }
  };
  export default{
    props: [],
    data(){
      return {
        tobeOutBoundList: [],
        tobeFeedBackList: [],
        bindData: {
          statistics: {
            outBoundQuantity: 0,
            feedBackQuantity: 0
          }
        }
      };
    },
    methods: {
      /*获取待出库列表数据*/
      getOutBoundList:function () {
        let that =this;
        api.post(API_URL.OMS_API.ORDER.KANBANLIST.WAIT_DELIVERING, initParams.outBoundHttpParams, function (response) {
            for (let  i=0;i<response.list.length;i++){
              response.list[i].serial = i+response.startRow+1 ;
            }
          that.tobeOutBoundList=response.list;
          that.bindData.statistics.outBoundQuantity=response.total;
        })
      },
      getFeedBackList:function () {
        /*获取待返库列表数据*/
        let that =this;
        api.post(API_URL.OMS_API.ORDER.KANBANLIST.WAIT_RETURN_WARE_HOUSE, initParams.feedBackParams, function (response) {
          for (let  i=0;i<response.list.length;i++){
            response.list[i].serial = i+response.startRow+1 ;
          }
          that.tobeFeedBackList=response.list;
          that.bindData.statistics.feedBackQuantity=response.total;
        })
      },
    },
    mounted() {
      this.getOutBoundList();
      this.getFeedBackList();
    },
    components:{

    }

  }
</script>
