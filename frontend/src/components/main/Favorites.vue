<template>
  <div id="favorites">
    <div class="block">
      <div class="title">
        <!-- 添加 -->
        <div class="addTitle" @click="ifDialogVisible = true">
          <i class="el-icon-plus"></i>
        </div>

        <!-- 编辑 -->
        <div class="editTitle" @click="changeEdit">
          <i class="el-icon-edit-outline" v-if="!ifCardEdit"></i>
          <i class="el-icon-finished" v-if="ifCardEdit"></i>
        </div>

        <!-- 添加的详细对话框 -->
        <el-dialog
          title="添加"
          v-model="ifDialogVisible"
          :width="widthResponsive"
        >
          <el-form :model="newCardData">
            <!-- 名称 -->
            <el-form-item label="名称">
              <el-input
                v-model="newCardData.title"
                placeholder="请输入网站名称"
              ></el-input>
            </el-form-item>
            <!-- 地址 -->
            <el-form-item label="地址">
              <el-input
                v-model="newCardData.address"
                placeholder="请输入网站地址"
              >
                <template #prepend>
                  <el-select
                    v-model="addressPrefix"
                    placeholder="http://"
                    class="prefix-select"
                  >
                    <el-option label="http://" value="1"></el-option>
                    <el-option label="https://" value="2"></el-option>
                    <el-option label="自定义" value="3"></el-option>
                  </el-select> </template
              ></el-input>
            </el-form-item>
            <!-- 图标地址 -->
            <el-form-item label="图标地址">
              <el-switch
                class="icon-auto-switch"
                v-model="ifAutoIconAddress"
                active-text="自动填写"
              >
              </el-switch>
              <el-input
                placeholder="请输入图标地址"
                v-model="newCardData.icon"
                :disabled="ifAutoIconAddress"
                ><template #prepend>
                  <el-select
                    v-model="iconPrefix"
                    placeholder="http://"
                    class="prefix-select"
                  >
                    <el-option label="http://" value="1"></el-option>
                    <el-option label="https://" value="2"></el-option>
                    <el-option label="自定义" value="3"></el-option>
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="ifDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCard">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>

      <el-row v-if="ifShowfavorites">
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
          :xl="6"
          v-for="(item, index) in favoritesData"
          :key="index"
        >
          <!-- 单个网站 -->
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px' }"
            class="f-card"
            @click="openURL(item.address)"
          >
            <!-- 图标 -->
            <div class="img-wrapper">
              <i class="img-err el-icon-s-promotion"></i>
              <img
                :src="item.icon"
                :onerror="errorImage"
                class="f-icon"
                alt=""
              />
            </div>
            <!-- 内容 -->
            <div class="f-card-container-wrapper">
              <div class="f-card-container" v-if="!ifCardEdit">
                {{ item.title }}
              </div>

              <!-- 编辑输入框 -->
              <el-input
                class="f-card-edit"
                v-if="ifCardEdit"
                v-model="item.title"
              >
              </el-input>
              <!-- 删除图标 -->
              <div class="f-card-del" @click="delCard(index)" v-if="ifCardEdit">
                <i class="el-icon-close"></i>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { _getFavorites, _updateFavorites } from "../../api/favor/favor";

export default {
  name: "Favorites",
  data() {
    return {
      favoritesData: [],
      ifCardEdit: false,
      ifDialogVisible: false,
      newCardData: {
        title: "",
        address: "",
        icon: "",
      },
      ifShowfavorites: true,
      ifAutoIconAddress: true,
      errorImage: "this.hidden=true",
      widthResponsive: "70%",
      addressPrefix: "1",
      iconPrefix: "1",
    };
  },
  components: {},
  methods: {
    // 进退编辑模式
    changeEdit() {
      this.ifCardEdit = !this.ifCardEdit;
      // 退出保存
      if (!this.ifCardEdit) {
        localStorage.setItem("favorites", this.favoritesData);
        this.postFavoritesToServer();
      }
    },
    // 删除一个收藏
    delCard(index) {
      this.favoritesData.splice(index, 1);
    },
    // 添加一个收藏
    addCard() {
      this.ifDialogVisible = false;
      this.newCardData.address = this.repairPrefix(
        this.addressPrefix,
        this.newCardData.address
      );
      this.newCardData.icon = this.repairPrefix(
        this.iconPrefix,
        this.newCardData.icon
      );
      this.favoritesData.push(this.newCardData);
      localStorage.setItem("favorites", this.favoritesData);
      this.postFavoritesToServer();
    },
    // 从服务器获取收藏夹
    getFavoritesFromServer() {
      _getFavorites().then((res) => {
        this.favoritesData = res.msg;
      });
    },
    // 上传收藏夹到服务器
    postFavoritesToServer() {
      _updateFavorites({
        userId: null,
        favorites: this.favoritesData,
      }).then((res) => {
        if (res.code === 0) {
          this.favoritesData = res.msg.favorites;
          this.ifShowfavorites = false;
          console.log("同步成功");
        } else {
          console.log("同步失败");
        }
      });
    },
    openURL(address) {
      if (!this.ifCardEdit) {
        window.open(address);
      }
    },
    repairPrefix(prefixVal, address) {
      if (
        address !== null &&
        typeof address !== undefined &&
        address.trim() !== ""
      ) {
        if (prefixVal === "1") {
          address = "http://" + address;
        } else if (prefixVal === "2") {
          address = "https://" + address;
        }
      }
      return address;
    },
    setWidth() {
      if (window.innerWidth < 420) {
        this.widthResponsive = "100%";
      } else if (window.innerWidth < 720) {
        this.widthResponsive = "70%";
      } else {
        this.widthResponsive = "50%";
      }
    },
  },
  mounted() {
    this.setWidth();
    this.getFavoritesFromServer();
    window.addEventListener("resize", this.setWidth);
  },
  watch: {
    // 更新数据后刷新
    ifShowfavorites() {
      this.$nextTick(() => {
        this.ifShowfavorites = true;
      });
    },
  },
  unmounted() {
    window.removeEventListener("resize", this.setWidth);
  },
};
</script>

<style  lang="scss" scoped>
#favorites {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  padding: 20px;
  .title {
    height: 22px;
    justify-content: flex-end;
    display: flex;
    .addTitle {
      text-align: right;
      margin-right: 15px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .editTitle {
      text-align: right;
      margin-right: 5px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }

  .f-card {
    cursor: pointer;
    height: 52px;
    // max-width: 340px;
    min-width: 128px;
    box-sizing: border-box;
    margin: 5px;
  }
  .img-wrapper {
    position: relative;
    .img-err {
      position: absolute;
      color: #2f8be7;
      font-size: 28px;
      width: 32px;
      height: 32px;
      top: 10px;
      left: 10px;
    }
    .f-icon {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 10px;
      left: 10px;
      background: #fff;
    }
  }
  .f-card-container-wrapper {
    height: 52px;
    box-sizing: border-box;
    position: relative;
    padding-left: 52px;
    padding-right: 5px;

    .f-card-container {
      line-height: 52px;
      overflow: hidden;
    }
    .f-card-edit {
      line-height: 52px;
      overflow: hidden;
    }
    .f-card-del {
      position: absolute;
      top: 18px;
      right: 8px;
      background: #fff;
    }
  }

  .icon-auto-switch {
    margin-left: 10px;
  }

  .prefix-select {
    width: 90px;
  }
}
</style>