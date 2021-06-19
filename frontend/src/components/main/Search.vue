<template>
  <div id="search">
    <div id="search-menu-wrapper">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">百度</el-menu-item>
        <el-menu-item index="2">谷歌</el-menu-item>
        <el-menu-item index="3">哔哩哔哩</el-menu-item>
      </el-menu>
    </div>
    <div id="search-input-wrapper">
      <el-input
        placeholder="请输入内容"
        v-model="inputContent"
        @keyup.enter="doSearch"
        class="input-with-select"
      >
   

        <template #append>
          <el-button icon="el-icon-search" @click="doSearch"></el-button>
        </template>
      </el-input>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      activeIndex: "1",
      searchIndex: "1",
      inputContent: "",
      select: "",
    };
  },
  components: {},
  methods: {
    doSearch() {
      let req = encodeURI(this.inputContent);
      if (this.searchIndex === "1") {
        window.open(`https://www.baidu.com/s?wd=${req}`);
      } else if (this.searchIndex === "2") {
        window.open(`https://www.google.com.hk/search?q=${req}`);
      } else if (this.searchIndex === "3") {
        window.open(`https://search.bilibili.com/all?keyword=${req}`);
      }
    },
    handleSelect(index) {
      this.searchIndex = index;
    },
  },
  mounted() {},
};
</script>

<style  lang="scss" scoped>
#search {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
 
}
</style>