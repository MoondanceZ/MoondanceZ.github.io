<template>
  <div>
    <transition name="slide-up" mode="out-in">
      <div class="container h100-p" v-show="!IsOpenTab">
        <Header :Title="Title"></Header>
        <div class="row">
          <div class="col-3">
            <img class="avatar" :src=AvatarUrl alt="avatar" srcset="">
          </div>
          <div class="col-6 ta-center">
            <p class="p-date">05月01日 - 05月17日</p>
            <p class="p-expend">当前日均消费12.00</p>
          </div>
          <div class="col-3 ta-center">
            <router-link to="/User/Setting" class="link">
              <span class="setting">修改信息</span>
              <i class="set-icon icon iconfont icon-xiugai"></i>
            </router-link>
          </div>
        </div>
        <div class="row computed">
          <div class="col-4">
            <p class="c-type">支出</p>
            <p class="c-amount">0.00</p>
          </div>
          <div class="col-4">
            <p class="c-type">收入</p>
            <p class="c-amount">0.00</p>
          </div>
          <div class="col-4">
            <p class="c-type">结余</p>
            <p class="c-amount">0.00</p>
          </div>
        </div>
        <div class="row compare ta-center">
          <div class="row">
            <span class="col-12 cp-title">上月同期支出对比Top3</span>
          </div>
          <div class="row">
            <div class="col-4 cp-row">
              <p class="cp-percent">0%</p>
              <p class="cp-type">-</p>
              <p class="cp-name">无数据</p>
              <p class="cp-amount">0.00</p>
            </div>
            <div class="col-4 cp-row">
              <p class="cp-percent">0%</p>
              <p class="cp-type">-</p>
              <p class="cp-name">无数据</p>
              <p class="cp-amount">0.00</p>
            </div>
            <div class="col-4 cp-row">
              <p class="cp-percent">0%</p>
              <p class="cp-type">-</p>
              <p class="cp-name">无数据</p>
              <p class="cp-amount">0.00</p>
            </div>
          </div>
        </div>
        <div class="row cp-expend">
          <div class="col-12">
            <span class="cp-expend-title">当月支出</span>
            <span class="cp-expend-amount">0.00</span>
          </div>
          <div class="col-12">
            <span class="cp-expend-title">上月同期</span>
            <span class="cp-expend-amount">0.00</span>
          </div>
        </div>
        <Footer @openTab="openTab"></Footer>
      </div>
    </transition>

    <component class="h100-p" v-show="IsOpenTab" :is="OpenTabComponent" @closeTab="closeTab"></component>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header";
import Footer from "@/components/User/Footer";
import Budget from "@/components/User/Budget";
import Collect from "@/components/User/Collect";
import Income from "@/components/User/Income";
import Expend from "@/components/User/Expend";
export default {
  data() {
    return {
      Title: "个人信息",
      OpenTabComponent: "",
      IsOpenTab: false
    };
  },
  methods: {
    openTab(val) {
      this.IsOpenTab = true;
      this.OpenTabComponent = val;
    },
    closeTab() {
      this.IsOpenTab = false;
    }
  },
  computed: {
    ...mapState({
      AvatarUrl: state =>
        state.user.currentUser.AvatarUrl || "./static/img/avatar.jpg"
    })
  },
  components: {
    Header,
    Footer,
    Budget,
    Collect,
    Expend,
    Income
  }
};
</script>

<style scoped>
.link {
  user-select: none;
  -webkit-user-select: none;
  text-decoration: none;
}

.avatar {
  /* position: absolute;
  top: 100%;
  left: 50%; */
  max-width: 4em;
  height: 4em;
  width: 4em;
  border-radius: 50%;
  /* transform: translate(-50%, -50%); */
}

.computed {
  text-align: center;
  background-color: #f5f0e9;
  border: 1px solid #e0dede;
  border-left: 0px;
  border-right: 0px;
}

.p-date {
  font-size: 1.2em;
  color: #616060;
}

.p-expend {
  font-size: 0.8em;
  color: #8b8989;
}

.c-type {
  font-size: 1.4em;
  color: #8b8989;
}

.c-amount {
  font-size: 1.2em;
  color: #8b8989;
}

.setting {
  font-size: 1.2em;
  color: #8b8989;
}

.set-icon {
  font-size: 1.2em !important;
  color: #8b8989;
}

.compare {
  margin-top: 40px;
}

.cp-title {
  font-size: 1.4em;
  color: #616060;
}

.cp-row {
  color: #8b8989;
  font-size: 1.2em;
}

.cp-expend {
  border-top: 1px solid #e0dede;
  padding-top: 15px;
  margin-top: 40px;
  color: #8b8989;
  font-size: 1.2em;
}

.cp-expend-title {
  float: left;
}

.cp-expend-amount {
  float: right;
}

.tab {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
