<template>
  <Layout>
    <div class="header">
      <img class="avatar" src="../../assets/image/avatar.jpg" alt="avatar" srcset="">
    </div>
    <div class="total">
      <div class="col-6 income">
        <p>当月收入</p>
        <p>2345</p>
      </div>
      <div class="col-6 expend">
        <p>当月支出</p>
        <p>5678</p>
      </div>
    </div>
    <div class="container">
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="Loading" infinite-scroll-distance="10">
        <li v-for="item in AccountList" :key="item.Date">
          <div class="row">
            <div class="col-6 day-left">
              <span class="day">{{item.Date.substr(5)}}</span>
            </div>
            <div class="mid-day-total"></div>
            <div class="col-6 day-right">
              <span class="day">{{item.DateAmount}}</span>
            </div>
          </div>
          <template v-for="record in item.AccountRecords">
            <div v-if="record.Type == 0" class="row" :key="record.Id">
              <div class="col-6 left">
                <span class="amount">{{record.Amount}}</span>
                <span class="type-name">{{record.TypeName}}</span>
              </div>
              <i :class="'mid iconfont icon-'+record.TypeCode"></i>
              <div class="col-6 right"></div>
            </div>
            <div v-if="record.Type == 1" class="row" :key="record.Id">
              <div class="col-6 left"></div>
              <i :class="'mid iconfont icon-'+record.TypeCode"></i>
              <div class="col-6 right">
                <span class="type-name">{{record.TypeName}}</span>
                <span class="amount">{{record.Amount}}</span>
              </div>
            </div>
          </template>
        </li>
      </ul>

    </div>
    <router-link class="fix-add" to="/Account/Add">+</router-link>
  </Layout>
</template>
<script>
import Layout from "@/components/Layout";
import { Indicator, Toast } from "mint-ui";
import Rk from "@/api/rk-api";
import { mapActions, mapState } from "vuex";
let _self;
export default {
  data() {
    return {
      // AccountList: [],
      // Loading: false,
      PageIndex: 1,
      PageSize: 10
    };
  },
  created() {
    _self = this;
    // _self.loadMore();
  },
  computed: {
    ...mapState({
      AccountList: state => state.accountRecords.accountList,
      Loading: state => state.accountRecords.isLoading
    })
  },
  mounted() {
    console.log(this.AccountList);
    console.log(this.Loading);
  },
  methods: {
    async loadMore() {
      if (this.Loading) {
        return;
      }
      // if (this.Loading == true) return;
      // if (this.PageIndex > 3) {
      //   return false;
      // }
      // this.Loading = true;
      // this.$store
      //   .dispatch("getAccountRecords", {
      //     PageIndex: this.PageIndex,
      //     PageSize: this.PageSize,
      //     UserId: this.$store.state.user.cuerentUser.Id
      //   })
      //   .then(() => {
      //     this.PageIndex = this.PageIndex + 1;
      //     this.Loading = false;
      //   });
      await this.getAccountRecords({
        PageIndex: this.PageIndex,
        PageSize: this.PageSize,
        UserId: this.$store.state.user.cuerentUser.Id
      });
      // Rk.Account.getAccountRecords({
      //   PageIndex: this.PageIndex,
      //   PageSize: this.PageSize,
      //   UserId: this.$store.state.user.cuerentUser.Id
      // })
      //   .then(response => {
      //     let res = response.data;
      //     if (res.IsSuccess) {
      //       res.Data.forEach(m => {
      //         let currentDateIndex = this.AccountList.findIndex(
      //           item => item.Date == m.Date
      //         );
      //         if (currentDateIndex == -1) {
      //           this.AccountList.push(m);
      //           let totalExpendAmount = 0.0;
      //           this.AccountList[
      //             this.AccountList.length - 1
      //           ].AccountRecords.filter(item => item.Type == 1).forEach(
      //             item => {
      //               totalExpendAmount = (
      //                 totalExpendAmount + parseFloat(item.Amount)
      //               ).toFixed(2);
      //             }
      //           );
      //           this.AccountList[
      //             this.AccountList.length - 1
      //           ].TotalExpendAmount = totalExpendAmount;
      //         } else {
      //           this.AccountList[currentDateIndex].AccountRecords.push(
      //             m.AccountRecords
      //           );
      //         }
      //       });
      //       this.PageIndex = this.PageIndex + 1;
      //       this.Loading = false;
      //     }
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },
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
  height: 3em;
  /* background-color: #caf7cd; */
  line-height: 3em;
  border-right: 1px solid #a1a2a5;
  padding-right: 26px;
  text-align: right;
  color: #596161;
}

.right {
  height: 3em;
  /* background-color: #738de2; */
  border-left: 1px solid #a1a2a5;
  line-height: 3em;
  padding-left: 26px;
  color: #596161;
}
.type-name {
  font-size: 16px;
  color: #8b8989;
}
.amount {
  font-size: 14px;
  color: #8b8989;
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
  font-size: 24px;
  z-index: 99;
  background-color: #ffffff;
  line-height: 20px;
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
  width: 1.8em;
  height: 1.8em;
  border-radius: 50%;
  color: #ffffff;
  text-align: center;
  font-size: 1.8em;
  line-height: 1.8em;
  text-decoration: none;
  z-index: 99;
}
</style>
