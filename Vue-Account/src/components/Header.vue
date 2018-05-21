<template>
    <div class="row">
      <i class="title-back icon iconfont icon-fanhui" @click="clickClose"></i>
      <div class="col-12 title">{{Title}}</div>
    </div>
</template>

<script>

export default {
  props: ["Title", "IsClose"],
  methods: {
    clickClose() {
      if(this.IsClose){  //IsClose 为 true 时, 不返回上一页
        this.$emit("clickClose");
      }else{
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
  .row {
    border-bottom: 1px solid #eae8e8;
    margin-bottom: 10px;
  }
</style>