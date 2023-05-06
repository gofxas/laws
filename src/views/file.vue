<template >
  <div class="viewer">
    <Viewer :value="value" :plugins="plugins" />
  </div>
</template>
  <script>
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue-next";
const plugins = [gfm()];
export default {
  name: "page",
  components: { Viewer },
  props:{
    file:{
        default:() =>({}),
        type:Object
    }
  },
  data() {
    return { value: "", plugins };
  },
  methods: {
    async getPage(path) {
      if (path == "/") {
        path = "/index";
      }
      try {
        const r = await fetch("/database/" + path + ".md");
        if (r.status == 404) {
          this.$router.push("/404");
        }
        const res = await r.text();
        this.value = res;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    const path = this.file.folder+'/'+this.file.name+(this.file.publish?`(${this.file.publish})`:'');
    this.getPage(path);
  }
};
</script>
  <style lang="less" scoped>
.viewer {
  max-width: 25.25rem;
  min-width: 18.75rem;
  margin: 0 auto;
  word-break: break-all;
}
:deep(.markdown-body) {
  padding: .5rem;
  img {
    max-width: 750px;
  }
  h1 {
    font-size: 18px;
  }
  h2 {
    font-size: 16px;
  }
  h3,
  h4,
  h5,
  li {
    font-size: 14px;
  }
  p {
    font-size: 13px;
  }
}
</style>