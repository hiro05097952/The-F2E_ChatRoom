<template>
  <div class="content" :class="{'totostyle' : $route.name === 'TotoChat'}">
    <ul ref="content">
      <li v-for="(item, key) in msg" :key="key"
      :class="{'me' : item.sender === $store.state.userName,
      'blue': (name.indexOf(item.sender)+1) % 4 === 2,
      'purple': (name.indexOf(item.sender)+1) % 4 === 3,
      'green': (name.indexOf(item.sender)+1) % 4 === 0}">
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
export default {
  name: 'chatContent',
  data() {
    return {
      msg: [],
      name: [],
    };
  },
  created() {
    this.getMessage();
  },
  methods: {
    getMessage() {
      // 根據路由取得不同聊天訊息
      const vm = this;
      let sucket = '';
      let url = '';
      if (this.$route.name === 'TodaysTopic') {
        url = `${process.env.API}/api/message?type=daystopic`;
        sucket = 'getTopicMessage';
      } else {
        url = `${process.env.API}/api/message?type=tototalk&roomid=${this.$route.params.roomID}`;
        sucket = 'getTotoMessage';
      }

      this.axios.get(url).then((response) => {
        vm.msg = response.data;
        vm.name = response.data.map(item => item.sender);
        // 開啟接收 socket 訊息
        vm.sockets.subscribe(sucket, (data) => {
          // console.log(sucket, data);
          vm.msg.push(data);
        });
      });
    },
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
