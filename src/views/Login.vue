<template>
    <div id="app">
        <div class="logoWrap">
          <i id="logo"></i>
        </div>
        <div class="login">
            <h2>你的名字是⋯⋯？</h2>
            <label>
                <input type="text" class="name" placeholder="輸入暱稱" v-model="newName">
                <div class="buttonWrap">
                  <button class="random" @click="getName"></button>
                </div>
            </label>
            <button class="startChat" @click="login">開始聊天</button>
        </div>
    </div>
</template>

<script>
const db = window.firebase.firestore();

export default {
  name: 'login',
  data() {
    return {
      newName: '',
      name: {},
    };
  },
  firestore: {
    name: db.collection('ACCOUNT').doc('name'),
  },
  methods: {
    getName() {
      const index = Math.floor(Math.random() * this.name.random.length);
      this.newName = this.name.random[index];
    },
    login() {
      if (![...this.name.users].includes(this.newName)) {
        // 加入線上
        this.name.users.push(this.newName);
        db.collection('ACCOUNT').doc('name').update({
          users: this.name.users,
        });
        // 設定userName在local
        this.save('userName', this.newName);
        // 進入首頁
        this.$router.push('home');
      } else {
        // eslint-disable-next-line no-alert
        alert('此暱稱已有人使用囉(｡･ω･｡)');
      }
    },
    save(name, value) {
      localStorage.setItem(name, JSON.stringify(value));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/sass/login.scss">
</style>
