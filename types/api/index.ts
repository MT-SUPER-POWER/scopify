/**
 * -----------------------------------------------
 * NOTE: API 类型定义模块
 * -----------------------------------------------
 * 该模块定义了所有 API 请求和响应的类型，方便在调用 API 时进行类型检查。
 * -----------------------------------------------
 */

// * API 响应的通用格式
export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

// * 分页数据格式
export interface PaginatedData<T> {
    list: T[];
    total: number;
    page: number;
    pageSize: number;
}

// * --------- 响应返回的数据类型定义 ---------

// 用户相关类型
export interface User {
    id: number;
    username: string;
    email: string;
    role: 'admin' | 'user';
    avatar: string;
    createTime?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

// 产品相关类型
export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
    stock: number;
    status: 'active' | 'inactive';
}

export interface ProductQuery {
    page?: number;
    pageSize?: number;
    category?: string;
    keyword?: string;
}

// HTTP 请求方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 常用状态码
export const StatusCode = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
} as const;
