<template>
  <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  /*import {requestLogin} from '../assets/api/api.js';*/
  //  import  '../assets/style/css/login.css'
  import apiCfg from '@/api/apiCfg'
  import API_URL from  '@/api/apiurl'
  import messageCFG from '@/common/message/messageCfg'
  const api = new apiCfg();
  const message=new messageCFG();
  export default {
    data() {
      return {
        logining: false,
        account: {
          username: 'dltest_zjy',
          pwd: '123456'
        },
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleLogin() {
        this.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            /*验证成功进行登录操作*/
            let that =this;
            this.logining = true;
            let loginParams = {loginName: this.account.username, loginPassword: this.account.pwd};
            api.post(API_URL.OMS_API.USER.PC_LOGIN, loginParams, function (response) {
              that.logining=false;
              that.$cookie.set('token', response.token, {expires:response.excessTime});
              that.$router.push("dashboard")
            })
          } else {
            message.error("请输入用户名和密码！");
            return false;
          }
        });
      }
    }
  }

</script>
<style>
  body {
    background: #DFE9FB;
  }
</style>
