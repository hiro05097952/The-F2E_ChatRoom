<template>
  <div id="adminLogin">
    <div class="bk"></div>

    <div class="loginWrap">
      <h2>管理員登入</h2>
      <label for="account">
        帳號:
        <input type="text" id="account" v-model="account">
      </label>
      <label for="password">
        密碼:
        <input type="text" id="account" v-model="password">
      </label>
      <button @click.prevent="login">送出</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      account: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (!this.account || !this.password) { return; }
      this.axios.post(`${process.env.API}/api/admin/login`, {
        account: this.account,
        password: this.password,
      }).then((response) => {
        alert(response.data.message);
        this.account = '';
        this.password = '';
        if (response.data.success) {
          this.$router.push('/admin/home');
        }
      });
    },
  },
};
</script>

<style scoped lang="scss" src="../sass/admin.scss">
</style>
