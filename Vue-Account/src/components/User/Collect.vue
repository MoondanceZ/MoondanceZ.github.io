<template>
<transition name="slide-up" mode="out-in">
    <div class="container">
        <Header :Title="Title" :IsClose="IsClose" @clickClose="clickClose"></Header>
    </div>
</transition>
</template>

<script>
import Header from "@/components/Header";
export default {
  data() {
    return {
      Title: "汇总",
      IsClose: true,
      CurrentUser: {}
    };
  },
  methods: {
    clickClose() {
      this.$emit("closeTab");
    }
  },
  components: {
    Header
  }
};
</script>

<style scoped>
</style>