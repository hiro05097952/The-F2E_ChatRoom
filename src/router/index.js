import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import TodaysTopic from '@/views/TodaysTopic';
import TotoChat from '@/views/TotoChat';
import TotoHome from '@/views/TotoHome';
import TotoAdd from '@/views/TotoAdd';

import AdminHome from '@/views/Admin_home';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      component: Login,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    // tototalk
    {
      path: '/tototalk/totohome',
      name: 'TotoTalk',
      component: TotoHome,
    },
    {
      path: '/tototalk/totochat/:roomID',
      name: 'TotoChat',
      component: TotoChat,
    },
    {
      path: '/tototalk/totoadd',
      name: 'TotoAdd',
      component: TotoAdd,
    },
    // days topic
    {
      path: '/todaystopic',
      name: 'TodaysTopic',
      component: TodaysTopic,
    },
    // admin
    {
      path: '/admin/home',
      name: 'AdminHome',
      component: AdminHome,
      // children: {

      // },
    },
  ],
});
