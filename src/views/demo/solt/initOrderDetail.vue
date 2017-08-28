<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="交易双方信息" name="1">
        <el-form ref="form" :model="orderDetail" label-width="110px">
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
    </el-collapse>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="收货信息" name="1">
        <el-form ref="form" :model="orderDetail" label-width="110px">
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
    </el-collapse>
    传参数据：<span>{{orderDetail.sONo}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['orderDetail'],
    data() {
      return {
        activeName: "1"
      }
    },
    methods: {},
    mounted() {
      console.log(this.orderDetail)
    }
  }
</script>
