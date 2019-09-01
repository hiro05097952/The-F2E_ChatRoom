import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import TotoTalk from '@/views/TotoTalk';
import TodaysTopic from '@/views/TodaysTopic';
import TotoChat from '@/views/TotoChat';
import TotoHome from '@/views/TotoHome';
import TotoAdd from '@/views/TotoAdd';


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
    {
      path: '/tototalk',
      component: TotoTalk,
      children: [
        {
          path: '',
          name: 'TotoTalk',
          component: TotoHome,
        },
        {
          path: 'totochat/:roomID',
          name: 'TotoChat',
          component: TotoChat,
        },
        {
          path: 'totoadd',
          name: 'TotoAdd',
          component: TotoAdd,
        },
      ],
    },
    {
      path: '/todaystopic',
      name: 'TodaysTopic',
      component: TodaysTopic,
    },
  ],
});
