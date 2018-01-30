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
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果  
  watch: {  
    '$route' (to, from) {  
      if(to.path == '/'){  
        this.transitionName = 'slide-right';  
      }else{  
        this.transitionName = 'slide-left';  
      }  
    }  
  }  
};
</script>

<style scoped>
.layout {
  /* height: 100%; */
}
.child-view {  
  position: absolute;  
  /* left: 0;  
  top: 0;   */
  width: 100%;  
  height: 100%;  
  transition: all .5s cubic-bezier(.55,0,.1,1);  
}  
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);;
  z-index: 0;
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
</style>
