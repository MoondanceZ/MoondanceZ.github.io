<template>
  <div>
    <div v-show="RemarkNotOpen" class="container">
      <div class="row add-header">
          <i class="title-back icon iconfont icon-fanhui" @click="clickClose"></i>
          <i v-if="$route.params.index1 !== undefined && $route.params.index2 !== undefined" class="title-delete icon iconfont icon-guanbi" @click="clickDelete"></i>
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
        <div v-show="Type==0" v-for="item in AccountIncomeTypeList" :key="item.Code" class="col-2 type-icon-list-icon" @click="selectType(item.Id, item.Code, item.Name)">
          <i :class="'icon iconfont icon-' + item.Code"></i>
          <p>{{item.Name}}</p>
        </div>
        <div v-show="Type==1" v-for="item in AccountExpendTypeList" :key="item.Code" class="col-2 type-icon-list-icon" @click="selectType(item.Id, item.Code, item.Name)">
          <i :class="'icon iconfont icon-' + item.Code"></i>
          <p>{{item.Name}}</p>
        </div>
      </div>
      <Calculator :Amount="Amount" :RecordDate="AccountDate" @showAmount="showAmount" @openRemark="showRemark" @clickOk="saveRecord"
        @setAccountDate="getAccountDate"></Calculator>
    </div>
    <Remark v-show="!RemarkNotOpen" @closeRemark="closeRemark" @setRemarkInfo="getRemarkInfo"></Remark>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui";
import Calculator from "@/components/account/Calculator";
import Remark from "@/components/account/Remark";
import Rk from "@/api/rk-api";
import { mapActions } from "vuex";
let _self;
export default {
  data() {
    return {
      Id: 0,
      UserId: 0,
      AccountTypeList: [],
      AccountIncomeTypeList: [],
      AccountExpendTypeList: [],
      SelectedId: 4,
      SelectedType: "yiban",
      SelectedTypeName: "一般",
      Type: 1, //0:收入，1：支出
      Amount: "0.00", //传递到子组件
      RemarkNotOpen: true,
      RemarkInfo: "",
      AccountDate: "",
      AccountDateBack: "", //备份一个时间, 判断是否修改了时间
      AmountBack: "",
      SlideName: ""
    };
  },
  created() {
    _self = this;
    let date = new Date();
    _self.UserId = _self.$store.state.user.currentUser.Id;
    _self.getAccountTypeList();
    _self.AccountDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 >= 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
    let index1 = this.$route.params.index1;
    let index2 = this.$route.params.index2;
    if (index2 !== undefined && index2 !== undefined) {
      let currentRecord = this.$store.state.accountRecords.accountList[index1]
        .AccountRecords[index2];
      this.Id = currentRecord.Id;
      this.SelectedId = currentRecord.AccountTypeId;
      this.SelectedType = currentRecord.TypeCode;
      this.SelectedTypeName = currentRecord.TypeName;
      this.Type = currentRecord.Type;
      this.Amount = currentRecord.Amount;
      this.RemarkInfo = currentRecord.Remark;
      this.AccountDate = currentRecord.AccountDate;
      this.AccountDateBack = currentRecord.AccountDate;
      this.AmountBack = currentRecord.Amount;
    }
  },
  beforeDestroy() {
    Indicator.close();
  },
  methods: {
    clickClose() {
      this.$router.go(-1);
    },
    clickDelete() {
      Indicator.open("删除中...");
      Rk.Account.deleteAccountRecord(this.Id)
        .then(response => {
          var res = response.data;
          if (res.IsSuccess) {
            this.deleteAccountRecord({
              index1: this.$route.params.index1,
              index2: this.$route.params.index2
            }).then(() => {
              this.$router.go(-1);
            });
          } else {
            Indicator.close();
            Toast(res.Message);
          }
        })
        .catch(() => {
          Indicator.close();
          Toast("删除失败");
        });
    },
    saveRecord() {
      if (this.Amount === "0.00") {
        Toast("请输入金额");
        return;
      }

      var recordData = {
        UserId: this.UserId,
        Type: this.Type,
        AccountTypeId: this.SelectedId,
        Amount: this.Amount,
        Remark: this.RemarkInfo,
        AccountDate: this.AccountDate
      };
      Indicator.open("保存中...");
      if (this.Id === 0) {
        Rk.Account.createAccountRecord(recordData) //需要转移到 vuex 中
          .then(response => {
            var res = response.data;
            if (res.IsSuccess) {
              res.Data.TypeCode = this.SelectedType;
              res.Data.TypeName = this.SelectedTypeName;
              this.addAccountRecord(res.Data).then(() => {
                this.$router.go(-1);
              });
              // this.$router.push("/Account/List");
            } else {
              Indicator.close();
              Toast(res.Message);
            }
          })
          .catch(error => {
            console.log(error);
            Indicator.close();
            Toast("操作异常");
          });
      } else {
        Rk.Account.updateAccountRecord(this.Id, recordData).then(response => {
          let res = response.data;
          if (res.IsSuccess) {
            recordData.Id = this.Id;
            recordData.TypeCode = this.SelectedType;
            recordData.TypeName = this.SelectedTypeName;
            let updateInfo = {
              hasUpdateDate: this.AccountDateBack !== this.AccountDate,
              index1: this.$route.params.index1,
              index2: this.$route.params.index2,
              updateAmount: (
                parseFloat(this.Amount) - parseFloat(this.AmountBack)
              ).toFixed(2)
            };
            this.updateAccountRecord({
              updateInfo: updateInfo,
              record: recordData
            }).then(() => {
              this.$router.go(-1);
            });
            // this.$router.push("/Account/List");
          } else {
            Indicator.close();
            Toast(res.Message);
          }
        });
      }
    },
    getAccountTypeList() {
      Rk.Account.getAccountTypes(this.UserId)
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
      this.SelectedId = this.Type == 0 ? 1 : 4; //默认
      this.SelectedTypeName = "一般";
    },
    selectType(id, type, name) {
      this.SelectedId = id;
      this.SelectedType = type;
      this.SelectedTypeName = name;
    },
    getAccountDate(val) {
      console.log(val);
      this.AccountDate = val;
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
    },
    ...mapActions({
      addAccountRecord: "addAccountRecord",
      updateAccountRecord: "updateAccountRecord",
      deleteAccountRecord: "deleteAccountRecord"
    })
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
  font-size: 1.2em;
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
