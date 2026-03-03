/**
 * -----------------------------------------------
 * NOTE: Axios 封装模块
 * -----------------------------------------------
 *  这里所有的请求都是对应着 MOCK 数据，如果需要对接真实后端接口，
 *  如果你需要对接你的接口，请你修改 .env.production 中的 VITE_API_BASE_URL 为你的后端地址
 *  vite.config.ts proxy 部分也请相应修改
 * -----------------------------------------------
 */

import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiResponse } from '@app-types/api';


// * baseURL 根据生产和开发环境自动切换
const baseURL = process.env.BACKEND_URL || "http://localhost:4000";      // LINK - baseURL 切换变量

// 创建axios实例
// ? 默认配置: https://axios-http.com/zh/docs/config_defaults
const apiClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// * ---------------------- 拦截器 --------------------------
// ? 参考文档: https://axios-http.com/zh/docs/interceptors

// 请求拦截器
apiClient.interceptors.request.use(
    // ? 请求配置: https://axios-http.com/zh/docs/req_config
    (config: InternalAxiosRequestConfig) => {
        // 添加token到请求头
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // ? DEBUG: 输出请求内容 --> GET baseURL/api/xxx
        console.log('🚀 Request:', config.method?.toUpperCase(), baseURL + config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
apiClient.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        console.log('✅ Response:', response.status, response.data);

        // 检查业务状态码
        if (response.data.code && response.data.code !== 200 && response.data.code !== 201) {
            console.warn('⚠️ Business Error:', response.data.message);
            return Promise.reject(new Error(response.data.message));
        }

        return response;
    },
    (error) => {
        console.error('❌ Response Error:', error);

        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    console.warn('🔒 Unauthorized - redirecting to login');
                    localStorage.removeItem('token');
                    break;
                case 403:
                    console.warn('🚫 Forbidden');
                    break;
                case 404:
                    console.warn('📭 Not Found');
                    break;
                case 500:
                    console.error('💥 Server Error');
                    break;
            }

            return Promise.reject(new Error(data?.message || `HTTP ${status} Error`));
        }

        return Promise.reject(error);
    }
);

export default apiClient;
