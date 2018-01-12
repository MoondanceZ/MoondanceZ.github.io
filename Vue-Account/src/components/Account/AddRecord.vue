<template>
    <div class="container">
        <div class="row add-header">
            <router-link class="close" to="/Account/List"></router-link>
            <div class="col-6 add-income active">收入</div>
            <div class="col-6 add-expend">支出</div>
        </div>
        <div class="row add-type">
            <div class="col-2">
                <i :class="'icon iconfont icon-' + SelectedType"></i>
            </div>
            <div class="col-2 type-info">
                {{SelectedTypeName}}
            </div>
            <div class="col-8 type-amount">
                {{Amount}}
            </div>
        </div>
        <div class="row">
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-yiban"></i>
                <p>一般</p>
            </div>
            <div class="col-2 type-icon-list-icon" @click="selectType('liren', '丽人')">
                <i class="icon iconfont icon-liren"></i>
                <p>丽人</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-tushu"></i>
                <p>书籍</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-jiaotong"></i>
                <p>交通</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-zhufang"></i>
                <p>住房</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-yiliao"></i>
                <p>医疗</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-shuma"></i>
                <p>数码</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-lvxing"></i>
                <p>旅行</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-riyong"></i>
                <p>日用</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-fushi"></i>
                <p>服饰</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-shuiguo"></i>
                <p>水果</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-gouwu"></i>
                <p>网购</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-shicai"></i>
                <p>食材</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-chaoshi"></i>
                <p>超市</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-yundong"></i>
                <p>运动</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-tongxun"></i>
                <p>通讯</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-jiushui"></i>
                <p>酒水</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-lingshi"></i>
                <p>零食</p>
            </div>
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-yongcan"></i>
                <p>用餐</p>
            </div>
        </div>
        <div class="container calc">
            <div class="row calc-set">
                <div class="col-6">
                    <p class="calc-year">2017</p>
                    <p class="calc-date">1月30日</p>
                </div>
                <div class="col-6">
                    <p class="calc-remark">备注</p>
                </div>
            </div>
            <div class="row">
                <div class="col-3" @click="clickCalcNumber(1)">1</div>
                <div class="col-3" @click="clickCalcNumber(2)">2</div>
                <div class="col-3" @click="clickCalcNumber(3)">3</div>
                <div class="col-3" @click="clickCalcOperate('+')">+</div>
                <div class="col-3" @click="clickCalcNumber(4)">4</div>
                <div class="col-3" @click="clickCalcNumber(5)">5</div>
                <div class="col-3" @click="clickCalcNumber(6)">6</div>
                <div class="col-3" @click="clickCalcOperate('-')">-</div>
                <div class="col-9">
                    <div class="col-4" @click="clickCalcNumber(7)">7</div>
                    <div class="col-4" @click="clickCalcNumber(8)">8</div>
                    <div class="col-4" @click="clickCalcNumber(9)">9</div>
                    <div class="col-4 calc-clear" @click="clickCalcClear">清零</div>
                    <div class="col-4" @click="clickCalcNumber(0)">0</div>
                    <div class="col-4" @click="clickCalcDot">.</div>
                </div>
                <div class="col-3 calc-ok" @click="clickCalcOk">
                    OK
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      SelectedType: "yiban",
      SelectedTypeName: "一般",
      Type: 1, //0:支出，1：收入
      Integer: "", //记录整数部分
      Decimal: "", //记录小数部分
      Amount: "0.00", //显示金额
      SumAmount: "0.00", //计算后的金额
      OperatorType: "", //操作
      OkOperatorType: "", //点击Ok时候的操作
      HasDot: false //是否存在小数点
    };
  },
  methods: {
    clickCalcNumber(number) {
      if (this.OperatorType != "") {
        this.Amount = "0.00";
        this.Integer = "";
        this.Decimal = "";
      }

      if (this.HasDot) {
        if (this.Decimal.length < 2) {
          this.Decimal += number;
        }
        if (this.Integer == "") {
          this.Integer = "0";
        }
      } else {
        this.Integer += number;
      }
      var amountSplit = this.Amount.split(".");
      amountSplit[0] = this.Integer;
      if (this.Decimal.length == 1) {
        amountSplit[1] = this.Decimal + "0";
      } else if (this.Decimal.length == 2) {
        amountSplit[1] = this.Decimal;
      } else {
        amountSplit[1] = "00";
      }
      this.Amount = amountSplit[0] + "." + amountSplit[1];

      this.OperatorType = "";
    },
    clickCalcDot() {
      this.HasDot = true;
    },
    clickCalcClear() {
      this.Amount = "0.00";
      this.Integer = "";
      this.Decimal = "";
      this.SumAmount = "0.00";
      this.OperatorType = "";
      this.OkOperatorType = "";
      this.HasDot = false;
    },
    clickCalcOperate(type) {
      this.OkOperatorType = type;
      if (this.OperatorType == "") {
        if (type == "+") {
          this.OperatorType = "+";
          this.SumAmount = (parseFloat(this.SumAmount) + parseFloat(this.Amount)
          ).toFixed(2);
          this.Amount = this.SumAmount;
        } else if (type == "-") {
          this.OperatorType = "-";
          if (parseFloat(this.SumAmount) != 0) {
            this.SumAmount = (parseFloat(this.SumAmount) -
              parseFloat(this.Amount)
            ).toFixed(2);
            this.Amount = this.SumAmount;
          } else {
            this.SumAmount = this.Amount;
          }
        } else {
          this.OperatorType = "";
        }
        this.HasDot = false;
      }
    },
    clickCalcOk() {
      if (this.OperatorType != "") return;

      if (this.OkOperatorType != "") {
        if (this.OkOperatorType == "+") {
          this.Amount = (parseFloat(this.SumAmount) + parseFloat(this.Amount)
          ).toFixed(2);
          this.SumAmount = "0.00";
        } else if (this.OkOperatorType == "-") {
          if (parseFloat(this.SumAmount) != 0) {
            this.Amount = (parseFloat(this.SumAmount) - parseFloat(this.Amount)
            ).toFixed(2);
          }
          this.SumAmount = "0.00";
        }
        this.OkOperatorType = "";
        this.Integer = "";
        this.Decimal = "";
        this.HasDot = false;
        this.OperatorType = "";
      }
    },
    selectType(type, name) {
      this.SelectedType = type;
      this.SelectedTypeName = name;
    }
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

.type-info,
.type-amount {
  color: #77787a;
  line-height: 46px;
}

.type-amount {
  text-align: right;
  padding-right: 30px;
}

.type-icon-list-icon {
  padding-top: 10px;
  text-align: center;
}
.iconfont {
  background-color: #e5e5e5;
}
.type-icon-list-icon .icon {
  /* width: 36px;
            height: 36px; */
  margin: 0 auto;
  border-radius: 50%;
}

.type-icon-list-icon p {
  margin: 0;
  font-size: 1em;
  color: #77787a;
}

.calc {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 190px;
  background-color: #e5e5e5;
  width: 100%;
  text-align: center;
  font-size: 2em;
}

.calc .col-3,
.calc .col-4 {
  height: 40px;
  padding: 0;
  color: #77787a;
  border: 1px solid #ffffff;
}

.calc-set {
  height: 30px;
}

.calc-year,
.calc-date,
.calc-remark {
  margin: 0;
  line-height: 14px;
  font-size: 14px;
  color: #77787a;
  text-align: left;
}

.calc-year {
  padding-top: 1px;
  padding-left: 10px;
}

.calc-remark {
  padding-top: 7px;
  text-align: right;
}

.calc .col-9 {
  padding: 0;
}

.calc-clear {
  font-size: 1em;
}

.calc-ok {
  height: 80px !important;
  padding-top: 20px !important;
}
</style>