<template>
  <div class="content" :class="{'totostyle' : $route.name === 'TotoChat'}" ref="content">
    <ul>
      <li v-for="(item, key) in msg" :key="key"
      :class="{'me' : item.sender === $store.state.userName,
      'blue': (name.users.indexOf(item.sender)+1) % 4 === 2,
      'purple': (name.users.indexOf(item.sender)+1) % 4 === 3,
      'green': (name.users.indexOf(item.sender)+1) % 4 === 0}">
        <p class="account">{{item.sender}}</p>
        <div class="talkbox" v-if="item.text">
          <h3>{{item.text}}</h3>
        </div>
        <img :src="imgConvertor(item.stamp)" alt="" v-if="item.stamp">
      </li>
    </ul>
  </div>
</template>

<script>
const db = window.firebase.firestore();

export default {
  name: 'chatContent',
  data() {
    return {
      msg: [],
      name: [],
    };
  },
  firestore: {
    name: db.collection('ACCOUNT').doc('name'),
  },
  created() {
    // 根據路由取得不同聊天訊息
    if (this.$route.name === 'TodaysTopic') {
      this.$bind('msg', db.collection('TODAYTOPIC').doc('chatRoom').collection('MESSAGE'));
    } else {
      this.$bind('msg', db.collection('TOTOTALK').doc(this.$route.params.roomID).collection('MESSAGE'));
    }
  },
  methods: {
    imgConvertor(value) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/emoticon_${value}.png`);
    },
  },
  watch: {
    msg() {
      // 當訊息新增時捲動到最底
      this.$nextTick(() => {
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/chatContent.scss">
</style>
