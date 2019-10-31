<template>
  <div id="adminToto" class="content">
    <div class="wrap">
      <h2>偷偷說</h2>
      <div class="refresh">
        <button @click.prevent="getList()">更新</button>
      </div>
      <ul class="list">
        <li>
          <h3>ID</h3>
          <h3>標題</h3>
          <h3>PO主</h3>
          <h3>存活時間</h3>
          <h3>訊息數量</h3>
          <h4>編輯</h4>
        </li>
        <li v-for="(item, key) in totoList" :key="key">
          <h3>{{ item.room_id }}</h3>
          <h3>{{ item.title }}</h3>
          <h3>{{ item.poster }}</h3>
          <h3>{{ item.created_time | timeConvertor }}</h3>
          <h3>{{ item.message_qty }}</h3>
          <h4><button @click.prevent="removeRoom(item.room_id)">刪除</button></h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminToto',
  data() {
    return {
      totoList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios.get(`${process.env.API}/api/roomlist?type=tototalk`).then((response) => {
        // console.log('response: ', response.data);
        this.totoList = response.data;
      });
    },
    removeRoom(id) {
      if (!confirm('確定要刪除聊天室嗎？')) { return; }
      this.axios.delete(`${process.env.API}/api/admin/toto/${id}`).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          this.getList();
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
