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
  connection: 'http://localhost:3000',
}));

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (from.name === null && to.name === 'TotoAdd') {
    next('/home');
  }
  // 原地刷新頁面 => 登出 => 登入
  // if (to.path.indexOf('admin') === -1 && from.name === null) {
  if (to.path.indexOf('admin') === -1 && from.name === null) {
    axios.get(`${process.env.API}/api/loginstatus/refresh`).then((response) => {
      console.log('刷新登入狀態確認: ', response.data);
      if (response.data.success) {
        store.commit('setName', response.data.message);
        if (to.name === 'Login') {
          next('/home');
        }
        next();
      } else {
        next();
        // next('/');
      }
    });
  }
  // 從其他頁面回到 Login，防呆
  if (to.name === 'Login' && from.name) {
    axios.get(`${process.env.API}/api/loginstatus/normal`).then((response) => {
      console.log('使用者想回到 Login: ', response.data);
      // 如果登入過還想回到 Login 頁面 => 重新導回 Home
      if (response.data.success && to.name === 'Login') {
        next('/home');
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
