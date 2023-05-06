<template>
  <div class="root-layout">
    <div v-if="loading" class="cover">
      <img src="/loading.svg" alt="">
      <p>中国法律法规</p>
      <p class="title">法律内容来源于国家法律法规数据库</p>
    </div>
    <div 
    v-else
    class="root-content" ref="content">
      <RouterView ></RouterView>
    </div>
  </div>
</template>
<script>
export default {
  name: "root",
  data() {
    return {
      treeheight:0,
      defaultProps: {
        label: "name",
        children: "child",
      },
      filterText: "",
      pages: [],
      loading: true
    };
  },
  watch: {
    filterText(n) {
      this.$refs.treeRef.filter(n);
    },
  },
  methods: {
    handleNodeClick(nodeObj, node, treeNode, event) {
      // console.log(nodeObj,node);
      if (nodeObj.ver) {
        let folder = node.parent.data.folder;
        let file = nodeObj.name;
        let publish = nodeObj.publish;

        if (folder && file) {
          this.$router.push(
            "/" + folder + "/" + file + (publish ? `(${publish})` : "")
          );
          this.$refs.content.scrollTop = 0;
        }
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.includes(value);
    },
    findLaws(id) {
      return this.pages.filter((t) => t.category_id == id);
    },
  },
  mounted() {
    this.loading = true
    fetch("/menus/law.json")
      .then((res) => res.json())
      .then((pages) => {
        this.pages = pages;
        fetch("/menus/category.json")
          .then((res) => res.json())
          .then((category) => {
            let menus = [];
            category.forEach((item) => {
              if (item.id) {
                menus.push({ ...item, child: pages[item.id].map(r => ({...r, folder: item.folder})) });
              } else {
                item.child = item.child.map((t) => ({
                  ...t,
                  child: pages[t.id].map(r => ({...r, folder: t.folder})),
                }));
                menus.push(item);
              }
            });
            this.$menus.setMenus(menus);
            // this.menus = menus;
            setTimeout(() => {
              this.loading = false;
            }, 20)
          });
      });
  },
};
</script>
<style lang="less">
.el-tree-node__content {
  height: unset !important;
}
.root-layout {
  height: 100vh;
  width: 100%;
  display: flex;
}
.root-slider {
  height: 100%;
  overflow: auto;
  width: 300px;
  min-width: 300px;
  background-color: #fff;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

}
.root-content {
  flex: 1;
  height: 100%;
  overflow: auto;
}
body {
  margin: 0;
}
.tree-container {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #97a2bf;
  }
  &::-webkit-scrollbar-track {
    border-radius: 2px;
    background-color: rgba(144, 147, 153, 0.3);
  }
}
.menu-item {
  word-break: break-all; white-space: break-spaces;
  margin: 0;
  color: #333;
  font-size: 13px;
}
.cover {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 4rem;
    height: 4rem;
  }
  p:not(.title) {
    font-size: .7rem;
    font-weight: bold;
  }
  p.title {
    font-size: .6rem;
    margin: 0;
  }
}
</style>