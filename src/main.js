// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { VueMasonryPlugin } from 'vue-masonry';
import { firestorePlugin } from 'vuefire';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSocketIO from 'vue-socket.io';

import router from './router';
import App from './App';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(VueMasonryPlugin);
Vue.use(firestorePlugin);
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
// 進入聊天室
Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'http://localhost:3000',
  connection: process.env.API,
}));

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (from.name === null && to.name === 'TotoAdd') {
    next('/home');
  }
  // 聊天室驗證
  if (to.meta.customerAuth) {
    const method = from.name === null ? 'refresh' : 'normal';
    axios.get(`${process.env.API}/api/loginstatus/${method}`).then((response) => {
      if (response.data.success) {
        // 刷新的話重新 setUserName
        if (from.name === null) {
          store.commit('setName', response.data.message);
        }
        next();
      } else {
        // 沒有過導回 Login Page
        alert('請重新登入');
        next('/');
      }
    });
  }
  // Login 頁面
  if (to.name === 'Login') {
    const method = from.name === null ? 'refresh' : 'normal';
    axios.get(`${process.env.API}/api/loginstatus/${method}`).then((response) => {
      if (response.data.success) {
        if (from.name === null) {
          store.commit('setName', response.data.message);
          alert('登入成功');
        } else {
          alert('您已登入過摟！');
        }
        next('/home');
      }
      next();
    });
  }
  // Admin
  if (to.meta.adminAuth) {
    axios.get(`${process.env.API}/api/admin/login`).then((response) => {
      // console.log('admin登入: ', response.data);
      if (response.data.success) {
        next();
      } else {
        alert(response.data.message);
        next('/admin/login');
      }
    });
  }
  next();
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
