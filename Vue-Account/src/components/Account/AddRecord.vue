<template>
  <div>
    <div v-show="RemarkNotOpen" class="container">
      <div class="row add-header">
        <router-link class="close" to="/Account/List"></router-link>
        <div :class="'col-6 add-income'+ IsIncome" @click="selectAccountType(0)">收入</div>
        <div :class="'col-6 add-expend'+ IsExpend" @click="selectAccountType(1)">支出</div>
      </div>
      <div class="row add-type">
        <div class="col-2">
          <i :class="'selectedType icon iconfont icon-' + SelectedType"></i>
        </div>
        <div class="col-2 type-info">
          {{SelectedTypeName}}
        </div>
        <div class="col-8 type-amount">
          {{Amount}}
        </div>
      </div>
      <div class="row">
        <div v-show="Type==0" v-for="item in AccountIncomeTypeList" :key="item.Code" class="col-2 type-icon-list-icon" @click="selectType(item.Code, item.Name)">
          <i :class="'icon iconfont icon-' + item.Code"></i>
          <p>{{item.Name}}</p>
        </div>
        <div v-show="Type==1" v-for="item in AccountExpendTypeList" :key="item.Code" class="col-2 type-icon-list-icon" @click="selectType(item.Code, item.Name)">
          <i :class="'icon iconfont icon-' + item.Code"></i>
          <p>{{item.Name}}</p>
        </div>
      </div>
      <Calculator :Amount="Amount" @showAmount="showAmount" @openRemark="showRemark"></Calculator>
    </div>
    <Remark v-show="!RemarkNotOpen" @closeRemark="closeRemark" @setRemarkInfo="getRemarkInfo"></Remark>
  </div>
</template>

<script>
import Calculator from "@/components/account/Calculator";
import Remark from "@/components/account/Remark";
import { getAccountTypes } from "@/api/rk-api";
let _self;
export default {
  data() {
    return {
      userId: 0,
      AccountTypeList: [],
      AccountIncomeTypeList: [],
      AccountExpendTypeList: [],
      SelectedType: "yiban",
      SelectedTypeName: "一般",
      Type: 1, //0:收入，1：支出
      Amount: "0.00", //传递到子组件
      RemarkNotOpen: true,
      RemarkInfo: ""
    };
  },
  created() {
    _self = this;
    _self.getAccountTypeList();
  },
  methods: {
    getAccountTypeList() {
      getAccountTypes({ userId: this.userId })
        .then(response => {
          var res = response.data;
          this.AccountIncomeTypeList = res.Data.filter(m => m.Type == 0);
          this.AccountExpendTypeList = res.Data.filter(m => m.Type == 1);
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectAccountType(type) {
      this.Type = type;
      this.SelectedType = this.Type == 0 ? "shouru" : "yiban"; //"shour"为收入的一般,"yiban"为支出的一般
      this.SelectedTypeName = "一般";
    },
    selectType(type, name) {
      this.SelectedType = type;
      this.SelectedTypeName = name;
    },
    showAmount(val) {
      //接收子组件数据
      this.Amount = val;
    },
    showRemark(val) {
      this.RemarkNotOpen = val;
    },
    closeRemark(val) {
      this.RemarkNotOpen = val;
    },
    getRemarkInfo(val) {
      this.RemarkInfo = val;
    }
  },
  computed: {
    IsIncome: function() {
      return this.Type == 0 ? " active" : "";
    },
    IsExpend: function() {
      return this.Type == 1 ? " active" : "";
    }
  },
  components: {
    Calculator,
    Remark
  }
};
</script>

<style scoped>
.add-income,
.add-expend {
  margin: 8px 0;
  font-size: 24px;
  height: 24px;
  line-height: 24px;
}

.add-income {
  text-align: right;
}

.active {
  color: #62dfed;
}

.add-type {
  text-align: center;
  height: 4em;
  background-color: #e5e5e5;
}

.selectedType {
  line-height: 1.4em;
}

.type-info,
.type-amount {
  color: #77787a;
  line-height: 46px;
  font-size: 1.6em;
}

.type-amount {
  text-align: right;
  padding-right: 30px;
  font-size: 2em;
}

.type-icon-list-icon {
  padding-top: 10px;
  text-align: center;
}

.iconfont {
  background-color: #e5e5e5;
}

.type-icon-list-icon .icon {
  margin: 0 auto;
  border-radius: 50%;
}

.type-icon-list-icon p {
  margin: 0;
  font-size: 1em;
  color: #77787a;
}
</style>
