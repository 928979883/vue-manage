<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"> </el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.laber}}</el-breadcrumb-item>
              </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span>
                    <img :src="useImg" class="user">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
import { mapState } from 'vuex'
    export default {
        name:'CommonHeader',
        data() {
            return {
                useImg:require('../assets/images/user.png')
            }
        },
        methods: {
            handleMenu(){
                this.$store.commit('collapseMenu')
            }
        },
        computed:{
            ...mapState({
                tags: state =>state.tab.tabsList
            })
        }
    }
</script>
<style lang="less" scoped>
    header{
        display: flex;
        justify-content: space-between;
        height: 100%;
        align-items: center;

    }
    .l-content{
        display: flex;
        align-items: center;
    }
    .el-button{
        margin-right: 20px;
    }
    .r-content .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;

        }
</style>