import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './store'
import router from './router/index.js'
import VueImg from 'v-img'
import 'font-awesome/css/font-awesome.min.css'
import toPath from './util/toPath'
import HeaderBase from './views/base/headerBase.vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import LayoutMainView from "@/components/layout-main-view"
import LayoutMainViewTabs from "@/components/layout-main-view-tabs"
import DataList from "@/components/datalist/DataList"
import basicContainer from './components/basic-container/main'
// import './permission.js'
import axios from 'axios'
// import echarts from 'echarts'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import '@/assets/scss/common.scss'

import Viser from 'viser-vue'

import Vue2OrgTree from 'vue2-org-tree'
// import myVueOrgTree from "./views/cmbdManage/components/org-tree/org-tree.vue";

// Vue.use(myVueOrgTree);
Vue.use(Vue2OrgTree)



import globalFilter from '@/util/filters'

import { changeMoneyThousand } from "@/util/common";

import imgPreview from '@/components/imgPreview'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

//此处引入了echarts防止出现index.html 避免了echarts 报错的问题。
import echarts from 'echarts';

Vue.prototype.$echarts = echarts;


Vue.prototype.$changeMoneyThousand = changeMoneyThousand
Vue.use(Avue);
Vue.use(preview)
Vue.use(Viser)

Vue.use(Viewer)

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueImg)
    // Vue.use(echarts)
Vue.use(changeMoneyThousand)

Vue.use(imgPreview)
axios.defaults.baseURL = ''
Vue.prototype.$axios = axios
    // 注册全局过滤器
Object.keys(globalFilter).forEach(key => {
    Vue.filter(key, globalFilter[key])
})

// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })



Vue.use(HeaderBase);
Vue.component(HeaderBase.name, HeaderBase);
Vue.component(LayoutMainView.name, LayoutMainView);
Vue.component(LayoutMainViewTabs.name, LayoutMainViewTabs);
Vue.component(DataList.name, DataList);
Vue.component('basicContainer', basicContainer)




Vue.filter('timeformat', function(val, tpl) {
    if (!val) return ''
    try {
        return moment(val).format(tpl)
    } catch (e) {
        return val
    }
})
window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
var htmlwidth = document.documentElement.clientWidth || document.body.clientWidth
var htmldom = document.getElementsByTagName('html')[0]
htmldom.style.fontSize = htmlwidth / 10 + 'px'
