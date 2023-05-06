<template >
  <div class="page">
    <!-- {{ text() }} -->
    <div class="search-form">
      <input placeholder="输入关键词查询" type="text" v-model="keywords" />
    </div>
    <div class="search-result">
      <Tree :list="list" :keywords="keywords" />
    </div>
  </div>
</template>
<script>
import { h, defineComponent } from "vue";
const Tree = defineComponent({
  props: {
    list: {
      default: [],
      type: Array,
    },
    keywords: {
      default: "",
      type: String,
    },
    parent: {
      default: "/",
      type: String,
    },
  },
  methods: {
    matchWord(text, key) {
      return text.indexOf(key) > -1;
    },
    goPath(item) {
    //   console.log(item, );
      this.$router.push(this.parent+ item.name);
    },
  },
  render() {
    return h(
      "div",
      { class: "tree" },
      this.list.map((item, index) =>
        h("div", { class: "tree-node" }, [
          item.isFile
            ? h(
                "a",
                {
                  key: index,
                  class: [
                    "tree-name",
                    item.isFile ? "file-name" : "folder-name",
                  ],
                  style: {
                    display: this.matchWord(item.name, this.keywords)
                      ? "block"
                      : "none",
                  },
                  onClick: () => {
                    this.goPath(item);
                  },
                },
                item.name
              )
            : h(
                "p",
                {
                  key: index,
                  class: [
                    "tree-name",
                    item.isFile ? "file-name" : "folder-name",
                  ],
                //   style: {
                //     display: this.matchWord(item.name, this.keywords)
                //       ? "block"
                //       : "none",
                //   },
                },
                item.name
              ),
          item.child && item.child.length
            ? h(Tree, {
                list: item.child,
                keywords: this.keywords,
                parent:this.parent+item.name+'/'
              })
            : "",
        ])
      )
    );
  },
});
export default {
  name: "Search",
  data() {
    return {
      list: [],
      keywords: "",
    };
  },
  components: { Tree },
  mounted() {
    console.log(this.$menus.state);
    this.list = this.$menus.state;
  },
};
</script>
<style lang="less">
.tree {
  padding-left: 12px;
  position: relative;
}
.tree-name {
  font-size: 12px;
  margin: 0;
}
.file-name {
  color: #666;
  padding: 3px 0;
  cursor: pointer;
}
.folder-name {
  font-weight: bold;
  padding: 5px 0;
}
.search-form {
  max-width: 22.25rem;
  min-width: 18.75rem;
  margin: 0 auto;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  input {
    border: none;
    background-color: #eee;
    width: 100%;
    height: 1.5rem;
    outline: none;
    box-sizing: border-box;
    padding: .5rem;
  }
}
.search-result {
  max-width: 22.25rem;
  min-width: 18.75rem;
  margin: 0 auto;
  padding-right: 12px;
  box-sizing: border-box;
}
</style>