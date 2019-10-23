// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { VueMasonryPlugin } from 'vue-masonry';
import { firestorePlugin } from 'vuefire';
import axios from 'axios';
import VueAxios from 'vue-axios';

import router from './router';
import App from './App';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(VueMasonryPlugin);
Vue.use(firestorePlugin);
Vue.use(VueAxios, axios);

/* eslint-disable no-new */
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
