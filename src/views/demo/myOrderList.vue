<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="查询条件" name="1"  >
        <el-form ref="form" :model="queryParams" label-width="90px">
          <el-row :gutter="20" >
            <el-col :span="8">
              <el-form-item label="手术日期：">
                <div class="block">
                  <el-date-picker
                    v-model="queryParams.date"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围"
                    :picker-options="pickerOptions"
                    format="yyyy-MM-dd " >
                   <!-- HH:mm:ss-->
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单号：">
                <el-input v-model="queryParams.sONo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="货主：">
                <el-select v-model="queryParams.sOOIOrgCode" filterable placeholder="请选择">
                  <el-option
                    v-for="item in oIList"
                    :key="item.oIOrgCode"
                    :label="item.label"
                    :value="item.oIName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" >
            <el-col :span="8">
              <el-form-item label="医院：">
                <el-input v-model="queryParams.hPCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医生：">
                <el-input v-model="queryParams.dTCodeName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="住院号：">
                <el-input v-model="queryParams.patientHPNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div  class="el-row el-col-24">
            <el-button type="info" style="float: right" @click="select"  >查询</el-button>
          </div>
          <!--@click="detail"-->
          <div  class="el-row el-col-24" >
            <div style="float: right">
              <el-button type="info"  @click="select"  >下单</el-button>
              <el-button type="info"  @click="detail"   >详情</el-button>
              <el-button type="danger" @click="cancel" >取消</el-button>
            </div>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table :data="orderList"  stripe  border resizable highlight-current-row max-height="500" ref="gridList" @row-click="selectsRow"  @row-dblclick="detail" style="width: 100%">
      <el-table-column
      prop="serial" label="序号"  width="60" align="left">
        <!--label="序"-->
        <!--type="index"-->
        <!--width="100"-->
      </el-table-column>
      <el-table-column prop="sONo" label="订单号" align="center" ></el-table-column>
      <el-table-column label="医院" align="center" >
        <template scope="scope">
          <span >{{ scope.row.hPCodeName?scope.row.hPCodeName:scope.row.initHPCodeName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手术日期" align="center"  >
        <template scope="scope" >
          <span  >{{ scope.row.operationDate? scope.row.operationDate :scope.row.initOperationDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品线" align="center" >
        <template scope="scope">
          <span>{{ scope.row.medProdLnNames}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sOOIOrgCodeName" label="货主" align="center" ></el-table-column>
      <el-table-column prop="statusName" label="状态" align="right" ></el-table-column>
    </el-table>
    <el-pagination  style="float:left"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagination.pageSize"
      layout=" prev, pager, next, sizes,jumper,total"
      :total="400">
    </el-pagination>
  </div>
  <!--<router-view></router-view>-->
</template>

<script type="text/ecmascript-6">
  import apiCfg from '@/api/apiCfg'
  import API_URL from  '@/api/apiurl'
  import { Loading } from 'element-ui'
  import messageCFG from '@/common/message/messageCfg'
  import router from "../../router/index";
  const message=new messageCFG();
  const api = new apiCfg();
  export default{
    data() {
      return {
        queryParams: {
          date: '',
          sOOIOrgCode:'',
          hPCode:'',
          dTCodeName:'',
          patientHPNo:'',
          sOType:'OPER',
        },
        oIList:new Array(),
        hpList:new Array(),
        pagination:{
          pageNum:1,
          pageSize:10,
        },
        userInfo:'',
        orderList:new Array(),
        activeName:"1",
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        selectRow:""
      };
    },
    methods: {
      select:function () {
        const that=this;
        let httpParams= Object.assign(this.queryParams,this.pagination)
        api.post(API_URL.OMS_API.ORDER.LIST.SALES_MY_ORDER_LIST, httpParams, function (response) {
          for(let [key,value] of  Object.keys(response.list)){
            response.list[key].serial=parseInt(key) + parseInt(response.startRow);
          }
          that.orderList=response.list;
        })
      },
      getOIList:function () {
        /*获取货主列表*/
        const that=this;
        api.post(API_URL.OMS_API.USER.CURRENT_USER,{}, function (response) {
          that.userInfo=response;
          api.post(API_URL.OMS_API.ORDER.BUSINESS_DATA.DL_AGENT_OI_LIST,{dLOrgCode:that.userInfo.loginUserInfo.orgCode}, function (response) {
            that.oIList=response;
          })
        })
      },
      handleSizeChange(val) {
        this.select(this.pagination.pageSize=val);
      },
      handleCurrentChange(val) {
        this.select(this.pagination.pageNum=val);
      },
      selectsRow:function (row) {
        this.selectRow=row;
      },
      detail:function () {
        if(this.selectRow){
          router.push({path:'/myorderlist/orderDetail',query:{sONO:this.selectRow.sONo}});
        }else {
          message.error("请选择数据!")
        }

      },
      cancel:function () {

      }
    },
    mounted() {
      this.select();
      this.getOIList();
    },
  }
//    const init=function (vue) {
//      console.log(vue._data)
//    }
</script>
