import axios from 'axios'
 import router from '../router/index.js'
import {Base64} from 'js-base64'
import website from '@/website.js'

function interceptor () {
  axios.interceptors.request.use(
    (config) => {
      // config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
        var token = sessionStorage.getItem('token');
        config.headers={
          'Content-Type':'application/json;charset=UTF-8'
        }
        config.headers.Authorization = token
        return config
      }, (error) => {
        return Promise.reject(error)
      }
  )

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    if(error.response.status==401||error.response.status==403){
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('layoutToken')
      router.push('/login')
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });
}
export default interceptor
