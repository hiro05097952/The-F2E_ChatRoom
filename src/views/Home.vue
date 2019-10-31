<template>
  <div id="app">
    <div class="bk"></div>
    <navbar></navbar>
    <div class="content">
      <h2>本日話題</h2>
      <div class="today" @click="$router.push('/todaysTopic')">
        <h3>{{ '#' + topic.title }}</h3>
        <i>{{ topic.message_qty }}</i>
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
    this.axios.get(`${process.env.API}/api/roomlist?type=days_topic`).then((response) => {
      // console.log(response.data);
      this.topic = response.data[0];
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/home.scss">
</style>
