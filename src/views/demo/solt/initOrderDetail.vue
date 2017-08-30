<template>
  <div >
    <el-collapse v-model="panelActiveName">
      <el-collapse-item title="交易双方信息" name="1">
        <el-form ref="form"  label-width="110px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="货主：">
                <div class="detail_counter">
                  {{orderDetail.sOOIOrgCodeName}}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经营许可证号：">
                <div class="detail_counter">
                  {{orderDetail.ownerManagement.managementLicNo }}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式：">
                <div class="detail_counter">
                  {{orderDetail.ownerManagement.contact1Name }}  {{orderDetail.ownerManagement.contact1Mobile}}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="经营地址：">
                <div class="detail_counter">
                  {{orderDetail.ownerManagement.corpBizProvinceCodeName}}{{orderDetail.ownerManagement.corpBizCityCodeName}}{{orderDetail.ownerManagement.corpBizDistrictCodeName}}{{orderDetail.ownerManagement.corpBizAddress}}
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          收货信息【货主：{{orderDetail.sOOIOrgCodeName}}】【 经销商：{{orderDetail.sOCreateByOrgCodeName}}】
        </template>
        <el-form ref="form"  label-width="110px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="收货人：">
                <div class="detail_counter">
                  {{orderDetail.deliveryContact}}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话：">
                <div class="detail_counter">
                  {{orderDetail.deliveryMobile }}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配送：">
                <div class="detail_counter">
                  {{orderDetail.iniitCarrierTransTypeName }}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址：">
                <div class="detail_counter">
                  {{orderDetail.deliveryProvinceName}}{{orderDetail.deliveryCityName}}{{orderDetail.deliveryDistrictName}}{{orderDetail.deliveryAddress}}
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3" title="手术信息">
        <el-form ref="form"  label-width="110px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="医院：">
                <div class="detail_counter">
                  {{orderDetail.initHPCodeName}}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="科室：">
                <div class="detail_counter">
                  {{orderDetail.initWardDeptCodeName }}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医生：">
                <div class="detail_counter">
                  {{orderDetail.initDTCodeName }}
                  <span class="text-danger">[{{orderDetail.initIsLocalName}}]</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配送商：">
                <div class="detail_counter">
                  {{orderDetail.operSOIAOrgCodeName}}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="医院要求：">
                <div class="detail_counter">
                  {{orderDetail.initHPPreferenceDesc}}
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医生要求：">
                <div class="detail_counter">
                  {{orderDetail.initDTOperationPreferenceDesc}}
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          器械信息 散件：{{orderDetail.sOOIOrgCodeName}} 件  （ 植入物：{{orderDetail.sOCreateByOrgCodeName}} 件，工具：{{ 0}}件）
        </template>
        <el-tabs  v-model="tabActiveName">
          <el-tab-pane label="散件" name="1">
            <material  :material-detail='materialList'></material>
            </el-tree>
          </el-tab-pane>
          <el-tab-pane label="套件" name="2">套件</el-tab-pane>
        </el-tabs>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          附件信息
        </template>
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;float: left" v-for="item in orderDetail.pictureList ">
            <img v-bind:src=item.url   class="image" style="width: 250px;height: 200px;">
            <span>{{item.desc}}</span>
          </div>
        </el-card>
      </el-collapse-item>

    </el-collapse>
    传参订单号：<span>{{orderDetail.sONo}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import material from  '@/views/demo/solt/materialDetail'
  import apiCfg from '@/api/apiCfg'
  import API_URL from  '@/api/apiurl'
  const api = new apiCfg();
  export default {
    props: ['orderDetail'],
    data() {
      return {
        panelActiveName: ['1','2','3','4','5'],
        tabActiveName:'1',
        materialList:[],
        data: [{
          label: '散件',
          children:{}
        }],
      }
    },
    methods: {},
    mounted() {
      const that=this;
      /*获取模糊订单物料*/
      api.post(API_URL.OMS_API.ORDER.DETAIL.INIT_ORDER_MATERIAL,this.$route.query, function (response) {
           for(let value of response){
             value.label=value.medBrandName;
             value.children=value.medMaterialList;
             for(let childValue of value.medMaterialList){
               childValue.label=childValue.medMIName;
             }
           }
        that.materialList= Object.assign(that.data,response);
      });
    },
    components:{
      material:material
    },
  }

</script>
