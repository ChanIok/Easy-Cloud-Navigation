<template>
  <el-container id="container">
    <el-header>Header</el-header>
    <el-main id="main"
      >Main
      <div id="time-wrapper">
        <c-time></c-time>
      </div>
      <div id="search-wrapper">
        <search></search>
      </div>
      <div id="favorites-warpper">
        <favorites></favorites>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>

  <!-- <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div class="grid-content bg-purple"></div
    ></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="grid-content bg-purple-light"></div
    ></el-col>
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
      ><div class="grid-content bg-purple"></div
    ></el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div class="grid-content bg-purple-light"></div
    ></el-col>
  </el-row> -->
</template>

<script>
import Search from "../components/main/Search.vue";
import cTime from "../components/main/Time.vue";
import Favorites from "../components/main/Favorites.vue";

export default {
  name: "Main",
  data() {
    return { activeIndex: "1" };
  },
  components: { Search, cTime, Favorites },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {},
};
</script>

<style  lang="scss" scoped>
#container {
  #main {
    @media (max-width: 420px) {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }

    #time-wrapper {
      width: calc(30% + 256px);
      margin: auto;
      margin-bottom: 30px;
    }
    #search-wrapper {
      width: calc(30% + 256px);
      margin: auto;
      margin-bottom: 30px;
      @media (max-width: 420px) {
        padding-left: 5px;
        padding-right: 5px;
        box-sizing: border-box;
        width: 100%;
      }
    }
    #favorites-warpper {
      width: calc(50% + 180px);
      margin: auto;
      @media (max-width: 420px) {
        margin: 0;
        width: 100%;
      }
    }
  }
}
</style>