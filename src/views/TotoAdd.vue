<template>
  <div id="app">
    <navbar></navbar>
    <div class="bk"></div>
    <div class="content">
      <h2>想說什麼⋯⋯？</h2>
      <textarea v-model="text" placeholder="偷偷輸入你想說的話吧(ゝ∀･)b" maxlength="150">
      </textarea>
      <div class="colorbar">
        <input type="radio" name="color" value="#AFCAFF" v-model="radio" id="blue">
        <label for="blue" class="blue"></label>

        <input type="radio" name="color" value="#F3E171" v-model="radio" id="yellow">
        <label for="yellow" class="yellow"></label>

        <input type="radio" name="color" value="#F6C2C2" v-model="radio" id="pink">
        <label for="pink" class="pink"></label>

        <input type="radio" name="color" value="#E8CDF3" v-model="radio" id="purple">
        <label for="purple" class="purple"></label>

      </div>
      <button class="submit" @click="addToto">發送</button>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/navbar';

const db = window.firebase.firestore();

export default {
  name: 'TotoAdd',
  data() {
    return {
      text: '',
      radio: '#AFCAFF',
    };
  },
  components: {
    navbar,
  },
  methods: {
    addToto() {
      if (this.text === '') { return; }
      if (this.text.length > 100) {
        alert('你的偷偷說太長了會被發現Σ(ﾟдﾟ)！');
        return;
      }
      const id = this.convertor(this.$store.state.toto.totoRooms + 1);
      db.collection('TOTOTALK').doc(`toto${id}`).set({
        color: this.radio,
        length: 0,
        poster: this.$store.state.userName,
        roomID: id,
        title: this.text,
      });
      this.$router.replace('/tototalk');
    },
    convertor(value) {
      if (value < 10) {
        return `0${String(value)}`;
      }
      return value;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/sass/home.scss';
@import '@/sass/totoAdd.scss';
</style>
