<template>
<transition mode="out-in">
  <router-view></router-view>
</transition>
</template>
<script>
export default {
  name: "layout"
};
</script>
<style scoped>
.left-enter {
  transform: translateX(100%);
}
.left-enter-to {
  transform: translateX(0);
}

.left-enter-active {
  transition: 1s;
}
.left-leave {
  transform: translateX(0);
}
.left-leave-to {
  transform: translateX(-100%);
}
.left-leave-active {
  transition: 1s;
}
</style>