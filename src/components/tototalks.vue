<template>
  <div class="hotWrap">
    <h2 v-text="$route.name === 'Home'?'熱門偷偷說':'本日偷偷說'"></h2>
    <ul class="hot" v-masonry item-selector=".hotbox" gutter="20">
      <li v-masonry-tile v-for="(item, index) in sort" :key="index" class="hotbox"
      :style="{ background: item.color }" @click="goChat(item.room_id)">
        <h3>{{ item.title }}</h3>
        <p>{{ item.poster }}</p>
        <i>{{ item.message_qty }}</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tototalks',
  data() {
    return {
      tototalk: [],
    };
  },
  created() {
    this.axios.get(`${process.env.API}/api/roomlist?type=tototalk`).then((response) => {
      console.log('偷偷說:', response.data);
      this.tototalk = response.data;
    });
  },
  computed: {
    sort() {
      if (this.$route.name === 'TotoTalk') {
        return this.tototalk.slice().sort((a, b) => a.created_time - b.created_time);
      }
      return this.tototalk.slice().sort((a, b) => a.message_qty - b.message_qty);
    },
  },
  methods: {
    goChat(id) {
      this.$router.push({ name: 'TotoChat', params: { roomID: id } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/tototalks.scss">
</style>
