<template>
  <div class="container">
    <Header :Title="Title"></Header>
    <!-- <div class="row">
        <div class="col-12">
          <input type="file" name="avatar" id="avatar" accept="image/*" required class="hidden-avatar">
          <img class="avatar" :src=AvatarUrl alt="avatar" srcset="">
        </div>
      </div> -->
    <!-- <div class="form-group avatar-goroup">
          <label for="avatar">头像 <i class="icon iconfont icon-touxiang"></i></label>
          <input type="file" name="avatar" id="avatar" accept="image/*" required class="hidden-avatar">
          <img class="avatar" :src=AvatarUrl alt="avatar" srcset="">
        </div> -->

    <div class="form-group">
      <label for="name">姓名
        <i class="icon iconfont icon-xingming"></i>
      </label>
      <input type="text" name="name" id="name" v-model="CurrentUser.Name" required>
    </div>
    <!-- <div class="form-group">
        <label for="password">密码
          <i class="icon iconfont icon-mima"></i>
        </label>
        <input type="password" name="password" id="password" v-model="CurrentUser.Password" required>
      </div> -->
    <div class="form-group">
      <label for="email">邮箱
        <i class="icon iconfont icon-youxiang"></i>
      </label>
      <input type="text" name="email" id="email" v-model="CurrentUser.Email">
    </div>
    <div class="form-group">
      <label for="phone">电话
        <i class="icon iconfont icon-dianhua"></i>
      </label>
      <input type="text" name="email" id="phone" v-model="CurrentUser.Phone">
    </div>
    <!-- <div class="form-group">
        <label for="birthday">生日
          <i class="icon iconfont icon-shengri"></i>
        </label>
        <input type="date" name="birthday" id="birthday" v-model="User.Birthday">
      </div> -->
    <div class="row save">
      <div class="col-12 finish">
        <button class="btn btn-primary btn-finish" @click="saveUser">完成</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
import { mapState, mapActions } from "vuex";
import Header from "@/components/Header";
export default {
  data() {
    return {
      Title: "修改信息",
      CurrentUser: {}
    };
  },
  created() {
    //   this.CurrentUser = _.cloneDeep(this.$store.state.user.currentUser);
    this.CurrentUser = Object.assign({}, this.$store.state.user.currentUser);
  },
  computed: {
    //   ...mapState({
    //     CurrentUser: state => state.user.currentUser,
    //     AvatarUrl: state =>
    //       state.user.currentUser.AvatarUrl || "./static/img/avatar.jpg"
    //   })
    //   this.CurrentUser = this.$store.state.user.currenUser;
  },
  methods: {
    async saveUser() {
      Indicator.open("正在保存, 请稍等...");

      let curUser = Object.assign({}, this.$store.state.user.currentUser);
      curUser.Name = this.CurrentUser.Name;
      curUser.Email = this.CurrentUser.Email;
      curUser.Phone = this.CurrentUser.Phone;
      await this.userSetting(curUser).then(() => {
        // this.$router.go(-1);
      });
    },
    ...mapActions({
      userSetting: "userSetting"
    })
  },
  beforeDestroy() {
    Indicator.close();
  },
  components: {
    Header
  }
};
</script>

<style scoped>
.form-group {
  margin-top: 10px;
  font: 1em;
  border-bottom: 1px solid #bfbfbf;
}

.avatar-goroup {
  height: 40px;
  position: relative;
}

.form-group > label {
  position: absolute;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  min-width: 40px;
  margin-left: 6px;
  text-align: right;
  box-sizing: border-box;
}

.form-group input {
  display: block;
  width: 100%;
  height: 40px;
  border: 1px solid transparent;
  /* border-radius: 5px; */
  padding-left: 60px;
  box-sizing: border-box;
  background-color: transparent;
}

.iconfont {
  font-size: 1.2em !important;
}

.finish {
  text-align: right;
}

.btn-finish {
  width: 4rem;
  height: 32px;
  /* line-height: 40px; */
  border: 1px solid #a1a2a5;
  border-radius: 1px;
  text-align: center;
  background-color: #ffffff;
  color: #585858;
}

.hidden-avatar {
  opacity: 0;
}

.avatar {
  position: absolute;
  top: -12px;
  right: 0;
  max-width: 5em;
  height: 5em;
  width: 5em;
  border-radius: 50%;
  /* transform: translate(-50%, -50%); */
  /* float: right; */
  z-index: -99;
}

.save {
  margin-top: 20px;
}
</style>
