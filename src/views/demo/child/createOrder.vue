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
    <selectDoctor :user-info="userDetail"  :dialog-table="dialogTableVisible"></selectDoctor>
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

              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="医院要求：">

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="医生要求：">

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手术日期：">

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="诊断日期：">

              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script type="text/ecmascript-6">
  import selectDoctor from  '@/views/demo/dialogTemplate/selectDoctor'
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
        modelData:{},
        userDetail:"",
        dialogTableVisible:false
      }
    },
    methods: {
      selectDoctor:function () {
        this.dialogTableVisible=true;
//        this.$emit('update:dialogTable', true)
      },
      submit:function () {
        console.log("手术订单提交成功")
      },
      save:function () {
        console.log("手术订单保存成功")
      },
    },
    mounted() {
      const that=this;
      api.post(API_URL.OMS_API.USER.CURRENT_USER, {}, function (response) {
        that.userDetail= response;
      });
    },
    components:{
      selectDoctor:selectDoctor
    },
    watch: {
      dialogTableVisible(curVal,oldVal){
        console.log(curVal,oldVal)
      }
    }
  }
</script>
