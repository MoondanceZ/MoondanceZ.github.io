<template>
  <div class="wrapper mid">
    <div class="container">
      <div class="signIn" v-show="!IsSignUp">
        <div class="form-group">
          <label for="account">帐号：</label>
          <input type="text" name="account" id="account" v-model="SignInInfo.Account" required>
        </div>
        <div class="form-group">
          <label for="password">密码：</label>
          <input type="password" name="password" id="password" v-model="SignInInfo.Password" required>
        </div>
        <div class="setting-group">
          <span class="remember">
            <input type="checkbox" name="remeberUser" id="remeberUser">
            <label for="remeberUser" class="remeberUser">记住账号</label>
          </span>
          <span class="forgetPwd">忘记密码?</span>
        </div>
        <div class="btn-group">
          <div class="row">
            <div class="col-6">
              <button type="button" class="btn btnSignUp" @click="switchSignUp(true)">注册</button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btnSignIn" @click="signInAccount">登录</button>
            </div>
          </div>
        </div>
      </div>
      <div class="signUp" v-show="IsSignUp">
        <div class="form-group">
          <label for="signUp-account">帐号：</label>
          <input type="text" name="account" id="signUp-account" v-model="SignUpInfo.Account" min-length="4" maxlength="12">
        </div>
        <div class="form-group">
          <label for="signUp-password">密码：</label>
          <input type="password" name="signUp-password" id="signUp-password" v-model="SignUpInfo.Password" minlength="6" maxlength="12">
        </div>
        <div class="form-group">
          <label for="confirm-password">确认密码：</label>
          <input type="password" name="confirm-password" id="confirm-password" v-model="SignUpInfo.ConfirmPassword" minlength="6" maxlength="12">
        </div>
        <div class="btn-group">
          <div class="row">
            <div class="col-6">
              <button type="button" class="btn btnSignUp" @click="signUpAccount">注册</button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btnSignIn" @click="switchSignUp(false)">返回</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Trianglify from "trianglify";
import Rk from "@/api/rk-api";
export default {
  data() {
    return {
      IsSignUp: false,
      IsRmeberUser: false,
      SignInInfo: {
        UserId: "",
        Account: "qqq",
        Password: "5392"
      },
      SignUpInfo: {
        Account: "",
        Password: "",
        ConfirmPassword: ""
      }
    };
  },
  beforeCreate() {
    var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
    });
    // document.body.appendChild(pattern.canvas()); 会有跟body高度不一样的bug
    document.body.style.background = "url(" + pattern.png() + ")";
  },
  beforeDestroy() {
    document.body.style.background = "";
  },
  methods: {
    switchSignUp(val) {
      this.IsSignUp = val;
    },
    signUpAccount() {
      if (!this.IsSignUp) return;

      if (this.SignUpInfo.Account.length === 0) {
        this.$layer.msg("请输入帐号");
        return;
      }
      if (this.SignUpInfo.Password.length === 0) {
        this.$layer.msg("请输入密码");
        return;
      }
      if (this.SignUpInfo.Password != this.SignUpInfo.ConfirmPassword) {
        this.$layer.tips("请输入相同密码");
        return;
      }
      Rk.User.signUp({
        Account: this.SignUpInfo.Account,
        Password: this.SignUpInfo.Password
      })
        .then(response => {
          var res = response.data;
          if (res.IsSuccess) {
            this.SignInInfo.Account = this.SignUpInfo.Account;
            this.SignInInfo.Password = this.SignUpInfo.Password;
            this.switchSignUp(false);
            this.signInAccount();
          } else {
            this.$layer.msg(res.Message);
          }
        })
        .catch(error => {
          console.log(error);
          this.$layer.msg("操作异常");
        });
    },
    signInAccount() {
      if (this.IsSignUp) return;

      if (this.SignInInfo.Account.length === 0) {
        this.$layer.msg("请输入帐号");
        return;
      }
      if (this.SignInInfo.Password.length === 0) {
        this.$layer.msg("请输入密码");
        return;
      }

      var data = {
        grant_type: "password",
        client_id: "pwd_client",
        client_secret: "pwd_secret",
        scope: "rk offline_access",
        username: this.SignInInfo.Account,
        password: this.SignInInfo.Password
      };
      this.sigin({
        tokenRequest: data,
        account: this.SignInInfo.Account
      }).then(() => {
        console.log(this.IsSignUp);

        console.log(sessionStorage.getItem("access_token"));
        this.$router.push("/Account/List");
      });
      // console.log(this.IsSignUp);

      // console.log(sessionStorage.getItem("access_token"));
      // this.$router.push("/Account/List");

      // Rk.User.getToken(data)
      //   .then(response => {
      //     console.log(response.data);
      //     var res = response.data;
      //     sessionStorage.setItem("access_token", res.access_token);
      //     sessionStorage.setItem("refresh_token", res.refresh_token);
      //     sessionStorage.setItem("token_type", res.token_type);

      //     Rk.User.signIn(this.SignInInfo.Account) //重新去拉取用户信息
      //       .then(response => {
      //         //TODO:保存用户信息
      //         this.$router.push("/Account/List");
      //       })
      //       .catch(error => {
      //         console.log(error);
      //         this.$layer.msg("登录异常");
      //       });
      //   })
      //   .catch(error => {
      //     console.log("getToken error: " + error);
      //     this.$layer.msg("帐号或密码不正确");
      //   });
    },
    ...mapActions({
      sigin: "userSignIn"
    })
  }
};
</script>

<style scoped>
.wrapper {
  border-radius: 6px;
  width: 380px;
  height: 280px;
  border: 2px solid rgba(43, 65, 69, 0.219);
}

.form-group,
.btn-group {
  width: 100%;
  height: 42px;
  position: relative;
  margin-top: 15px;
  color: #525252;
}

div.form-group > label {
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
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  padding-left: 50px;
  box-sizing: border-box;
}

#confirm-password {
  padding-left: 70px;
}

.setting-group {
  height: 30px;
  font-size: 1.1em;
  line-height: 1.2em;
  color: #7e7e7e;
  margin-top: 8px;
}

.setting-group input[type="checkbox"] {
  width: 15px;
  height: 15px;
  position: absolute;
}

.forgetPwd {
  float: right;
}

.remember label {
  padding-left: 18px;
}

input:focus,
button:focus {
  outline: none;
}

.btn {
  width: 6rem;
  height: 40px;
  /* line-height: 40px; */
  border: 1px solid #303439;
  border-radius: 8px;
  text-align: center;
}

.btnSignUp {
  background: #fff;
  float: right;
}

.btnSignIn,
.btnReset {
  background: #303439;
  color: #fff;
}

.btn:nth-child(2) {
  margin-left: 10px;
}

@media screen and (max-width: 640px) {
  .wrapper {
    width: 90%;
  }
}
</style>
