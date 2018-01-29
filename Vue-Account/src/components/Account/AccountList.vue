<template>
  <transition name="slide-back">
  <Layout>
    <div class="header">
      <img class="avatar" src="../../assets/image/avatar.jpg" alt="avatar" srcset="">
    </div>
    <div class="total">
      <div class="col-6 income">
        <p>本月收入</p>
        <p>{{MonthIncome}}</p>
      </div>
      <div class="col-6 expend">
        <p>本月支出</p>
        <p>{{MonthExpend}}</p>
      </div>
    </div>
    <div class="container">
      <ul v-infinite-scroll="getAccountRecords" infinite-scroll-disabled="IsLoading" infinite-scroll-distance="0">
        <li v-for="(item, index1) in AccountList" :key="item.Date">
          <div class="row">
            <div class="col-6 day-left">
              <span class="day">{{item.Date}}</span>
            </div>
            <div class="mid-day-total"></div>
            <div class="col-6 day-right">
              <span class="day">{{item.DateAmount}}</span>
            </div>
          </div>
          <template v-for="(record, index2) in item.AccountRecords">
              <div v-if="record.Type == 0" class="row" :key="record.Id">
                <router-link :to="{ name: 'addAccount', params: {index1: index1, index2: index2} }">
                  <div class="col-6 left">
                    <span class="amount">{{record.Amount}}</span>
                    <span class="type-name">{{record.TypeName}}</span>
                  </div>
                  <i :class="'mid icon iconfont icon-'+record.TypeCode"></i>
                </router-link>
                <div class="col-6 right"></div>
              </div>
              <div v-if="record.Type == 1" class="row" :key="record.Id">
                <div class="col-6 left"></div>
                <router-link :to="{ name: 'addAccount', params: {index1: index1, index2: index2} }">
                  <i :class="'mid icon iconfont icon-'+record.TypeCode"></i>
                  <div class="col-6 right">
                    <span class="type-name">{{record.TypeName}}</span>
                    <span class="amount">{{record.Amount}}</span>
                  </div>
                </router-link>
              </div>
          </template>
        </li>
        <li>
          <div v-show="IsLoading" class="row loading-mid">
            <div class="col-12">
              <mt-spinner class="mid" type="double-bounce"></mt-spinner>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <router-link class="fix-add" to="/Account/Add">+</router-link>
  </Layout>
  </transition>
</template>
<script>
import Layout from "@/components/Layout";
import { Indicator, Toast } from "mint-ui";
import Rk from "@/api/rk-api";
import { mapActions, mapState } from "vuex";
let _self;
export default {
  computed: {
    ...mapState({
      AccountList: state => state.accountRecords.accountList,
      IsLoading: state => state.accountRecords.isLoading,
      MonthIncome: state => state.accountRecords.monthIncome,
      MonthExpend: state => state.accountRecords.monthExpend
    })
  },
  methods: {
    ...mapActions({
      getAccountRecords: "getAccountRecords"
    })
  },
  components: {
    Layout
  }
};
</script>
<style scoped>
.header {
  /* background-image:  */
  background-color: #62dfed;
  height: 3em;
  /* margin-bottom: 23px; */
  position: relative;
}

.total {
  height: 23px;
}

.income > p,
.expend > p {
  margin: 0;
  padding: 0;
  color: #8b8989;
}

.income > p:first-child,
.expend > p:first-child {
  font-size: 12px;
}

.expend > p {
  text-align: right;
}

.avatar {
  position: absolute;
  top: 100%;
  left: 50%;
  max-width: 4em;
  height: auto;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.left {
  height: 4em;
  /* background-color: #caf7cd; */
  line-height: 4em;
  border-right: 1px solid #a1a2a5;
  padding-right: 26px;
  text-align: right;
  color: #596161;
}

.right {
  height: 4em;
  /* background-color: #738de2; */
  border-left: 1px solid #a1a2a5;
  line-height: 4em;
  padding-left: 26px;
  color: #596161;
}

.type-name {
  font-size: 1.6em;
  color: #8b8989;
}

.amount {
  font-size: 1.2em;
  color: #8b8989;
  padding-left: 10px;
}

.day-left,
.day-right {
  height: 20px;
  line-height: 20px;
}

.day-left {
  text-align: right;
  border-right: 1px solid #a1a2a5;
}

.day-right {
  border-left: 1px solid #a1a2a5;
}

.day {
  font-size: 10px;
  color: #8b8989;
}

.mid {
  z-index: 99;
  background-color: #ffffff;
  line-height: 1em;
}

.mid-day-total {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #a1a2a5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}

.fix-add {
  display: block;
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #62dfed;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  color: #ffffff;
  text-align: center;
  font-size: 1.8em;
  line-height: 1.8em;
  text-decoration: none;
  z-index: 99;
}

.loading-mid {
  height: 28px;
  padding-top: 10px;
}
</style>
