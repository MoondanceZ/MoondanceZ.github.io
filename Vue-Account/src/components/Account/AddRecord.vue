<template>
    <div class="container">
        <div class="row add-header">
            <router-link class="close" to="/Account/List"></router-link>
            <div class="col-6 add-income active">收入</div>
            <div class="col-6 add-expend">支出</div>
        </div>
        <div class="row add-type">
            <div class="col-2">
                <i :class="'selectedType icon iconfont icon-' + SelectedType"></i>
            </div>
            <div class="col-2 type-info">
                {{SelectedTypeName}}
            </div>
            <div class="col-8 type-amount">
                {{Amount.Value}}
            </div>
        </div>
        <div class="row">
            <div v-for="item in AccountTypeList" :key="item.Code" class="col-2 type-icon-list-icon" @click="selectType(item.Code, item.Name)">
                <i :class="'icon iconfont icon-' + item.Code"></i>
                <p>{{item.Name}}</p>
            </div>
        </div>
        <Calculator :Amount="Amount"></Calculator>
    </div>
</template>

<script>
import Calculator from "@/components/account/Calculator";
let _self;
export default {
  data() {
    return {
      AccountTypeList: [],
      SelectedType: "yiban",
      SelectedTypeName: "一般",
      Type: 1, //0:支出，1：收入
      Amount: { Value: "0.00" }  //JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态
    };
  },
  created() {
    _self = this;
    _self.getAccountTypeList();
  },
  methods: {
    getAccountTypeList() {
      _self.axios
        .get("http://localhost:3000/AccountType")
        .then(response => {
          this.AccountTypeList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectType(type, name) {
      this.SelectedType = type;
      this.SelectedTypeName = name;
    },
    showAmount(val) {
      this.Amount = val;
    }
  },
  components: {
    Calculator
  }
};
</script>

<style scoped>
.close {
  position: absolute;
  display: inline-block;
  width: 24px;
  height: 24px;
  overflow: hidden;
  top: 8px;
  left: 12px;
  z-index: 99;
}

.close::after,
.close::before {
  content: "";
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: #a1a2a5;
  top: 50%;
  left: 0;
  margin-top: -1px;
}

.close::after {
  transform: rotate(45deg);
}

.close::before {
  transform: rotate(-45deg);
}

.add-header {
  padding-top: 8px 0;
  margin-bottom: 4px;
  height: 36px;
}

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