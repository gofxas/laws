<template >
  <div class="notfound404">
    <img src="/404.svg" alt="" />
    <p style="text-align: center">这里什么都没有! <a href="/">回到首页</a></p>
  </div>
</template>
<script>
export default {
  name: "404",
  methods: {
    pushHome() {
      this.$router.replace("/");
    },
  },
};
</script>
<style scoped>
.notfound404 {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
img {
  width: 15rem;
}
p {
  font-size: .6rem;
  color: #bbb;
}
a {
  color: #c185f9;
}
</style>