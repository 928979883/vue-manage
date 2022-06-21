import axios from "./axios";
// 所有接口请求

export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}

export const getUser = (params) =>{
    return axios.request({
        url:'/user/getUser',
        methods:'get',
        params
    })
}

export const getMenu = (param) =>{
    return axios.request({
        url:'/permission/getMenu',
        methods:'post',
        data:param
    })
}