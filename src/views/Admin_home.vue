<template>
  <div id="adminHome">
    <navbar></navbar>
    <div class="bk"></div>

    <div class="content">
      <div class="nameWrap">
        <h2>名字</h2>
        <div class="addNameWrap">
          <input type="text" v-model="firstname" placeholder="請輸入姓氏"
          maxlength="5" required>
          <input type="text" v-model="lastname" placeholder="請輸入名字"
          required maxlength="5">
          <button @click.prevent="addName">加入名字</button>
        </div>
        <ul class="nameList">
          <li>
            <h3>姓氏</h3>
            <h3>名字</h3>
            <h4>編輯</h4>
          </li>
          <li v-for="(item, key) in nameList" :key="key">
            <h3>{{ item.firstname }}</h3>
            <h3>{{ item.lastname }}</h3>
            <button @click.prevent="removeName(item.name_id)">刪除</button>
          </li>
        </ul>
      </div>
      <div class="userWrap">
        <h2>線上使用者</h2>
        <div class="refresh">
          <button @click.prevent="getUser">更新</button>
        </div>
        <ul class="userList">
          <li>
            <h3>使用者</h3>
            <h3>上線時間</h3>
            <h4>編輯</h4>
          </li>
          <li v-for="(item, key) in userList" :key="key">
            <h3>{{ item.user_name }}</h3>
            <h3>{{ item.user_login_time | timeConvertor}}</h3>
            <button disabled>踢除</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '../components/navbar';

export default {
  name: 'adminHome',
  components: {
    navbar,
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      sqldata: [],
      nameList: [],
      userList: [],
    };
  },
  created() {
    this.getNameList();
    this.getUser();
  },
  methods: {
    addName() {
      const vm = this;
      if (this.firstname === '' || this.lastname === '') {
        return;
      }
      this.axios.post(`${process.env.API}/api/admin/name`, {
        firstname: this.firstname,
        lastname: this.lastname,
      }).then((response) => {
        console.log(response.data);
        vm.firstname = '';
        vm.lastname = '';
        vm.getNameList();
      });
    },
    getNameList() {
      this.axios.get(`${process.env.API}/api/admin/name`).then((response) => {
        console.log('response: ', response.data);
        this.nameList = response.data;
      });
    },
    removeName(id) {
      const vm = this;
      this.axios.delete(`${process.env.API}/api/admin/name/${id}`).then((response) => {
        console.log(response.data);
        vm.getNameList();
      });
    },
    getUser() {
      this.axios.get(`${process.env.API}/api/admin/user`).then((response) => {
        console.log('user response: ', response.data);
        this.userList = response.data;
      });
    },
  },
  filters: {
    timeConvertor(time) {
      let now = +(new Date());
      now -= 1000 * 60 * 60 * 8;
      const dt = new Date(time.replace(/-/g, '/').replace(/T/g, ' ').replace(/Z/, ''));

      if ((now - dt) < 1000 * 60) {
        return `${Math.floor((now - dt) / (1000))}秒`;
      } else if ((now - dt) < 1000 * 60 * 60) {
        return `${Math.floor((now - dt) / (1000 * 60))}分`;
      } else if ((now - dt) < 1000 * 60 * 60 * 24) {
        return `${Math.floor((now - dt) / (1000 * 60 * 60))}小時${Math.floor(((now - dt) % (1000 * 60 * 60)) / (1000 * 60))}分`;
      }
      return `${Math.floor((now - dt) / (1000 * 60 * 60 * 24))}天${Math.floor(((now - dt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}小時`;
    },
  },
};
</script>

<style scoped lang="scss" src="../sass/admin_home.scss">
</style>
