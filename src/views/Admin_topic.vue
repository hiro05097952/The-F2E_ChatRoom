<template>
  <div id="adminTopic" class="content">
    <div class="wrap">
      <h2>主題聊天室</h2>
      <div class="addWrap">
        <input type="text" v-model="newTopic" placeholder="請輸入主題"
        maxlength="5" required>
        <button @click.prevent="addTopic">加入主題聊天室</button>
      </div>
      <ul class="list">
        <li>
          <h3>編號</h3>
          <h3>主題</h3>
          <h3>狀態</h3>
          <h4>編輯</h4>
        </li>
        <li v-for="(item, key) in topicList" :key="key">
          <h3>{{ item.topic_id }}</h3>
          <h3>{{ item.topic }}</h3>
          <h3 :class="{'open' : item.is_open,
          'close' : !item.is_open}">{{ item.is_open ? '使用中' : '關閉' }}
            <span v-if="item.created_time">{{ item.created_time | timeConvertor }}</span>
          </h3>
          <h4>
            <button @click.prevent="switchTopic(item)">切換</button>
            <button @click.prevent="removeList(item.topic_id, 'topic')">刪除</button>
          </h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminTopic',
  data() {
    return {
      topicList: [],
      newTopic: '',
    };
  },
  created() {
    this.getList('topic');
  },
  methods: {
    getList(list) {
      this.axios.get(`${process.env.API}/api/admin/${list}`).then((response) => {
        // console.log('response: ', response.data);
        this[`${list}List`] = response.data;
      });
    },
    addTopic() {
      if (!this.newTopic) {
        return;
      }
      this.axios.post(`${process.env.API}/api/admin/topic`, {
        topic: this.newTopic,
      }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          this.newTopic = '';
          this.getList('topic');
        } else {
          alert(response.data.message);
        }
      });
    },
    removeList(id, list) {
      if (!confirm('確定要刪除主題嗎？')) { return; }
      const vm = this;
      this.axios.delete(`${process.env.API}/api/admin/${list}/${id}`).then((response) => {
        console.log(response.data);
        vm.getList(list);
      });
    },
    switchTopic(item) {
      if (!confirm('確定要切換主題嗎？')) { return; }
      this.axios.post(`${process.env.API}/api/admin/roomlist`, {
        title: item.topic,
        poster: 'admin',
        type: 'days_topic',
        topicID: item.topic_id,
      }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.getList('topic');
        } else {
          alert(response.data.message);
        }
      });
    },
  },
  filters: {
    timeConvertor(time) {
      let now = +(new Date());
      now -= 1000 * 60 * 60 * 8;
      const dt = +new Date(time.replace(/-/g, '/').replace(/T/g, ' ').replace(/Z/, ''));

      if ((now - dt) < 1000 * 60) {
        return `${Math.floor((now - dt) / (1000))}秒`;
      } else if ((now - dt) < 1000 * 60 * 60) {
        return `${Math.floor((now - dt) / (1000 * 60))}分`;
      } else if ((now - dt) < 1000 * 60 * 60 * 24) {
        return `${Math.floor((now - dt) / (1000 * 60 * 60))}小時${Math.floor(((now - dt) % (1000 * 60 * 60)) / (1000 * 60))}分`;
      }
      return `${Math.floor((now - dt) / (1000 * 60 * 60 * 24))}天${Math.floor(((now - dt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}小時`;
    },
  },
};
</script>

<style scoped lang="scss" src="../sass/admin.scss">
</style>
