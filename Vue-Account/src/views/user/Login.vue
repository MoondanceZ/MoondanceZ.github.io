<template>
  <div>
    <div class="wrapper">
      <div class="container">
        <transition name="flipOutY" mode="out-in">
          <div class="signIn" v-if="!IsSignUp" key="signIn">
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
                <input type="checkbox" name="remeberUser" id="remeberUser" v-model="IsRmeberUser">
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
            <div class="btn-group">
              <div class="row">
                <div class="col-6">
                  <div class="qqlogin" @click="qqLogin">
                    <i class="selectedType icon iconfont icon-qq"></i>
                  </div>
                </div>
                <div class="col-6">
                  <div class="weibologin">
                    <i class="selectedType icon iconfont icon-weibo"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="signUp" v-if="IsSignUp" key="signUp">
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
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapActions
  } from "vuex";
  import Trianglify from "trianglify";
  import {
    Indicator,
    Toast
  } from "mint-ui";
  import Rk from "@/api/rk-api";
  export default {
    data() {
      return {
        IsSignUp: false,
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
      let sessionUser = sessionStorage.getItem("User");
      let sessionToken = sessionStorage.getItem("Token");

      if (sessionUser && sessionToken) {
        let user = JSON.parse(sessionUser);
        let token = JSON.parse(sessionToken);
        this.$store.commit("SET_CURRENT_USER", user);
        this.$store.commit("SET_TOKEN", token);
        this.$store.commit("SET_IS_LOGIN", true);
        this.$router.push("/Account/List");
      }
      let pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight
      });
      // document.body.appendChild(pattern.canvas()); 会有跟body高度不一样的bug
      document.body.style.background = "url(" + pattern.png() + ")";
    },
    created() {
      this.SignInInfo.Account = localStorage.getItem("rk-account");
      this.SignInInfo.Password = localStorage.getItem("rk-password");
      if (
        this.SignInInfo.Account &&
        this.SignInInfo.Password &&
        this.SignInInfo.Account.length > 0 &&
        this.SignInInfo.Password.length > 0
      ) {
        this.IsRmeberUser = true;
      }
    },
    beforeDestroy() {
      document.body.style.background = "";
      Indicator.close();
    },
    methods: {
      qqLogin() {
        window.location.href = window.location.href.split("//")[0] + "//" + window.location.host + "/Connect/QQ_Login";
      },

      switchSignUp(val) {
        this.IsSignUp = val;
      },
      async signUpAccount() {
        if (!this.IsSignUp) return;

        if (!this.SignUpInfo.Account) {
          Toast("请输入帐号");
          return;
        }
        if (!this.SignUpInfo.Password.length) {
          Toast("请输入密码");
          return;
        }
        if (this.SignUpInfo.Password != this.SignUpInfo.ConfirmPassword) {
          Toast("请输入相同密码");
          return;
        }
        Indicator.open({
          text: "正在注册, 请稍等..."
        });
        await this.signUp({
          Account: this.SignUpInfo.Account,
          Password: this.SignUpInfo.Password
        }).then(() => {
          // this.$router.push("/Account/List");
        });
      },
      async signInAccount() {
        if (this.IsSignUp) return;
        // Toast('提示信息');
        if (!this.SignInInfo.Account) {
          Toast("请输入帐号");
          return;
        }
        if (!this.SignInInfo.Password) {
          Toast("请输入密码");
          return;
        }
        Indicator.open({
          text: "登录中..."
        });

        await this.signIn(this.SignInInfo, this.$router).then(() => {
          if (this.IsRmeberUser) {
            localStorage.setItem("rk-account", this.SignInInfo.Account);
            localStorage.setItem("rk-password", this.SignInInfo.Password);
          } else {
            localStorage.setItem("rk-account", "");
            localStorage.setItem("rk-password", "");
          }
          // this.$router.push("/Account/List");
        });
      },
      ...mapActions({
        signIn: "userSignIn",
        signUp: "userSignUp"
      })
    }
  };

</script>

<style scoped>
  .child-view {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wrapper {
    width: 380px;
    height: 280px !important;
    border: 2px solid #bfbfbf;
    background: hsla(0, 0%, 100%, 0.25) border-box !important;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
    0 0.5em 1em rgba(0, 0, 0, 0.6);
  }

  .wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -30px;
    /*为了让边缘不出现逐渐消退的效果，需要让伪元素 相对其宿主元素的尺寸再向 外扩大 至少 20px （即它的模糊半径）。由于不同浏览器的模糊算法可能存在差异， 用一个更大的绝对值（比 如 -30px ）会更保险一些。*/
    z-index: -1;
    /*把伪元素移动到宿主元素后面*/
    -webkit-filter: blur(20px);
    /*设置伪元素模糊效果*/
    filter: blur(20px);
  }

  /* .signIn, .signUp{
  float: left;
} */

  /* .signUp{
  margin-top: -210px; 
}  */

  .form-group,
  .btn-group {
    width: 100%;
    height: 42px;
    position: relative;
    margin-top: 15px;
    color: #525252;
  }

  div.form-group>label {
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
    /* border-radius: 5px; */
    padding-left: 50px;
    box-sizing: border-box;
    background-color: transparent;
  }

  .qqlogin {
    float: right;
  }

  .qqlogin,
  .weibologin {
    width: 36px;
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
    border-radius: 1px;
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

  /* .flipOutY-enter-active, */

  .flipOutY-leave-active {
    animation: flipOutY 0.5s;
  }

  /* .flipOutY-enter,
.flipOutY-leave-to {
  animation: flipOutY .5s;
} */

  @keyframes flipOutY {
    from {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }

    30% {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      opacity: 1;
    }

    to {
      -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      opacity: 0;
    }
  }

</style>
