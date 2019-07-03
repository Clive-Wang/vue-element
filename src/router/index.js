import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/demo/HelloWorld'
// 引入组件
import Layout from "@/components/Layout";
import Login from "@/components/Login";
import Home from "@/components/demo/Home";
import About from "@/components/demo/About";
import User from "@/components/demo/User";
import Phone1 from "@/components/demo/Phone1";
import Phone2 from "@/components/demo/Phone2";
import ErrorPage from "@/components/ErrorPage";

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/', 
        redirect: '/login' 
    },{
      path: '/login',
      component: Login
    },{
      path: '/layout',
      component: Layout,
      redirect: 'layout/hello' ,
      children: [,{
          path: 'hello',
          component: HelloWorld,
          name: 'hello'
        },{
            path:"home",
            component: Home,
            name: 'home',
            // 子路由
            children: [{
                    path: '/', 
                    redirect: 'phone1'
                },{
                    path: "phone1",
                    component: Phone1 ,
                    name: 'home'
                },{
                    path: "phone2",
                    component: Phone2 ,
                    name: 'home'
                }
            ]
        },{
            path: "about",
            component: About,
            name: 'list'
        },{
            path: "user/:id",
            component: User,
            name: 'user'
        }]
    },
    {
        path: '*', 
        component: ErrorPage
    }
  ]
})
