# Electron + Next.js 集成指南

## 📋 配置说明

已完成以下配置：

### 1. Next.js 配置 (`next.config.ts`)
- ✅ 设置 `output: 'export'` - 导出为静态文件
- ✅ 配置 `images.unoptimized: true` - 禁用图片优化
- ✅ 设置 `assetPrefix: './'` - 使用相对路径

### 2. Electron 主进程 (`main.js`)
- ✅ 开发环境：加载 `http://localhost:3000`
- ✅ 生产环境：加载 `out/index.html`
- ✅ 自动检测文件是否存在

### 3. 运行脚本 (`package.json`)
- `dev` - 启动 Next.js 开发服务器
- `build` - 构建 Next.js 应用（输出到 `out/` 目录）
- `ele:dev` - 启动 Electron（开发模式，连接到开发服务器）
- `ele:prod` - 启动 Electron（生产模式，加载打包文件）
- `build:electron` - 构建 Next.js 并启动 Electron

## 🚀 使用方法

### 开发模式（推荐）

1. **启动 Next.js 开发服务器**（终端 1）：
   ```bash
   npm run dev
   ```

2. **启动 Electron**（终端 2）：
   ```bash
   npm run ele:dev
   ```

这样你可以享受 Next.js 的热重载功能！

### 生产模式

1. **构建 Next.js 应用**：
   ```bash
   npm run build
   ```

2. **启动 Electron**：
   ```bash
   npm run ele:prod
   ```

或者一键构建并运行：
```bash
npm run build:electron
```

## 📁 输出目录

Next.js 构建后会生成 `out/` 目录，包含所有静态文件：
```
out/
├── index.html
├── _next/
│   ├── static/
│   └── ...
└── ...
```

## ⚠️ 注意事项

1. **开发模式需要两个终端**：
   - 终端 1：运行 `npm run dev`（Next.js 开发服务器）
   - 终端 2：运行 `npm run ele:dev`（Electron）

2. **Next.js 的限制**：
   - 使用 `output: 'export'` 后，某些功能不可用：
     - 服务器端渲染（SSR）
     - API 路由
     - 增量静态再生成（ISR）
   - 需要使用客户端渲染或静态生成

3. **路由问题**：
   - 如果使用 Next.js 路由，确保使用 `<Link>` 组件
   - 避免使用需要服务器端支持的功能

## 🎯 下一步

如果需要打包成安装程序，可以使用：
- `electron-builder`
- `electron-forge`

需要我帮你配置打包工具吗？
