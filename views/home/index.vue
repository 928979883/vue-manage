<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录的时间：<span>2022-4-27</span></p>
                    <p>上次登录地点：<span>湖南长沙</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px;height: 460px;">
                <el-table :data="tabledata">
                    <el-table-column v-for="(val,key) in tablelebel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px;">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color}"></i>
                    <div class="detail">
                        <p class="num">{{item.value}}</p>
                        <p class="txt">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height: 280px;">
                <!-- <div style="height: 280px;" ref="echarts"></div> -->
                <Echart :chartData='echartData.order' style="height: 280px;"></Echart>
            </el-card>
            <div class="graph">
                <el-card style="height: 260px;">
                    <!-- <div style="height: 260px;" ref="userEcharts"></div> -->
                <Echart :chartData='echartData.user' style="height: 260px;"></Echart>

                </el-card>
                <el-card style="height: 260px;">
                    <!-- <div style="height: 240px;" ref="videoEcharts"></div> -->
                <Echart :chartData='echartData.video' :isAxisChart="false" style="height: 240px;"></Echart>

                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from '../../api/data.js'
// import * as echarts from 'echarts'
import Echart from '../../src/components/Echarts'

export default{
    name: "home",
    components: {
        Echart,
    },
    data() {
        return {
            userImg: require("../../src/assets/images/zy.jpg"),
            countData: [
                {
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ],
            tabledata: [],
            tablelebel: {
                name: "课程",
                todayBuy: "今日购买",
                monthBuy: "本月购买",
                totalBuy: "总购买"
            },
            echartData:{
                order:{
                    xData:[],
                    series: [],
                },
                user:{
                    xData:[],
                    series: [],
                },
                video:{
                    series: [],
                },
            }
        };
    },
    mounted() {
        getData().then(res => {
            const { code, data } = res.data;
            if (code === 20000) {
                this.tabledata = data.tableData;
                const order = data.orderData;
                const xData = order.date;
                const keyArray = Object.keys(order.data[0]);
                const series = [];
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        data: order.data.map(item => item[key]),
                        type: "line"
                    });
                });

                //产品折线图
                const option = {
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    legend: {
                        data: keyArray
                    },
                    series
                };
                // 封装Echarts传值
                this.echartData.order.xData = xData
                this.echartData.order.series = series
                // const E = echarts.init(this.$refs.echarts);
                // E.setOption(option);

                // 用户柱状图
                const userOption = {
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                            color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category",
                        data: data.userData.map(item => item.date),
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333",
                        },
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                    series: [
                        {
                            name: "新增用户",
                            data: data.userData.map(item => item.new),
                            type: "bar",
                        },
                        {
                            name: "活跃用户",
                            data: data.userData.map(item => item.active),
                            type: "bar",
                        }
                    ],
                };
                // 封装Echarts传值
                this.echartData.user.xData = data.userData.map(item => item.date)
                this.echartData.user.series = [
                        {
                            name: "新增用户",
                            data: data.userData.map(item => item.new),
                            type: "bar",
                        },
                        {
                            name: "活跃用户",
                            data: data.userData.map(item => item.active),
                            type: "bar",
                        }
                    ]
                // const U = echarts.init(this.$refs.userEcharts);
                // U.setOption(userOption);

                // 产品饼状图
                const videoOption = {
                    tooltip: {
                        trigger: "item",
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series: [
                        {
                            data: data.videoData,
                            type: "pie"
                        }
                    ],
                };
                // 封装Echarts传值
                this.echartData.video.series = [
                        {
                            data: data.videoData,
                            type: "pie"
                        }
                    ]
                // const V = echarts.init(this.$refs.videoEcharts);
                // V.setOption(videoOption);
            }
            console.log(res);
        });
    },
}
</script>