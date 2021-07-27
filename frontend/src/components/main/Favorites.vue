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
              >
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

        <!-- 编辑的详细对话框 -->
        <el-dialog
          title="编辑"
          v-model="ifEditDialogVisible"
          :width="widthResponsive"
        >
          <el-form :model="editCardData">
            <!-- 名称 -->
            <el-form-item label="名称">
              <el-input
                v-model="editCardData.title"
                placeholder="请输入网站名称"
              ></el-input>
            </el-form-item>
            <!-- 地址 -->
            <el-form-item label="地址">
              <el-input
                v-model="editCardData.address"
                placeholder="请输入网站地址"
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
                v-model="editCardData.icon"
                :disabled="ifAutoIconAddress"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="ifEditDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editCard">确 定</el-button>
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
            <!-- 编辑点击区域 -->
            <div class="edit-click" @click="enterEditDialog(index)"></div>
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
              <div class="f-card-container">
                {{ item.title }}
              </div>

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
import { ElMessage } from "element-plus";
export default {
  name: "Favorites",
  data() {
    return {
      favoritesData: [],
      ifCardEdit: false,
      ifDialogVisible: false,
      ifEditDialogVisible: false,
      newCardData: {
        title: "",
        address: "",
        icon: "",
      },
      editCardData: {
        title: "",
        address: "",
        icon: "",
      },
      ifShowfavorites: true,
      ifAutoIconAddress: true,
      errorImage: "this.hidden=true",
      widthResponsive: "70%",
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
      this.newCardData.address = this.repairPrefix(this.newCardData.address);
      this.newCardData.icon = this.repairPrefix(this.newCardData.icon);
      this.favoritesData.push(this.newCardData);
      localStorage.setItem("favorites", this.favoritesData);
      this.postFavoritesToServer();
    },
    // 修改一个收藏
    editCard(index) {
      this.favoritesData[index] = this.editCardData;
      this.ifEditDialogVisible = false;
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
      })
        .then((res) => {
          if (res.code === 0) {
            this.favoritesData = res.msg.favorites;
            this.ifShowfavorites = false;
            ElMessage.success({
              message: "同步成功",
              type: "success",
            });
          } else {
            throw "err";
          }
        })
        .catch(() => {
          ElMessage.error({
            message: "同步失败",
            type: "error",
          });
        });
    },
    openURL(address) {
      if (!this.ifCardEdit) {
        window.open(address);
      }
    },
    enterEditDialog(index) {
      if (this.ifCardEdit) {
        this.ifEditDialogVisible = true;
        this.editCardData = this.favoritesData[index];
      }
    },

    repairPrefix(address) {
      if (
        address !== null &&
        typeof address !== undefined &&
        address.trim() !== ""
      ) {
        if (!/\/\//.test(address)) {
          address = "http://" + address;
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
    position: relative;
    .edit-click {
      position: absolute;
      z-index: 3;
      width: calc(100% - 32px);
      height: 50px;
    }
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