<template>
  <div class="container">
    <scroller style="top: 72px;" :on-infinite="infinite" ref="scrollerBottom">
      <transition-group name="records">
        <div v-for="(item, index1) in AccountList" :key="item.Date">
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
              <div class="col-6 left">
                <router-link :to="{ name: 'editAccount', params: {index1: index1, index2: index2, type: record.Type} }" class="link">
                  <span class="amount">{{record.Amount}}</span>
                  <span class="type-name">{{record.TypeName}}</span>
                </router-link>
              </div>
              <i :class="'mid icon iconfont icon-'+record.TypeCode"></i>
              <div class="col-6 right"></div>
            </div>
            <div v-if="record.Type == 1" class="row" :key="record.Id">
              <div class="col-6 left"></div>
              <i :class="'mid icon iconfont icon-'+record.TypeCode"></i>
              <div class="col-6 right">
                <router-link :to="{ name: 'editAccount', params: {index1: index1, index2: index2, type: record.Type} }" class="link">
                  <span class="type-name">{{record.TypeName}}</span>
                  <span class="amount">{{record.Amount}}</span>
                </router-link>
              </div>
            </div>
          </template>
        </div>
      </transition-group>
      <!-- <li v-show="IsLoading">
        <div class="row loading-mid">
          <div class="col-12">
            <mt-spinner class="mid" type="double-bounce"></mt-spinner>
          </div>
        </div>
      </li> -->
      <div v-show="AllLoaded" class="row allLoad">
        
      </div>
    </scroller>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState
  } from "vuex";
  let _self;
  export default {
    created() {
      _self = this;
      _self.getAccountRecords();
    },
    computed: {
      ...mapState({
        AccountList: state => state.accountRecords.accountList,
        AllLoaded: state => state.accountRecords.allLoaded
      })
    },
    methods: {
      infinite: done => {
        _self.getAccountRecords().then(() => {
          done();
        });
      },
      ...mapActions({
        getAccountRecords: "getAccountRecords"
      })
    }
  };

</script>

<style scoped>
  .container {
    /* top: 72px;  */
    /* padding-bottom: 30px; */
    flex: 1 1 100%;
    /* overflow: auto; */
    -webkit-overflow-scrolling: touch;
  }

  /* .wrapper-item {
    padding-top: 72px;
  } */

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

  .container::-webkit-scrollbar {
    display: none;
  }

  .link {
    display: inline-block;
    height: 4em;
    line-height: 4em;
    user-select: none;
    -webkit-user-select: none;
    text-decoration: none;
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

  .loading-mid {
    height: 28px;
    padding: 20px 0;
  }

  .loading-mid .mid {
    border-radius: 50%;
    background-color: transparent;
  }

  .allLoad {
    height: 80px;
  }

  .records-enter-active,
  .records-leave-active {
    transition: all .5s;
  }

  .records-enter,
  .records-leave-to {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }

</style>
