/**
 * 这里是 东风金融-创格项目本身就有的内容，这个不用管。
 */
import axios from 'axios';
import { baseURL} from './sys.js';
import { MessageBox } from 'element-ui';
import {Base64} from 'js-base64';
import website from '@/website.js'
import Qs from 'qs'

var _axios = axios.create({
    //baseURL: '/api'
    baseURL:baseURL
})

var nowTime = '';

export const getList = (current, size, params) => {
    return request({
        url: '/finance-web/sys/user/list',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}
_axios.interceptors.request.use(
    (config) => {
        nowTime = Date.now()
        let token = sessionStorage.getItem('token')
        config.headers['X-UserToken'] = token // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
        
        // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // let token = sessionStorage.getItem('token')
        // if (token) {
        //     config.headers['X-UserToken'] = token // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
        // }
        return  config
    }, (error) => {
        return Promise.reject(error)
    }
)

_axios.interceptors.response.use(
    (response) => {
        return response.data;
    }, (error) => {
        if (error.response) {

            switch (error.response.status) {

                case 401:
                    vm.$router.push({ path: '/Login' })
                    vm.$message.warning('登录过期')
                    sessionStorage.clear();

                    break;
                case 500:
                    MessageBox.alert('服务器错误', '', {
                        type: 'error'
                    })
                    break;
                case 504:
                    MessageBox.alert('连接服务器超时', '', {
                        type: 'error'
                    })
                    break;
                case 408:
                    MessageBox.alert('请求超时', '', {
                        type: 'error'
                    })
                    break;
                case 404:
                    MessageBox.alert('服务不存在', '', {
                        type: 'error'
                    })
                    break;
                    case 403:
                    vm.$router.push({ path: '/forbidden' })
                    vm.$message.warning('无权限访问')

                        break;
            }

        }
        return Promise.reject(error);
    }
);




export default {
    // 登录
    Login: function(data) {
        return _axios.post("cgrzzl-oauth/auth/getToken", data);
    },

    // 侧栏导航
    getSideNav: function(data) {
        return _axios.post("manage-service/system/menu/list", data);
    },

    // 公共字典接口
    baseSysDic: function(data) {
        return _axios.get(`/manage-service/system/dict/data/dictType/${data}`)
    },


// *******************************************  产品参数管理  *******************************************


    // ---------------------------  费用参数管理  ---------------------------
    //新增 指标参数
    addFactoryTerm: function(data) {
        return _axios.post("/factory-service/factory/term", data)
    },

    // 删除指标参数
    deleteFactoryTerm: function(data) {
        return _axios.delete(`factory-service/factory/term/${data}`)
    },
    
    //修改 指标参数
    updateFactoryTerm: function(data) {
        return _axios.put("/factory-service/factory/term", data)
    },

    //修改 指标参数状态
    upDateFactoryTermStatus: function(data) {
        return _axios.put("/factory-service/factory/term/onOrOff", data, { params: data });
    },

    // 指标参数列表
    getFactoryTermList: function(params) {
        return _axios.get("/factory-service/factory/term/list", { params: params })
    },
    
    // 查询指标参数详情
    getFactoryTermDetail: function(id) {
        return _axios.get(`/factory-service/factory/term/${id}`)
    },


    // ---------------------------  费用参数管理  ---------------------------
    //新增 指标参数
    addRepaymentInterval: function(data) {
        return _axios.post("/factory-service/factory/repaymentInterval", data)
    },

    // 删除指标参数
    deleteRepaymentInterval: function(data) {
        return _axios.delete(`factory-service/factory/repaymentInterval/${data}`)
    },
    
    //修改 指标参数
    updateRepaymentInterval: function(data) {
        return _axios.put("/factory-service/factory/repaymentInterval", data)
    },

    //修改 指标参数状态
    upDateRepaymentIntervalStatus: function(data) {
        return _axios.put("/factory-service/factory/repaymentInterval/onOrOff", data, { params: data });
    },

    // 指标参数列表
    getRepaymentIntervalList: function(params) {
        return _axios.get("/factory-service/factory/repaymentInterval/list", { params: params })
    },
    
    // 查询指标参数详情
    getRepaymentIntervalDetail: function(id) {
        return _axios.get(`/factory-service/factory/repaymentInterval/${id}`)
    },


    // ---------------------------  费用参数管理  ---------------------------
    //新增 指标参数
    addFactoryCost: function(data) {
        return _axios.post("/factory-service/factory/cost", data)
    },

    // 删除指标参数
    deleteFactoryCost: function(data) {
        return _axios.delete(`factory-service/factory/cost/${data}`)
    },
    
    //修改 指标参数
    updateFactoryCost: function(data) {
        return _axios.put("/factory-service/factory/cost", data)
    },

    //修改 指标参数状态
    upDateFactoryCostStatus: function(data) {
        return _axios.put("/factory-service/factory/cost/onOrOff", data, { params: data });
    },

    // 指标参数列表
    getFactoryCostList: function(params) {
        return _axios.get("/factory-service/factory/cost/list", { params: params })
    },
    
    // 查询指标参数详情
    getFactoryCostDetail: function(id) {
        return _axios.get(`/factory-service/factory/cost/${id}`)
    },


    // ---------------------------  指标参数管理  ---------------------------
    //新增 指标参数
    addFactoryTarget: function(data) {
        return _axios.post("/factory-service/factory/target", data)
    },

    // 删除指标参数
    deleteFactoryTarget: function(data) {
        return _axios.delete(`factory-service/factory/target/${data}`)
    },
    
    //修改 指标参数
    updateFactoryTarget: function(data) {
        return _axios.put("/factory-service/factory/target", data)
    },

    //修改 指标参数状态
    upDateFactoryTargetStatus: function(data) {
        return _axios.put("/factory-service/factory/target/onOrOff", data, { params: data });
    },

    // 指标参数列表
    getFactoryTargetList: function(params) {
        return _axios.get("/factory-service/factory/target/list", { params: params })
    },
    
    // 查询指标参数详情
    getFactoryTargetDetail: function(id) {
        return _axios.get(`/factory-service/factory/target/${id}`)
    },


    // ---------------------------  贴息机构管理  ---------------------------
    //新增 贴息机构
    addDiscountAgency: function(data) {
        return _axios.post("/factory-service/factory/discountAgency", data)
    },

    // 删除贴息机构
    deleteDiscountAgency: function(data) {
        return _axios.delete(`/factory-service/factory/discountAgency/${data}`)
    },
    
    //修改 贴息机构
    updateDiscountAgency: function(data) {
        return _axios.put("/factory-service/factory/discountAgency", data)
    },

    //修改 贴息机构状态
    upDateDiscountAgencyStatus: function(data) {
        return _axios.put("/factory-service/factory/discountAgency/onOrOff/", data, { params: data });
    },

    // 贴息机构列表
    getDiscountAgencyList: function(params) {
        return _axios.get("/factory-service/factory/discountAgency/list", { params: params })
    },
   
    // 查询贴息机构详情
    getDiscountAgencyDetail: function(id) {
        return _axios.get(`/factory-service/factory/discountAgency/${id}`)
    },

}
