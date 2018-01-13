<template>
  <div class="container">
<div class="row add-header">
      <i class="close" @click="closeRemark"></i>
      <div class="col-12 title">备注</div>
      <div class="col-12">
        <span class="txt-count">{{InputCount}}/200</span>
        <textarea rows="8" v-model="Remark" @input="descInput" class="remark" placeholder="请输入备注信息" maxlength="200"></textarea>
      </div>
      <div class="col-12 finish">
        <button class="btn btn-primary" @click="finish">完成</button >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      InputCount :0,
      Remark: ""
    }
  },
  methods:{
    descInput(){
      this.InputCount = this.Remark.length;
    },
    closeRemark(){
      this.$emit("closeRemark", true);
    },
    finish(){
      this.$emit("setRemarkInfo", this.Remark);
      this.$emit("closeRemark", true);
    }
  }
}
</script>

<style scoped>
.title {
  margin: 8px 0;
  font-size: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  color: #a1a2a5;
}
.remark {
  border: 1px solid #a1a2a5;
  border-radius: 2px;
  width: 100%;
  resize: none;
}
.finish {
  text-align: right;
}
.txt-count{
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: #a1a2a5;
}
</style>
