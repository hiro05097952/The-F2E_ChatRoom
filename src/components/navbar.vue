<template>
  <ul class="nav">
    <li :class="{'active' : $route.path.toLowerCase().includes('home')}">
      <a href="#" @click.prevent="go('/home')">{{ !isAdmin ? '首頁' : '名字' }}</a>
    </li>
    <li :class="{'active' : $route.name === 'TodaysTopic'}">
      <a href="#" @click.prevent="go('/todaysTopic')">本日話題</a>
    </li>
    <li :class="{'active' : $route.name === 'TotoTalk' ||
    $route.name === 'TotoChat' || $route.name === 'TotoAdd'}">
      <a href="#" @click.prevent="go('/tototalk')">偷偷說</a>
    </li>
    <li>
      <a href="#" @click.prevent>{{ $store.state.userName }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      isAdmin: false,
    };
  },
  created() {
    if (this.$route.name.toLowerCase().includes('admin')) {
      this.isAdmin = true;
      this.$store.commit('setName', 'Admin');
    } else if (localStorage.getItem('userName')) {
      const name = JSON.parse(localStorage.getItem('userName'));
      this.$store.commit('setName', name);
    }
  },
  methods: {
    go(value) {
      if (this.isAdmin) {
        this.$router.push(`/admin/${value}`);
        return;
      }
      this.$router.push(value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/nav.scss">
</style>
