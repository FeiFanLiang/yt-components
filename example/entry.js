import Vue from "vue";
import VueRouter from "vue-router";
import YTui from "YTui";
import Layout from "./Layout";
import App from "./App";
import ElementUI from 'element-ui';
import DemoBlock from './components/demo-block';
import TestComponent from './docs/test-component.md';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(YTui);
Vue.use(ElementUI);
Vue.component('yt-demo-block',DemoBlock)

const router = new VueRouter({
  routes: [
    {
      name: "index",
      path: "/",
      component: Layout,
    },
    {
      name:"md",
      path:'/md',
      component:TestComponent
    }
  ],
});
Vue.use(VueRouter)

new Vue({ router, render: (h) => h(App) }).$mount("#app");
