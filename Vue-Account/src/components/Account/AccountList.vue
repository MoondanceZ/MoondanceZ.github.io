<template>
<div>
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
        <div class="row">
            <div class="col-6 day-left">
                <span class="day">18日</span>
            </div>
            <div class="mid-day-total"></div>
            <div class="col-6 day-right">
                <span class="day">190.00</span>
            </div>
        </div>
        <div class="row">
            <div class="col-6 left">
                <!-- <span class="amount">78.00</span>
                    左边 -->
            </div>
            <i class="mid iconfont icon-shucai"></i>
            <div class="col-6 right">
                蔬菜
                <span class="amount">90.00</span>
            </div>
        </div>
        <div class="row">
            <div class="col-6 left">
                <!-- <span class="amount">78.00</span>
                    左边 -->
            </div>
            <i class="mid iconfont icon-gouwu"></i>
            <div class="col-6 right">
                购物
                <span class="amount">90.00</span>
            </div>
        </div>
        <div class="row">
            <div class="col-6 left">
                <!-- <span class="amount">78.00</span>
                    左边 -->
            </div>
            <i class="mid iconfont icon-yiban"></i>
            <div class="col-6 right">
                一般
                <span class="amount">90.00</span>
            </div>
        </div>
        <div class="row">
            <div class="col-6 day-left">
                <span class="day">17日</span>
            </div>
            <div class="mid-day-total"></div>
            <div class="col-6 day-right">
                <span class="day">100.00</span>
            </div>
        </div>
        <div class="row">
            <div class="col-6 left">
                <span class="amount">1178.00</span>
                工资
            </div>
            <i class="mid iconfont icon-gongzi"></i>
            <div class="col-6 right">
                <!-- 右边
                    <span class="amount">90.00</span> -->
            </div>
        </div>
        <div class="row">
            <div class="col-6 left">
                <!-- <span class="amount">78.00</span>
                    左边 -->
            </div>
            <i class="mid iconfont icon-tongxun"></i>
            <div class="col-6 right">
                通讯
                <span class="amount">90.00</span>
            </div>
        </div>
    </div>
    <router-link class="fix-add" to="/Account/Add">+</router-link>
    <!-- <a class="fix-add" href="add-record.html">+</a> -->
    </div>
</template>
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
