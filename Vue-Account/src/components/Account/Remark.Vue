<template>
<transition name="slide-up" mode="out-in">
  <div class="container">
    <Header :Title="Title" :IsClose="IsClose" @clickClose="clickClose"></Header>
    <div class="row">
      <div class="col-12">
        <span class="txt-count">{{InputCount}}/200</span>
        <textarea rows="8" v-model="Remark" @input="descInput" class="remark" placeholder="请输入备注信息" maxlength="200"></textarea>
      </div>
      <div class="col-12 finish">
        <button class="btn btn-primary btn-finish" @click="finish">完成</button >
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import Header from "@/components/Header";
export default {
  data() {
    return {
      InputCount: 0,
      Title: "备注",
      IsClose: true,
      Remark: ""
    };
  },
  methods: {
    descInput() {
      this.InputCount = this.Remark.length;
    },
    clickClose() {
      this.$emit("closeRemark", true);
    },
    finish() {
      this.$emit("setRemarkInfo", this.Remark);
      this.$emit("closeRemark", true);
    }
  },
  components: {
    Header
  }
};
</script>

<style scoped>
.remark {
  border: 1px solid #a1a2a5;
  border-radius: 1px;
  width: 100%;
  resize: none;
}
.finish {
  text-align: right;
}
.txt-count {
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: #a1a2a5;
}
.btn-finish {
  width: 4rem;
  height: 32px;
  /* line-height: 40px; */
  border: 1px solid #a1a2a5;
  border-radius: 1px;
  text-align: center;
  background-color: #ffffff;
  color: #585858;
}
</style>
