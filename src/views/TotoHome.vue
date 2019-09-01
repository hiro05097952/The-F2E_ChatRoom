<template>
  <div id="app">
      <div class="bk"></div>
      <navbar></navbar>
      <div class="content">
        <tototalks></tototalks>
      </div>
      <addPen></addPen>
  </div>
</template>

<script>
import tototalks from '@/components/tototalks';
import addPen from '@/components/addPen';
import navbar from '@/components/navbar';

export default {
  name: 'totoHome',
  data() {
    return {
    };
  },
  components: {
    tototalks,
    addPen,
    navbar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/home.scss">
</style>
