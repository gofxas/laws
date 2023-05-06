<template >
  <div :class="['folder', type == 'grid' ? 'grid-folder' : '',type == 'list' ? 'list-folder' : '']">
    <template v-for="item in list" :key="item.id">
      <div class="folder-item" @click="goPath(item)" :title="item.name">
        <img v-if="item.isFile" class="folder-item-icon" src="/file.svg" />
        <img v-else class="folder-item-icon" src="/folder.svg" />
        <p class="folder-item-title">{{ item?.subtitle||item.name }}</p>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "folder",
  props: {
    list: {
      default: () => [],
      type: Array,
    },
    type: {
      default: "grid",
      type: String,
    },
  },
  methods: {
    goPath(item) {
      let path = this.$route.path;
      let url = (path == "/" ? "" : path) + "/" + item.name;
      this.$router.push(url);
    },
  },
};
</script>
<style lang="less" scoped>
.folder {
  max-width: 22.25rem;
  min-width: 18.75rem;
  margin: 0 auto;
  &-item {
    font-size: 0.65rem;
    transition: all .5s;
  }
}
.grid-folder {
  position: relative;
  display: grid;
  user-select: none;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, 4rem);
  grid-template-rows: repeat(auto-fill, 4rem);
  grid-gap: 2rem 1rem;
  box-sizing: border-box;
  justify-content: center;
  padding-bottom: 4rem;
  .folder-item {
    position: relative;
    width: 4rem;
    height: 4rem;
    grid-column: span 1;
    grid-row: span 1;
    cursor: pointer;
    &:hover {
      background-color: aliceblue;
      .folder-item-title {
        color: #9191ef;
      }
    }
  }
  .folder-item-icon {
    width: 100%;
    height: 100%;
  }
  .folder-item-title {
    width: calc(100% + 1rem);
    margin-left: calc(1rem / 2 * -1);
    display: block;
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
.list-folder {
  position: relative;
  padding-bottom: 1.5rem;
  .folder-item {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 .5rem;
    &:hover {
      background-color: aliceblue;
      .folder-item-title {
        color: #9191ef;
      }
    }
  }
  .folder-item-icon {
    width: 2rem;
    height: 2rem;
  }
  .folder-item-title {
    flex: 1;
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>