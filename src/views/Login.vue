<template>
    <div id="app">
        <div class="logoWrap">
          <i id="logo"></i>
        </div>
        <div class="login">
            <h2>你的名字是⋯⋯？</h2>
            <label>
                <input type="text" class="name" placeholder="輸入暱稱" v-model="newName">
                <div class="buttonWrap" @click="getRandomName">
                  <button class="random"></button>
                </div>
            </label>
            <button class="startChat" @click="login">開始聊天</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      newName: '',
    };
  },
  methods: {
    getRandomName() {
      this.axios.get(`${process.env.API}/api/name`).then((response) => {
        // console.log(response.data);
        this.newName = response.data;
      });
    },
    login() {
      this.axios.post(`${process.env.API}/api/login`, {
        username: this.newName,
      }).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          this.$store.commit('setName', this.newName);
          // 進入首頁
          this.$router.push('home');
        } else {
          alert('此暱稱已有人使用囉(｡･ω･｡)');
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/login.scss">
</style>
