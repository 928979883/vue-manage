<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545C64" text-color="#fff" active-text-color="#ffd94b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <h3> {{isCollapse ? '后台':'通用后台管理系统'}}</h3>
        <el-menu-item  @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.laber}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :index="item.path+ ''" :key="item.path">
          <template slot="title">
            <i :class="'el-icon-'+item.icon"></i>
            <span slot="title">{{item.laber}}</span>
          </template>
          <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
            <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.laber}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
</template>
<style lang="less" scoped > /* less不影响其他样式 */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-menu{
      height: 100%; 
      border: none;
      h3{
        color: #fff;
        text-align:center;
        line-height:48px;
      }
    }
  </style>
  
  <script>
    export default {
      data() {
        return {
          menu:[
            
          {
              path:'/',
              name:'home',
              laber:'首页',
              icon:'s-home',
              url:'Home/Home'
            },
            {
              path:'/mall',
              name:'mall',
              laber:'商品管理',
              icon:'video-play',
              url:'MallManage/MallManage'
            },
            {
              path:'/user',
              name:'user',
              laber:'用户管理',
              icon:'user',
              url:'UserManage/UserManage'
            },
            {
              laber:'其他',
              icon:'location',
              children:[{
                  path:'/page1',
                  name:'page1',
                  laber:'页面1',
                  icon:'setting',
                  url:'Other/PageOne'
                },
                {
                  path:'/page2',
                  name:'page2',
                  laber:'页面2',
                  icon:'settintg',
                  url:'Other/PageTwo'
                }
            ]
            },
          
          ]
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        clickMenu(item){
          this.$router.push({
            name: item.name
          }).catch(data => {  })
          this.$store.commit('selectMenu', item)
        }
      },
      computed:{
        noChildren(){
            return this.menu.filter(item => !item.children)
        },
        hasChildren(){
            return this.menu.filter(item => item.children)
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        },
        asyncMenu(){
          return this.$store.state.tab.menu
        }
      }
    }
  </script>