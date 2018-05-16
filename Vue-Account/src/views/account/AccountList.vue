<template>
  <div class="account-list">
    <div class="top">
      <div class="header">
        <router-link class="avatar-router" to="/User/Info"><img class="avatar" :src=AvatarUrl alt="avatar" srcset=""></router-link>
      </div>
      <div class="total">
        <div class="col-6 income">
          <p>本月收入</p>
          <p>{{MonthIncome}}</p>
        </div>
        <div class="col-6 expend">
          <p>本月支出</p>
          <p>{{MonthExpend}}</p>
        </div>
      </div>
    </div>
    <keep-alive>
      <item-list ref="ItemList"></item-list>
    </keep-alive>
    <div class="fix-add">
      <router-link class="fix-add-link" to="/Account/Add">+</router-link>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ItemList from "@/components/account/ItemList";
export default {
  computed: {
    ...mapState({
      MonthIncome: state => state.accountRecords.monthIncome,
      MonthExpend: state => state.accountRecords.monthExpend,
      AvatarUrl: state =>
        state.user.currentUser.AvatarUrl || "./static/img/avatar.jpg"
    })
  },
  components: {
    ItemList
  },
  beforeRouteEnter(to, from, next) {
    if (!sessionStorage.askPositon || from.path == "/") {
      //当前页面刷新不需要切换位置
      sessionStorage.askPositon = "";
      next();
    } else {
      next(vm => {
        if (vm && vm.$refs.ItemList.$refs.scrollerBottom) {
          //通过vm实例访问this
          setTimeout(function() {
            vm.$refs.ItemList.$refs.scrollerBottom.scrollTo(
              0,
              sessionStorage.askPositon,
              false
            );
          }, 0); //同步转异步操作
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    //记录离开时的位置
    sessionStorage.askPositon =
      this.$refs.ItemList.$refs.scrollerBottom &&
      this.$refs.ItemList.$refs.scrollerBottom.getPosition() &&
      this.$refs.ItemList.$refs.scrollerBottom.getPosition().top;
    next();
  }
};
</script>
<style scoped>
.account-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start;
  align-items: flex-start; */
}

.top {
  width: 100%;
  height: 72px;
  flex: 1 1 72px;
}

.header {
  /* background-image:  */
  background-color: #62dfed;
  height: 36px;
  /* margin-bottom: 23px; */
  position: relative;
}

.total {
  height: 36px;
  background-color: #ffffff;
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

.avatar-router {
  position: absolute;
  top: 100%;
  left: 50%;
  max-width: 4em;
  height: 4em;
  width: 4em;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.avatar {
  /* position: absolute;
  top: 100%;
  left: 50%; */
  max-width: 4em;
  height: 4em;
  width: 4em;
  border-radius: 50%;
  /* transform: translate(-50%, -50%); */
}

.fix-add {
  display: block;
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: #62dfed;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffffff;
  z-index: 99;
  margin: 0 auto;
  user-select: none;
  -webkit-user-select: none;
}

.fix-add-link {
  width: 36px;
  height: 36px;
  display: block;
  position: absolute;
  text-align: center;
  font-size: 36px;
  line-height: 36px;
  text-decoration: none;
  color: #ffffff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
