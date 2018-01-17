<template>
  <div class="wrapper mid">
    <div class="container">
      <div class="signIn" v-show="IsSignUp">
        <div class="form-group">
          <label for="account">帐号：</label>
          <input type="text" name="account" id="account">
        </div>
        <div class="form-group">
          <label for="password">密码：</label>
          <input type="password" name="password" id="password">
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
              <button type="button" class="btn btnSignUp" @click="clickSignUp(false)">注册</button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btnSignIn">登录</button>
            </div>
          </div>
        </div>
      </div>
      <div class="signUp" v-show="!IsSignUp">
        <div class="form-group">
          <label for="signUp-account">帐号：</label>
          <input type="text" name="account" id="signUp-account">
        </div>
        <div class="form-group">
          <label for="signUp-password">密码：</label>
          <input type="password" name="signUp-password" id="signUp-password">
        </div>
        <div class="form-group">
          <label for="confirm-password">确认密码：</label>
          <input type="password" name="confirm-password" id="confirm-password">
        </div>
        <div class="btn-group">
          <div class="row">
            <div class="col-6">
              <button type="button" class="btn btnSignUp" @click="signUpAccount">注册</button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btnSignIn" @click="clickSignUp(true)">返回</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Trianglify from "trianglify";
export default {
  data() {
    return {
      IsSignUp: true,
      IsRmeberUser: false,
      SignInInfo: {
        Account: "",
        Password: ""
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
    document.body.appendChild(pattern.canvas());
  },
  methods: {
    clickSignUp(val) {
      this.IsSignUp = val;
    },
    signUpAccount() {}
  }
};
</script>

<style scoped>
.wrapper {
  /* background-color: #bafce6; */
  border-radius: 6px;
  width: 380px;
  height: 280px;
  border: 2px solid #62dfed;
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
