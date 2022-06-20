import Vue from 'vue'
import App from './App.vue'
//按需引入第一步
import { Button,Container,Main,Header,Aside,Menu,Submenu,MenuItemGroup,MenuItem,Dropdown,DropdownMenu,DropdownItem,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem} from 'element-ui';
//import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入less
import './assets/less/index.less'


import router from '../router'
import store from '../store'
import http from 'axios'
import '../api/mock'

Vue.config.productionTip = false
//全局引入
//Vue.use(ElementUI)
//按需引入第二步
Vue.use(Button)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

Vue.prototype.$http = http


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
