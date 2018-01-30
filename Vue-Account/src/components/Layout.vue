<template>
<div class="layout">
   <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "slide-left";
    }
    this.$router.isBack = false;
    console.log(this.transitionName);
    next();
  }
};
</script>

<style scoped>
.layout {
  height: 100%;
}
.child-view {
  position: absolute;
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 1;
  -webkit-transform: translate3d(100%, 0, 0);;
  transform: translate3d(100%, 0, 0);;
  z-index: 1;
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0.8;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  background: #ccc;
}
</style>
