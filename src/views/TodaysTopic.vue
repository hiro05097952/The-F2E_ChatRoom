<template>
  <div id="app">
    <navbar></navbar>
    <div class="today">
      <h3>#{{ $store.state.topic.todayTitle }}</h3>
      <i id="commentIcon">{{ $store.state.topic.length }}</i>
    </div>
    <chatContent></chatContent>
    <typebar></typebar>
  </div>
</template>

<script>
import navbar from '@/components/navbar';
import typebar from '@/components/typebar';
import chatContent from '@/components/chatContent';

export default {
  name: 'todaysTopic',
  data() {
    return {
    };
  },
  components: {
    navbar,
    typebar,
    chatContent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/chatRoom.scss">
</style>
