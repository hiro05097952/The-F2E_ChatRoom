<template>
  <ul class="nav">
    <li :class="{'active' : $route.name === 'Home' || $route.name === 'AdminHome'}"
    @click.prevent="go('/home')">
      <a href="#" @click.prevent>{{ !isAdmin ? '首頁' : '使用者' }}</a>
    </li>
    <li :class="{'active' : $route.name === 'TodaysTopic' || $route.name === 'AdminTopic'}"
    @click.prevent="go('/todaysTopic')">
      <a href="#" @click.prevent>本日話題</a>
    </li>
    <li :class="{'active' : $route.name === 'TotoTalk' ||
    $route.name === 'TotoChat' || $route.name === 'TotoAdd' || $route.name === 'AdminToto'}"
    @click.prevent="go('/tototalk/totohome')">
      <a href="#" @click.prevent>偷偷說</a>
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
    // 判斷網址是否為 Admin
    if (this.$route.name.toLowerCase().includes('admin')) {
      this.isAdmin = true;
      this.$store.commit('setName', 'Admin');
    }
  },
  methods: {
    go(value) {
      if (this.isAdmin) {
        this.$router.push(`/admin${value}`);
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
