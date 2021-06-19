 
import * as VueRouter from 'vue-router';
import auth from '../views/Auth.vue';
import main from '../views/Main.vue';

const routes = [{ path: '/', component: auth },{path:'/index',component:main}];

const router = VueRouter.createRouter({
  //  hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
