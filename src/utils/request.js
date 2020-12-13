import axios from 'axios'
import { Message } from 'element-ui'

const BASE = process.env.NODE_ENV === 'production' ? '' : '/devApi'

const service = axios.create({
  baseURL: BASE,
  timeout: 15000
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    console.log('拦截器', response)
    const data = response.data
    const { meta } = data
    if (meta.status !== 200) {
      Message.error(meta.msg)
      return Promise.reject(meta)
    } else {
      window.sessionStorage.setItem('token', data.data.token)
      return data
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default service
