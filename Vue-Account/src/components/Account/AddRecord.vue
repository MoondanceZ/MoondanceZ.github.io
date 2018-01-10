<template>
    <div class="container">
        <div class="row add-header">
            <router-link class="close" to="/Account/List"></router-link>
            <div class="col-6 add-income active">收入</div>
            <div class="col-6 add-expend">支出</div>
        </div>
        <div class="row add-type">
            <div class="col-2 col-md-1">
                <i class="icon iconfont icon-jinqian"></i>
            </div>
            <div class="col-2 col-md-1 type-info">
                一般
            </div>
            <div class="col-8 col-md-10 type-amount">
                996.00
            </div>
        </div>
        <div class="row">
            <div class="col-2 type-icon-list-icon">
                <i class="icon iconfont icon-jinqian"></i>
                <p>一般</p>
            </div>
            <div class="col-2 type-icon-list-icon">
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
                <i class="icon iconfont icon-yiyuan"></i>
                <p>医院</p>
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
                <i class="icon iconfont icon-richangyongpin"></i>
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
                <i class="icon iconfont icon-shucai"></i>
                <p>蔬菜</p>
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
                <div class="col-3">1</div>
                <div class="col-3">2</div>
                <div class="col-3">3</div>
                <div class="col-3">+</div>
                <div class="col-3">4</div>
                <div class="col-3">5</div>
                <div class="col-3">6</div>
                <div class="col-3">-</div>
                <div class="col-9">
                    <div class="col-4">7</div>
                    <div class="col-4">8</div>
                    <div class="col-4">9</div>
                    <div class="col-4 calc-clear">清零</div>
                    <div class="col-4">0</div>
                    <div class="col-4">.</div>
                </div>
                <div class="col-3 calc-ok">
                    OK
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
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
  background-color: #62dfed;
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

.type-icon-list-icon .icon {
  /* width: 36px;
            height: 36px; */
  margin: 0 auto;
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
  background-color: #62dfed;
  width: 100%;
  text-align: center;
  font-size: 2em;
}

.calc .col-3,
.calc .col-4 {
  height: 40px;
  padding: 0;
  color: #77787a;
  border: 1px solid #ececee;
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