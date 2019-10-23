import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
