<template>
  <div class="typeBox" :class="{'stampOpen':stampSwitch}">
    <i id="image" @click="alert"></i>
    <i id="stamp" @click="stampSwitch = !stampSwitch">
    </i>
    <input type="text" v-model="text" @keyup.enter="sendMessage('text')">
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
const db = window.firebase.firestore();

export default {
  name: 'typebar',
  data() {
    return {
      text: '',
      topic: [],
      length: 0,
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
    const vm = this;
    if (this.$route.name === 'TodaysTopic') {
      this.$bind('topic', db.collection('TODAYTOPIC').doc('chatRoom')).then((item) => {
        vm.$store.commit('setTopic', {
          length: item.length,
          todayTitle: item.todayTitle,
        });
        this.length = item.length;
      });
    } else {
      this.$bind('roomInfo', db.collection('TOTOTALK').doc(this.$route.params.roomID)).then((item) => {
        vm.$store.commit('setTotoChat', {
          length: item.length,
          color: item.color,
          title: item.title,
          poster: item.poster,
        });
        this.length = item.length;
      });
    }
  },
  methods: {
    sendMessage(type, value) {
      if (this.text === '' && type === 'text') { return; }
      // 集合 文件
      const col = this.$route.name === 'TodaysTopic' ? 'TODAYTOPIC' : 'TOTOTALK';
      const document = this.$route.name === 'TodaysTopic' ? 'chatRoom' : this.$route.params.roomID;
      const ob = type === 'text' ? {
        sender: this.$store.state.userName,
        text: this.text,
      } : {
        sender: this.$store.state.userName,
        stamp: value,
      };
      // 手動增加length
      this.length += 1;
      db.collection(col).doc(document).update({
        length: this.length,
      });
      // 新增聊天訊息
      db.collection(col).doc(document).collection('MESSAGE')
        .doc(`message${this.covertor(this.length)}`)
        .set(ob);
      // 完成後清除輸入框
      this.text = '';
      this.stampSwitch = false;
    },
    covertor(value) {
      if (value < 10) {
        return `00${String(value)}`;
      } else if (value < 100) {
        return `0${String(value)}`;
      }
      return String(value);
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
