<template>
  <div>
    <el-breadcrumb separator="/" style="padding: 5px; font-size: 16px;">
      <el-breadcrumb-item :to="{ path: 'myorderlist' }">手术订单</el-breadcrumb-item>
      <el-breadcrumb-item>下单</el-breadcrumb-item>
      <span style="float: right">
        <el-button type="primary" size="small" @click="submit">提交</el-button>
        <el-button type="primary" size="small" @click="save">保存</el-button>
        <el-button type="primary" size="small" @click="$router.back(-1)">返回</el-button>
      </span>
    </el-breadcrumb>
    <el-dialog  title="收货地址" :visible.sync="dialogTableVisible" >
      <el-table :data="doctorList" stripe  border resizable highlight-current-row max-height="500" @row-click="selectsDoctorRow"  @row-dblclick="doctorDialogSubmit"  >
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column  property="hPName" label="医院" align="center"></el-table-column>
        <el-table-column  property="wardDeptName" label="科室" align="center"></el-table-column>
        <el-table-column property="dTName" label="医生" align="center"></el-table-column>
        <el-table-column property="isLocalName" label="属地"align="center"></el-table-column>
      </el-table>
      <div style="padding: 20px 0;float: right">
        <el-button type="primary" @click="doctorDialogSubmit" >确认</el-button>
        <el-button type="primary" @click="doctorDialogCancel">取消</el-button>
      </div>
    </el-dialog>
    <el-collapse v-model="panelActiveName">
      <el-collapse-item name="1" title="手术信息">
        <el-form ref="form"  label-width="110px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="医生：">
                <el-input v-model="modelData.dTName"  icon="edit" :on-icon-click="selectDoctor" :disabled="true"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="科室：">
                  <el-input v-model="modelData.wardDeptName"  :disabled="true"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医院：">
                  <el-input v-model="modelData.hPName" :disabled="true" > </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配送商：">
                <el-input v-model="modelData.operSOIAOrgCode" > </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="医院要求：">
                <el-input v-model="modelData.initHPPreferenceDesc"  > </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="医生要求：">
                <el-input v-model="modelData.initDTOperationPreferenceDescs"  > </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手术日期：">
                  <el-date-picker
                    v-model="modelData.initOperationDate"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width: 100%">
                  </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="诊断信息：">
                <el-input v-model="modelData.initDiseaseInfo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2" >
        <template slot="title">
          <span>附件信息</span>
        </template>
        <el-button type="primary" size="small" @click="doctorDialogSubmit"  style="float: right">上传图片</el-button>

        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
         style="float: left"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-collapse-item>
    </el-collapse>

    <span style="float: right;padding: 20px 0" >
        <el-button type="primary" size="small" @click="submit">提交</el-button>
        <el-button type="primary" size="small" @click="save">保存</el-button>
        <el-button type="primary" size="small" @click="$router.back(-1)">返回</el-button>
      </span>
  </div>
</template>

<script type="text/ecmascript-6">
//  import selectDoctor from  '@/views/demo/dialogTemplate/selectDoctor'
  import apiCfg from '@/api/apiCfg'
  import API_URL from  '@/api/apiurl'
  import messageCFG from '@/common/message/messageCfg'
  const message=new messageCFG();
  const api = new apiCfg();
  export default {
    props: [],
    data() {
      return {
        panelActiveName: ['1','2','3','4','5'],
        modelData:{
          initOperationDate:""
        },
        userDetail:"",
        dialogTableVisible:false,
        doctorList:[],
        selectDoctorRow:"",
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    methods: {
      selectDoctor:function () {
        const that=this;
        api.post(API_URL.OMS_API.ORDER.BUSINESS_DATA.OFTEN_DOCTOR_LIST, {userID:this.userDetail.loginUserInfo.userId}, function (response) {
          that.doctorList=response;
          that.dialogTableVisible=true;
        })
      },
      submit:function () {
        console.log("手术订单提交成功")
      },
      save:function () {
        console.log("手术订单保存成功")
      },
      doctorDialogSubmit:function () {
        if(this.selectDoctorRow){
          this.modelData.dTName=this.selectDoctorRow.dTName;
          this.modelData.wardDeptName=this.selectDoctorRow.wardDeptName;
          this.modelData.hPName=this.selectDoctorRow.hPName;
          this.dialogTableVisible=false;
        }else {
          message.error("请选择数据!")
        }
      },
      doctorDialogCancel:function () {
        this.dialogTableVisible=false;
      },
      selectsDoctorRow:function (row) {
        this.selectDoctorRow=row;
      },
      handlePictureCardPreview:function () {

      },
      handleRemove:function () {

      }
    },
    mounted() {
      const that=this;
      api.post(API_URL.OMS_API.USER.CURRENT_USER, {}, function (response) {
        that.userDetail= response;
      });
    },
    watch: {
      dialogTableVisible(curVal,oldVal){
        console.log(curVal,oldVal)
      }
    }
  }
</script>
