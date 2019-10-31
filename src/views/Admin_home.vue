<template>
  <div id="adminHome" class="content">
    <div class="wrap name">
      <h2>名字</h2>
      <div class="addWrap">
        <input type="text" v-model="firstname" placeholder="請輸入姓氏"
        maxlength="5" required>
        <input type="text" v-model="lastname" placeholder="請輸入名字"
        required maxlength="5">
        <button @click.prevent="addName">加入名字</button>
      </div>
      <ul class="list name">
        <li>
          <h3>姓氏</h3>
          <h3>名字</h3>
          <h4>編輯</h4>
        </li>
        <li v-for="(item, key) in nameList" :key="key">
          <h3>{{ item.firstname }}</h3>
          <h3>{{ item.lastname }}</h3>
          <button @click.prevent="removeName(item.name_id, 'name')">刪除</button>
        </li>
      </ul>
    </div>
    <div class="wrap user">
      <h2>線上使用者</h2>
      <div class="refresh">
        <button @click.prevent="getList('user')">更新</button>
      </div>
      <ul class="list user">
        <li>
          <h3>使用者</h3>
          <h3>上線時間</h3>
          <h4>編輯</h4>
        </li>
        <li v-for="(item, key) in userList" :key="key">
          <h3>{{ item.user_name }}</h3>
          <h3>{{ item.user_login_time | timeConvertor}}</h3>
          <button @click.prevent="removeName(item.user_id, 'user')">踢除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminHome',
  data() {
    return {
      firstname: '',
      lastname: '',
      nameList: [],
      userList: [],
    };
  },
  created() {
    this.getList('name');
    this.getList('user');
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
      }).then(() => {
        // console.log('新增名字: ', response.data);
        vm.firstname = '';
        vm.lastname = '';
        vm.getList('name');
      });
    },
    getList(list) {
      this.axios.get(`${process.env.API}/api/admin/${list}`).then((response) => {
        // console.log('response: ', response.data);
        this[`${list}List`] = response.data;
      });
    },
    removeName(id, list) {
      if (list === 'user') {
        if (!confirm('確定要移除使用者嗎？')) {
          return;
        }
      }
      const vm = this;
      this.axios.delete(`${process.env.API}/api/admin/${list}/${id}`).then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          vm.getList(list);
        } else {
          alert(response.data.message);
        }
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

<style scoped lang="scss" src="../sass/admin.scss">
</style>
