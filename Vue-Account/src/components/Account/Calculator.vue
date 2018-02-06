<template>
  <div class="container calc">
    <div class="row calc-set">
      <div class="col-6" @click="openDatePicker('date-picker')">
        <p class="calc-year">{{AccountYear}}</p>
        <p class="calc-date">{{AccountMonth}}月{{AccountDate}}日</p>
      </div>
      <div class="col-6">
        <!-- <router-link class="fix-add" to="/Account/Remark"><p class="calc-remark">备注</p></router-link> -->
        <p class="calc-remark" @click="clickRemark">备注</p>
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
    <mt-datetime-picker ref="date-picker" type="date" v-model="AccountDateModel" @confirm="handleChange"></mt-datetime-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AccountDateModel: "",
      AccountYear: "",
      AccountMonth: "",
      AccountDate: "",
      Integer: "", //记录整数部分
      Decimal: "", //记录小数部分
      CalcAmount: this.Amount, //统计的金额
      SumAmount: "0.00", //计算后的金额
      OperatorType: "", //操作
      OkOperatorType: "", //点击Ok时候的操作
      HasDot: false //是否存在小数点
    };
  },
  created() {
    this.AccountDateModel = this.RecordDate;
    var splitDate = this.RecordDate.split("-");
    this.AccountYear = splitDate[0];
    this.AccountMonth = splitDate[1];
    this.AccountDate = splitDate[2];
  },
  props: ["Amount", "RecordDate"],
  methods: {
    openDatePicker(picker) {
      this.$refs[picker].open();
    },
    handleChange(val) {
      var date = new Date(val);
      this.AccountYear = date.getFullYear();
      this.AccountMonth = ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1)));
      this.AccountDate = date.getDate() >= 10 ? date.getDate() : ("0" + date.getDate());
      this.AccountDateModel =
        this.AccountYear + "-" + this.AccountMonth + "-" + this.AccountDate;
      this.emitAccountDate();
    },
    clickCalcNumber(number) {
      if (this.OperatorType != "") {
        this.CalcAmount = "0.00";
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
      var amountSplit = this.CalcAmount.split(".");
      amountSplit[0] = this.Integer;
      if (this.Decimal.length == 1) {
        amountSplit[1] = this.Decimal + "0";
      } else if (this.Decimal.length == 2) {
        amountSplit[1] = this.Decimal;
      } else {
        amountSplit[1] = "00";
      }
      this.CalcAmount = amountSplit[0] + "." + amountSplit[1];
      this.OperatorType = "";

      this.emitAmount();
    },
    clickCalcDot() {
      this.HasDot = true;
    },
    clickCalcClear() {
      this.CalcAmount = "0.00";
      this.Integer = "";
      this.Decimal = "";
      this.SumAmount = "0.00";
      this.OperatorType = "";
      this.OkOperatorType = "";
      this.HasDot = false;

      this.emitAmount();
    },
    clickCalcOperate(type) {
      this.OkOperatorType = type;
      if (this.OperatorType == "") {
        if (type == "+") {
          this.OperatorType = "+";
          this.SumAmount = (
            parseFloat(this.SumAmount) + parseFloat(this.CalcAmount)
          ).toFixed(2);
          this.CalcAmount = this.SumAmount;
        } else if (type == "-") {
          this.OperatorType = "-";
          if (parseFloat(this.SumAmount) != 0) {
            this.SumAmount = (
              parseFloat(this.SumAmount) - parseFloat(this.CalcAmount)
            ).toFixed(2);
            this.CalcAmount = this.SumAmount;
          } else {
            this.SumAmount = this.CalcAmount;
          }
        } else {
          this.OperatorType = "";
        }
        this.HasDot = false;
      }

      this.emitAmount();
    },
    clickCalcOk() {
      // if (this.OperatorType != "") return;

      // if (this.OkOperatorType != "") {
      //   if (this.OkOperatorType == "+") {
      //     this.CalcAmount = (
      //       parseFloat(this.SumAmount) + parseFloat(this.CalcAmount)
      //     ).toFixed(2);
      //     this.SumAmount = "0.00";
      //   } else if (this.OkOperatorType == "-") {
      //     if (parseFloat(this.SumAmount) != 0) {
      //       this.CalcAmount = (
      //         parseFloat(this.SumAmount) - parseFloat(this.CalcAmount)
      //       ).toFixed(2);
      //     }
      //     this.SumAmount = "0.00";
      //   }
      //   this.OkOperatorType = "";
      //   this.Integer = "";
      //   this.Decimal = "";
      //   this.HasDot = false;
      //   this.OperatorType = "";
      // }

      // this.emitAmount();
      this.$emit("clickOk");
    },
    clickRemark() {
      this.$emit("openRemark", false);
    },
    emitAmount() {
      this.$emit("showAmount", this.CalcAmount);
    },
    emitAccountDate() {
      this.$emit("setAccountDate", this.AccountDateModel);
    }
  }
};
</script>

<style scoped>
.calc {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 190px;
  background-color: #e5e5e5;
  width: 100%;
  text-align: center;
  font-size: 2em;
  user-select: none;
  -webkit-user-select: none;
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
