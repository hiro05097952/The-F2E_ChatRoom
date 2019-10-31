<template>
  <div class="typeBox" :class="{'stampOpen':stampSwitch}">
    <i id="image" @click="alert"></i>
    <i id="stamp" @click="stampSwitch = !stampSwitch">
    </i>
    <input type="text" v-model="text" @keypress.13="sendMessage('text')">
    <i id="send" @click="sendMessage('text')"></i>
    <transition name="fade">
      <div class="stampBox" v-if="stampSwitch">
        <img :src="item.imgUrl" v-for="(item, key) in stamp" :key="key"
        @click="sendMessage('stamp', item.name)">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'typebar',
  data() {
    return {
      text: '',
      topic: [],
      stampSwitch: false,
      stamp: [{
        name: 'all',
        // eslint-disable-next-line global-require
        imgUrl: require('@/assets/emoticon_all.png'),
      },
      {
        name: 'bird',
        // eslint-disable-next-line global-require
        imgUrl: require('@/assets/emoticon_bird.png'),
      },
      {
        name: 'smell',
        // eslint-disable-next-line global-require
        imgUrl: require('@/assets/emoticon_smell.png'),
      },
      ],
    };
  },
  created() {
    this.getRoomInfo();
  },
  methods: {
    getRoomInfo() {
      // 取得 topic 聊天室資料
      const vm = this;
      if (this.$route.name === 'TodaysTopic') {
        this.axios.get(`${process.env.API}/api/roomlist?type=days_topic`).then((response) => {
          // console.log(response.data);
          vm.$store.commit('setTopic', {
            length: response.data[0].message_qty,
            todayTitle: response.data[0].title,
          });
        });
      } else {
        this.axios.get(`${process.env.API}/api/roomlist?type=tototalk&roomid=${this.$route.params.roomID}`)
          .then((response) => {
            // console.log(response.data);
            vm.$store.commit('setTotoChat', {
              length: response.data[0].message_qty,
              title: response.data[0].title,
              color: response.data[0].color,
              poster: response.data[0].poster,
            });
          });
      }
    },
    sendMessage(type, value) {
      if (this.text === '' && type === 'text') { return; }
      // 新增聊天訊息
      const config = {
        sender: this.$store.state.userName,
      };
      const sendRoom = this.$route.name === 'TodaysTopic' ? 'getTopicMessage' : 'getTotoMessage';
      if (type === 'text') {
        config.text = this.text;
      } else {
        config.stamp = value;
      }
      if (this.$route.params.roomID) {
        config.room_id = this.$route.params.roomID;
      }
      this.$socket.emit(sendRoom, config);
      // 完成後清除輸入框
      this.text = '';
      this.stampSwitch = false;
    },
    alert() {
      alert('此功能尚未開放');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/typebar.scss">
</style>
