<template>
<div class="layout">
   <transition name="slide-fade">
    <router-view class="slide-fade"></router-view>
  </transition>
</div>
  
</template>

<script>
export default {};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.slide-fade {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* overflow-y: auto; */
  /* overflow-x: hidden; */
  -webkit-overflow-scrolling: touch;
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  /* left:0;right: 0; */
  transform: translate3d(100%, 0, 0);
  opacity: 1;
}
</style>
