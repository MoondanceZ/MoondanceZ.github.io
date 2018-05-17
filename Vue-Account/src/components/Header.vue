<template>
    <div class="row">
      <i class="title-back icon iconfont icon-fanhui" @click="clickClose"></i>
      <div class="col-12 title">{{Title}}</div>
    </div>
</template>

<script>

export default {
  props: ["Title"],
  methods: {
    clickClose() {
      var a= this.Method;
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>