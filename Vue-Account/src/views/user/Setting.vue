<template>
    <div class="container">
        <Header :Title="Title"></Header>
    </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  data() {
    return {
      Title: "修改信息"
    };
  },
  components: {
    Header
  }
};
</script>

<style scoped>

</style>