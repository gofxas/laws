<template >
  <el-result
    icon="error"
    title="404"
    sub-title="Nothing here!"
  >
    <template #extra>
      <el-button type="primary" @click="pushHome">Back</el-button>
    </template>
  </el-result>
</template>
<script>
export default {
  name: "404",
  methods:{
    pushHome() {
        this.$router.replace('/')
    }
  }
};
</script>
<style >
</style>