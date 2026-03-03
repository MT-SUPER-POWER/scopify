/**
 * -----------------------------------------------
 * NOTE: API 服务模块
 * -----------------------------------------------
 * 请你修改 .env. 的 BACKEND_URL 为真实后端地址即可。
 * 下面这些就是请求接口的案例，模仿这个去拓展你的接口业务
 * -----------------------------------------------
 */


import apiClient from './client';
import type {
    ApiResponse, User, Product, LoginRequest, RegisterRequest,
    AuthResponse, PaginatedData, ProductQuery
} from '@/types/api';

// 认证相关API
export const authApi = {
    login: (data: LoginRequest) =>
        apiClient.post<ApiResponse<AuthResponse>>('/api/auth/login', data),

    register: (data: RegisterRequest) =>
        apiClient.post<ApiResponse<AuthResponse>>('/api/auth/register', data),

    getCurrentUser: () =>
        apiClient.get<ApiResponse<User>>('/api/auth/me'),

    logout: () =>
        apiClient.post<ApiResponse<null>>('/api/auth/logout'),
};

// 用户管理API
export const userApi = {
    getUsers: () =>
        apiClient.get<ApiResponse<PaginatedData<User>>>('/api/users'),

    getUserById: (id: number) =>
        apiClient.get<ApiResponse<User>>(`/api/users/${id}`),

    createUser: (data: Partial<User>) =>
        apiClient.post<ApiResponse<User>>('/api/users', data),

    updateUser: (id: number, data: Partial<User>) =>
        apiClient.put<ApiResponse<User>>(`/api/users/${id}`, data),

    deleteUser: (id: number) =>
        apiClient.delete<ApiResponse<null>>(`/api/users/${id}`),
};

// 产品相关API
export const productApi = {
    // 获取产品列表
    getProducts: (query?: ProductQuery) =>
        apiClient.get<ApiResponse<PaginatedData<Product>>>('/api/products', { params: query }),

    // 获取产品详情
    getProductById: (id: number) =>
        apiClient.get<ApiResponse<Product>>(`/api/products/${id}`),

    // 获取产品分类
    getCategories: () =>
        apiClient.get<ApiResponse<string[]>>('/api/categories'),
};

// 导出所有 API，以便于外部访问
export default {
    auth: authApi,
    user: userApi,
    product: productApi,
};
