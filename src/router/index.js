import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import TodaysTopic from '@/views/TodaysTopic';
import TotoChat from '@/views/TotoChat';
import TotoHome from '@/views/TotoHome';
import TotoAdd from '@/views/TotoAdd';

import AdminIndex from '@/views/Admin_index';
import AdminHome from '@/views/Admin_home';
import AdminTopic from '@/views/Admin_topic';
import AdminToto from '@/views/Admin_toto';
import AdminLogin from '@/views/Admin_login';


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
      meta: {
        customerAuth: true,
      },
    },
    // tototalk
    {
      path: '/tototalk/totohome',
      name: 'TotoTalk',
      component: TotoHome,
      meta: {
        customerAuth: true,
      },
    },
    {
      path: '/tototalk/totochat/:roomID',
      name: 'TotoChat',
      component: TotoChat,
      meta: {
        customerAuth: true,
      },
    },
    {
      path: '/tototalk/totoadd',
      name: 'TotoAdd',
      component: TotoAdd,
      meta: {
        customerAuth: true,
      },
    },
    // days topic
    {
      path: '/todaystopic',
      name: 'TodaysTopic',
      component: TodaysTopic,
      meta: {
        customerAuth: true,
      },
    },
    // admin
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
    },
    {
      path: '/admin',
      name: 'AdminIndex',
      component: AdminIndex,
      redirect: '/admin/home',
      children: [
        {
          path: 'home',
          name: 'AdminHome',
          component: AdminHome,
          meta: {
            adminAuth: true,
          },
        },
        {
          path: 'todaystopic',
          name: 'AdminTopic',
          component: AdminTopic,
          meta: {
            adminAuth: true,
          },
        },
        {
          path: 'tototalk/totohome',
          name: 'AdminToto',
          component: AdminToto,
          meta: {
            adminAuth: true,
          },
        },
      ],
    },
  ],
});
