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
      <div id="user">
        <div id="user-icon" @click="clickUser">
          <i class="el-icon-user-solid"></i>
        </div>
        <div id="log-out" v-show="isExitWrapper" @click="logout">
          退出登录
          <i class="el-icon-right"></i>
        </div>
      </div>
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
      isExitWrapper: false,
    };
  },
  components: {},
  methods: {
    clickUser() {
      this.isExitWrapper = true;
    },
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
    clickUser() {
      this.isExitWrapper = true;
    },
    logout() {
      localStorage.clear();
      this.isExitWrapper = false;
      this.$router.push({
        path: "/",
      });
    },
    checkClick(e) {
      if (!document.getElementById("user").contains(e.target))
        this.isExitWrapper = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.checkClick);
  },
  unmounted() {
    document.removeEventListener("click", this.checkClick);
  },
};
</script>

<style  lang="scss" scoped>
#search {
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  #user {
    position: absolute;
    right: 0;
    z-index: 3;
    top: 0;
    height: 60px;
    #user-icon {
      margin-right: 10px;
      line-height: 60px;
      font-size: 24px;
      cursor: pointer;
      &:hover {
        color: #409eff;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
      }
    }
    #log-out {
      position: absolute;
      width: 100px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      right: 35px;
      font-size: 15px;
      top: 5px;
      background-color: #fff;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      &:hover {
        color: #409eff;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
      }
    }
  }
}
</style>