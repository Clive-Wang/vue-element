<template>
  <div class="layout">
    <el-container>
      <el-aside :width="elAsideWidth">
          <div v-if="bigLogo" style="height:60px;width:200px;background-color:#263445;line-height: 60px;;color:#fff">
            <img src="../assets/logo.gif" style="height: 40px;width: 40px;margin-top: 10px;margin-left: 26px;border-radius: 50%;" alt="">
            <div style="float:right;margin-right: 30px;">{{$t('message.logotit')}}</div>
          </div>
          <div v-else style="height:60px;width:64px;background-color:#263445">
            <img src="../assets/logo.gif" style="height: 40px;width: 40px;margin-top: 10px;border-radius: 50%;margin-left: 10px;" alt="">
          </div>
          <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" @select="handleSelect" background-color="#263445" :default-active="activeIndex" text-color="#fff" :collapse-transition="false" :router="true">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{$t('menu.menu1')}}</span>
              </template>
                <el-menu-item index="/layout/hello">{{$t('menu.menu11')}}</el-menu-item>
              <el-submenu index="1-4">
                <span slot="title">{{$t('menu.menu12')}}</span>
                <el-menu-item index="/layout/user/advfe">{{$t('menu.menu121')}}</el-menu-item>
                <el-menu-item index="/layout/user/12334">{{$t('menu.menu122')}}</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="/layout/home">
              <i class="el-icon-menu"></i>
              <span slot="title">{{$t('menu.menu2')}}</span>
            </el-menu-item>
            <el-menu-item index="/layout/about">
              <i class="el-icon-setting"></i>
              <span slot="title">{{$t('menu.menu3')}}</span>
            </el-menu-item>
          </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px;border-bottom: 1px solid #dedede;">
          <div class="iblock" @click="collClick">
            <i :class="menuClass"></i>
          </div>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="float:left;margin:22px 0 0 30px;">
              <el-breadcrumb-item :to="{ path : '/layout/hello'}">{{$t('menu.home')}}</el-breadcrumb-item>
              <el-breadcrumb-item 
                v-for="item in breadcrumbList" 
                :to="item.path"
                :key="item.path.path"
              >
              {{ item.name }}  
              </el-breadcrumb-item>
            </el-breadcrumb>
          <div class="block" style="padding-top: 10px;height: 40px;">
            <colorTheme />
          </div>
          <div class="block">
            <el-dropdown @command="command0">
              <span class="el-dropdown-link">
                {{$t('top.setting')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/login">{{$t('top.logout')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="block">
            <el-dropdown @command="command1">
            <span class="el-dropdown-link">
              {{ langType }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="中文">中文</el-dropdown-item>
              <el-dropdown-item command="English">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
          <div class="block">
            <i :class="fullClass" @click="handleFullScreen" style="font-size:22px;color:#000"></i>
          </div>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import colorTheme from "./Theme";
export default {
  name: 'Layout',
  data() {
      return {
        activeIndex: '/layout/hello' ,
        isCollapse: false ,
        langType : "中文" ,
        menuClass : 'iconfont icon-outdent',
        fullClass : 'iconfont icon-fullscreen' ,
        fullscreen : false,
        bigLogo : true,
        elAsideWidth:"201px",
        breadcrumbList:[]
      }
    },
    components:{
      colorTheme
    },
    watch: {
      $route (to,from){
          // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
          this.activeIndex = to.path ;
          this.breadcrumbList = [{
            name:to.name,
            path:{
              path: to.path
            }
          }];
      }
    },
    mounted(){
        var langs = localStorage.getItem('langs');
        this.$i18n.locale = langs; 
        if(langs == "en"){
            this.langType = 'English'; 
          }else{
            this.langType = '中文'; 
          }
    },
    methods:{
        handleSelect(key, keyPath) {
          console.log(key);
          console.log(keyPath);
        },
        collClick(){
          this.isCollapse = !this.isCollapse;
          this.bigLogo = !this.bigLogo ;
          this.menuClass = this.isCollapse?"iconfont icon-indent":"iconfont icon-outdent";
          this.elAsideWidth = this.isCollapse?"66px":"201px";
        },
        command0(command){
          this.$router.push(command);
        },
        command1(command){
          this.langType = command ;
          if(this.langType == "English"){
            this.$i18n.locale = 'en'; 
            this.$message({
              message: this.$i18n.messages.en.message.langchg ,
              type: 'success'
            });
          }else{
            this.$i18n.locale = 'cn'; 
            this.$message({
              message: this.$i18n.messages.cn.message.langchg ,
              type: 'success'
            });
          }
          localStorage.setItem('langs',this.$i18n.locale);
        },
        handleFullScreen(){
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.$router.push(this.$route.path);
            this.fullscreen = !this.fullscreen;
            this.fullClass = this.fullscreen?"iconfont icon-fullscreen-exit":"iconfont icon-fullscreen";
        }
    }
}
</script>

<style>
.el-container {
  height: -webkit-fill-available;
}
.el-aside{

}
.el-main{
  padding:0;
}
  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    padding: 0 20px 0 0;
  }
  
  .el-aside {
    color: #333;
  }
  .el-menu{
    border-right: none;
    background-color: rgb(0, 110, 159);
    height: calc(100% - 60px);
  }
  .el-menu-demo{
    float: left;
  }
  .block{
    float: right;
    margin-left: 40px;
  }
  .el-color-picker__trigger{
    border: none;
  }
  .el-dropdown-link{
    color: #000;
  }
.iblock{
    float: left;
    color: #000;
}
.iblock i{
      font-size: 24px;
    line-height: 60px;
}
.el-tabs__header{
  margin: 0 10px 0 0px;
}
</style>
