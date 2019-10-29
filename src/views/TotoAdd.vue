<template>
  <div id="app">
    <navbar></navbar>
    <div class="bk"></div>
    <div class="content">
      <h2>想說什麼⋯⋯？</h2>
      <textarea v-model="text" placeholder="偷偷輸入你想說的話吧(ゝ∀･)b" maxlength="100">
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
      this.axios.post(`${process.env.API}/api/addtoto`, {
        color: this.radio,
        poster: this.$store.state.userName,
        title: this.text,
      }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          this.text = '';
          this.$router.replace('/tototalk/totohome');
        } else {
          alert(response.data.success);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/sass/home.scss';
@import '@/sass/totoAdd.scss';
</style>
