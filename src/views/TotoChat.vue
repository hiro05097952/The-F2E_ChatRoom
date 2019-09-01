<template>
  <div id="app">
    <navbar></navbar>
    <div class="tototalk" @click="isClose = !isClose" :class="{'close' : isClose}"
    :style="{background: $store.state.toto.color}">
      <h3>{{$store.state.toto.title}}</h3>
      <p class="account">{{$store.state.toto.poster}}</p>
      <i id="commentIcon">{{$store.state.toto.length}}</i>
      <i id="arrow"></i>
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
  name: 'totoChat',
  data() {
    return {
      isClose: true,
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
