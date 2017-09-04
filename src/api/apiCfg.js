/**
 * Created by jerry on 2017/4/13.
 */
import axios from 'axios'
import ERROREXCEPTION from  '@/api/errorException'
import messageCFG from '@/common/message/messageCfg';
import { Loading } from 'element-ui';
import Vue from 'vue';
// import { Message } from 'element-ui';
const baseUrl=BASE_HTTP_URL;
const message=new messageCFG();
var vm = new Vue({
    data:{
      httpCount:0
    }
});
// axios拦截器
var loadingInstance=new Object();
axios.interceptors.request.use( config => {
  // 在发送请求之前做些什么
    vm._data.httpCount++;
    if( vm._data.httpCount==1){
      loadingInstance= Loading.service({target:document.querySelector(".content-wrapper")}  );
    }
  return config;
},
  err => {
    return Promise.reject(err);
  });
axios.interceptors.response.use(
  response => {
    vm._data.httpCount --;
    if( vm._data.httpCount==0){
        loadingInstance.close();
    }
    return response;
  },
  error => {
    vm._data.httpCount --;
    if( vm._data.httpCount==0){
      loadingInstance.close();
    }
    if (error.response) {
     /* switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }*/
    }
    return Promise.reject(error.response.data);   // 返回接口返回的错误信息
  });

class API {
  //获取已授权列表
  get (httpUrl,paramsData,successFun,errorFun,) {
    axios.get(baseUrl+httpUrl,paramsData)
      .then(function (res) {
        switch (res.data.code){
          case ERROREXCEPTION.ERROR_OMS_TOKEN_ILLEGAL:
          case ERROREXCEPTION.ERROR_OMS_TOKEN_TIMEOUT:
            message.error("用户登录超时！")
            /*后续需要删除cookies*/
            break;
          case 0:
            if(successFun){
              successFun(res.data.info);
            }
            break;
          default:
            message.error(res.data.msg)
        }
      })
      .catch(function (err) {
        message.error("网络错误，请联系管理员！ "+err)
      })
  }
  // post请求
  post (httpUrl,paramsData,successFun,errorFun,) {
    let token=Vue.cookie.get("token");
    if (token != null && token != '' && httpUrl!= '/login/pcLogin' ) {
      httpUrl =baseUrl+ httpUrl + "?token="+token;
    }else {
      httpUrl =baseUrl+httpUrl;
    }
     axios.post(httpUrl,paramsData)
       .then(function (res) {
          switch (res.data.code){
            case ERROREXCEPTION.ERROR_OMS_TOKEN_ILLEGAL:
            case ERROREXCEPTION.ERROR_OMS_TOKEN_TIMEOUT:
              Vue.cookie.delete("token");
              Vue.$router.push("login");
              message.error("用户登录超时！");
              /*后续需要删除cookies*/
              break;
            case 0:
              if(successFun){
                successFun(res.data.info);
              }
              break;
            default:
              message.error(res.data.msg)
          }
     })
       .catch(function (err) {
         message.error("网络错误，请联系管理员！ "+err)
       })
  }
}
export default API;
