<template>
  <div class="wrapper mid">
    <div class="container">
      <div class="signIn" v-show="IsSignUp">
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
              <button type="button" class="btn btnSignUp" @click="switchSignUp(false)">注册</button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btnSignIn" @click="signInAccount">登录</button>
            </div>
          </div>
        </div>
      </div>
      <div class="signUp" v-show="!IsSignUp">
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
              <button type="button" class="btn btnSignIn" @click="switchSignUp(true)">返回</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Trianglify from "trianglify";
import Rk from "@/api/rk-api";
export default {
  data() {
    return {
      IsSignUp: true,
      IsRmeberUser: false,
      SignInInfo: {
        UserId: "",
        Account: "",
        Password: ""
      },
      SignUpInfo: {
        Account: "",
        Password: "",
        ConfirmPassword: ""
      },
      Token: {}
    };
  },
  beforeCreate() {
    var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
    });
    document.body.appendChild(pattern.canvas());
  },
  methods: {
    switchSignUp(val) {
      this.IsSignUp = val;
    },
    signUpAccount() {
      if (this.SignUpInfo.Password != this.SignUpInfo.ConfirmPassword) {
        alert("请输入相同密码")
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
            alert(res.Message);
          }
        })
        .catch(error => {
          console.log(error);
          alert("操作异常");
        });
    },
    signInAccount() {
      this.getToken();
      Rk.User.signIn(1).then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
          alert("操作异常");
        });
    },
    getToken() {
      var data = {
        grant_type: "password",
        client_id: "pwd_client",
        client_secret: "pwd_secret",
        scope: "rk offline_access",
        username: this.SignInInfo.Account,
        password: this.SignInInfo.Password
      };
      Rk.User.getToken(data)
        .then(response => {
          this.Token = response.data;
          sessionStorage.setItem("access_token", this.Token.access_token);
          sessionStorage.setItem("refresh_token", this.Token.refresh_token);
          sessionStorage.setItem("token_type", this.Token.token_type);
          console.log(this.Token);
        })
        .catch(error => {
          console.log(error);
          alert("操作异常");
        });
    }
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
  line-height: 40px;
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
