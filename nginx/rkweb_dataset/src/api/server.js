import axios from "axios";
import {useUuidStore} from '../store/uuidStore'
const uuidStore =useUuidStore()

const axiosDataset = axios.create({
    // baseURL: 'http://127.0.0.1:5000/',
    baseURL: import.meta.env.VITE_APP_WEB_URL,
    timeout: 3000,
    withCredentials: true
  });

  // 添加请求拦截器
axiosDataset.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(uuidStore.logined){
    config.headers['Authorization'] = `Bearer ${uuidStore.access_token}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error);
  });

// 添加响应拦截器
axiosDataset.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
// 封装请求方法
class AxiosService {
    constructor() {
        if (AxiosService.instance) {
            return AxiosService.instance;
        }
        AxiosService.instance = this;
    }

    // GET 请求
    get(url, params = null) {
        return axiosDataset.request({
            method: 'get',
            url,
            params,
        });
    }

    // POST 请求
    post(url, data = null, params = null, responseType) {
        return axiosDataset.request({
            method: 'post',
            url,
            data,
            params,
            responseType
        });
    }

    // PUT 请求
    put(url, data = null, params = null) {
        return axiosDataset.request({
            method: 'put',
            url,
            data,
            params,
        });
    }

    // DELETE 请求      两种方式，可以试下
    delete(url, params = null) {
        return axiosDataset.request({
            method: 'delete',
            url,
            params,
        });
    }

}

// 创建 AxiosService 实例
const axiosService = new AxiosService();

// 导出实例化后的 AxiosService 对象
export default axiosService;
