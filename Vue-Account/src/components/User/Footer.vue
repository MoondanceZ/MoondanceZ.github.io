<template>
  <div class="container">
    <div class="row">
      <div class="col-3" v-for="item in Tabs" :key="item.Tab" @click="clickTab(item)">
        <i :class="'set-icon icon iconfont icon-' + item.Tab"></i>
        <p>{{item.TabName}}</p>
      </div>
      <!-- <div class="col-3">
        <i class="set-icon icon iconfont icon-yusuan"></i>
        <p>预算</p>
      </div>
      <div class="col-3">
        <i class="set-icon icon iconfont icon-huizong"></i>
        <p>汇总</p>
      </div>
      <div class="col-3">
        <i class="set-icon icon iconfont icon-income"></i>
        <p>收入</p>
      </div>
      <div class="col-3">
        <i class="set-icon icon iconfont icon-expend"></i>
        <p>支出</p>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Tabs: [{
            Tab: "yusuan",
            TabName: "预算",
            Component: "Budget"
          },
          {
            Tab: "huizong",
            TabName: "汇总",
            Component: "Collect"
          },
          {
            Tab: "income",
            TabName: "收入",
            Component: "Income"
          },
          {
            Tab: "expend",
            TabName: "支出",
            Component: "Expend"
          }
        ],
        CurrentTab: {}
      };
    },
    methods: {
      clickTab(item) {
        this.$emit("openTab", item.Component);
      }
    }
    // ,
    // watch: {
    //     CurrentTab: function(){
    //         console.log(this.CurrentTab);
    //         this.$emit("openTab", this.CurrentTab.Component);
    //     }
    // }
  };

</script>

<style scoped>
  .container {
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    width: 100%;
    border-top: 1px solid #e0dede;
  }

</style>
