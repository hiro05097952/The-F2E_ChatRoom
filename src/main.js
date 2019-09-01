// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { VueMasonryPlugin } from 'vue-masonry';
import { firestorePlugin } from 'vuefire';
import Vuex from 'vuex';
import router from './router';

import App from './App';

Vue.config.productionTip = false;
Vue.use(VueMasonryPlugin);
Vue.use(firestorePlugin);
Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    // 使用者名稱，在組件navbar裡會先取得localStorage，若無則為預設
    userName: 'Register',
    // 偷偷說聊天室標題，帳號，聊天數，顏色
    toto: {},
    // 本日話題聊天數
    topic: {},
  },
  mutations: {
    setName(state, payload) {
      state.userName = payload;
    },
    setTotoChat(state, payload) {
      const newOb = { ...state.toto, ...payload };
      state.toto = newOb;
    },
    setTopic(state, payload) {
      state.topic = payload;
    },
  },
});

router.beforeEach((to, from, next) => {
  if (from.name === null && to.name === 'TotoAdd') {
    next('/home');
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
