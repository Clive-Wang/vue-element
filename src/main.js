// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 多语言
import i18n from './i18n/i18n'

// 阿里矢量图
import './assets/iconfont/iconfont.css' 

// 顶部加载条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 请求
import qs from "qs"
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.HOST = '/ms'

 axios.defaults.baseURL = 'http://localhost:5005/';
 axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function(config) {

	if (config.method == "post") {
		config.data = qs.stringify(config.data)
	}

	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {

	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

NProgress.configure({     
    easing: 'ease',  // 动画方式    
    speed: 500,  // 递增进度条的速度    
    showSpinner: false, // 是否显示加载ico    
    trickleSpeed: 200, // 自动递增间隔    
    minimum: 0.3 // 初始化时的最小百分比
})

//当路由进入前
 router.beforeEach((to, from , next) => {
     // 每次切换页面时，调用进度条
    NProgress.start();
    // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
     next();
 });
//当路由进入后：关闭进度条
router.afterEach(() => {  
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
