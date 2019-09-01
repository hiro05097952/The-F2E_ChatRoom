<template>
  <div id="app">
    <div class="bk"></div>
    <navbar></navbar>
    <div class="content">
      <h2>本日話題</h2>
      <div class="today">
        <h3>#{{ topic.todayTitle }}</h3>
        <i>{{ topic.length }}</i>
      </div>
      <tototalks></tototalks>
    </div>
    <addPen></addPen>
  </div>
</template>

<script>
import tototalks from '@/components/tototalks';
import addPen from '@/components/addPen';
import navbar from '@/components/navbar';

const db = window.firebase.firestore();

export default {
  name: 'home',
  data() {
    return {
      topic: [],
    };
  },
  components: {
    tototalks,
    addPen,
    navbar,
  },
  created() {
    this.$bind('topic', db.collection('TODAYTOPIC').doc('chatRoom'));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/home.scss">
</style>
