<template>
  <ul class="nav">
    <li :class="{'active' : $route.name === 'Home'}">
      <a href="#" @click.prevent="go('/home')">首頁</a>
    </li>
    <li :class="{'active' : $route.name === 'TodaysTopic'}">
      <a href="#" @click.prevent="go('/todaysTopic')">本日話題</a>
    </li>
    <li :class="{'active' : $route.name === 'TotoTalk' ||
    $route.name === 'TotoChat' || $route.name === 'TotoAdd'}">
      <a href="#" @click.prevent="go('/tototalk')">偷偷說</a>
    </li>
    <li>
      <a href="#" @click.prevent>{{ userName }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      userName: '',
    };
  },
  methods: {
    go(value) {
      this.$router.push(value);
    },
  },
  mounted() {
    if (localStorage.getItem('userName')) {
      const name = JSON.parse(localStorage.getItem('userName'));
      this.userName = name;
      this.$store.commit('setName', name);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/nav.scss">
</style>
