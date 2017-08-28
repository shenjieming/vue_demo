// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import router from '@/router';
import '@/assets/style/css/app';
var VueCookie = require('vue-cookie');
Vue.use(ElementUI);
Vue.use(VueCookie);
new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: {
    App
  }
});
