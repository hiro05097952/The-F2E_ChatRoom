<template>
  <div class="hotWrap">
    <h2 v-text="$route.name === 'Home'?'熱門偷偷說':'本日偷偷說'"></h2>
    <ul class="hot" v-masonry item-selector=".hotbox" gutter="20">
      <li v-masonry-tile v-for="(item, index) in sort" :key="index" class="hotbox"
      :style="{ background: item.color }" @click="goChat(item)">
        <h3>{{ item.title }}</h3>
        <p>{{ item.poster }}</p>
        <i>{{ item.length }}</i>
      </li>
    </ul>
  </div>
</template>

<script>
const db = window.firebase.firestore();

export default {
  name: 'tototalks',
  data() {
    return {
      tototalk: [],
    };
  },
  created() {
    this.$bind('tototalk', db.collection('TOTOTALK')).then(() => {
      this.$store.commit('setTotoChat', {
        totoRooms: this.tototalk.length });
    });
  },
  computed: {
    sort() {
      if (this.$route.name === 'TotoTalk') {
        return this.tototalk.slice().sort((a, b) => a.length - b.length);
      }
      return this.tototalk.slice().sort((a, b) => b.length - a.length);
    },
  },
  methods: {
    goChat(item) {
      this.$router.push({ name: 'TotoChat', params: { roomID: item.id } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/tototalks.scss">
</style>
