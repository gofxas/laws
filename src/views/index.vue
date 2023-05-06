<template >
  <Notfound v-if="is404" />
  <div class="page" v-else>
    <div class="page-head">
      <router-link to="/">首页</router-link>
      <router-link v-for="path in navs" :key="path.link" :to="path.link">{{
        path.name
      }}</router-link>
    </div>
    <File v-if="type == 'file'" :file="list" />
    <Folder v-if="type == 'folder'" :list="list" :type="listType" />
    <div class="page-footer">
      <!-- <el-button @click="Test">Test</el-button> -->
      <div class="foot-search">
        <div class="foot-search-input" @click="search">
          输入关键词查询
        </div>
      </div>
      <span class="status">
        {{ listType == "grid" ? "缩略图" : "列表" }}
      </span>
      <el-switch
        v-model="listType"
        active-color="#13ce66"
        inactive-color="#ff8787"
        active-value="grid"
        inactive-value="list"
      />
    </div>
  </div>
</template>
<script>
import File from "./file.vue";
import Folder from "./folder.vue";
import Notfound from "./404.vue";
export default {
  name: "page",
  components: { File, Folder, Notfound },
  data() {
    return {
      type: "folder",
      paths: [],
      list: null,
      listType: "list",
      is404: false,
    };
  },
  watch: {
    type(n) {
      if (!this.is404) {
        document.querySelector(".root-content").scrollTop = 0;
      }
    },
    $route: {
      handler(n, o) {
        const path = n.path;
        this.getPage(path);
      },
      immediate: true,
    },
  },
  computed: {
    navs() {
      let navs = [],
        base = "";
      for (let i of this.paths) {
        base += "/" + i;
        navs.push({
          link: base,
          name: i,
        });
      }
      return navs;
    },
  },
  methods: {
    search() {
      this.$router.push('/search')
    },
    async Test() {
      await this.list.forEach(async (item) => {
        if (item.isFile) {
          const path =
            item.folder +
            "/" +
            item.name +
            (item.publish ? `(${item.publish})` : "");
          await this.TestURL(path);
        }
      });
      console.log("test ok");
    },
    async TestURL(link) {
      const r = await fetch("/database/" + link + ".md");
      if (r.status == 404) {
        console.error(link, "link not ok");
      }
    },
    async getPage(path) {
      let paths = path
        .split("/")
        .filter((t) => t)
        .map((t) => decodeURI(t));
      this.paths = paths;
      let list = this.$menus.state;
      this.type = "folder";
      let is404 = false;
      for (let i of paths) {
        let arr = list.find((t) => t.name == i);
        if (arr && arr.child) {
          list = arr.child;
          this.type = "folder";
        } else if (arr && arr.isFile) {
          this.type = "file";
          list = arr;
        } else {
          list = [];
          is404 = true;
        }
      }
      this.list = list;
      // if (is404) {
      //   // console.log(first)
      //   this.$router.replace("/404");
      // }
      this.is404 = is404;
    },
  },
};
</script>
<style lang="less" scoped>
.page-head {
  max-width: 25.25rem;
  min-width: 18.75rem;
  width: 100%;
  margin: 0 auto;
  font-size: 14px;
  color: #333;
  height: 2rem;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  position: sticky;
  top: 0;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 1;
  overflow: auto;
  a {
    text-decoration: none;
    color: #666;
    margin-right: 10px;
    position: relative;
    // word-wrap: ;
    white-space: nowrap;
    &.router-link-active {
      color: #279;
    }
  }
}
.page-footer {
  padding: 0 0.5rem;
  box-sizing: border-box;
  z-index: 1;
  width: 100%;
  position: fixed;
  height: 1.5rem;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: flex-end;
  background-color: #fff;
  .status {
    padding: 0 0.2rem;
  }
  .foot-search {
    flex: 1;
    &-input {
      height: 1rem;
      background-color: #eee;
      width: 10rem;
      font-size: .6rem;
      color: #666;
      padding: 0 .5rem;
      border-radius: .5rem;
    }
  }
  .search {
    width: 1rem;
    height: 1rem;
  }
}
</style>