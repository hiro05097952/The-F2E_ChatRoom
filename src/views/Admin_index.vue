<template>
  <div id="adminIndex">
    <navbar></navbar>
    <div class="bk"></div>

    <router-view></router-view>
  </div>
</template>

<script>
import navbar from '../components/navbar';

export default {
  name: 'AdminIndex',
  components: {
    navbar,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped lang="scss" src="../sass/admin.scss">
</style>
