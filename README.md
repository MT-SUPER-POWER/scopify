# README

## 简介

这是一个基于 Next.js + Electron 配合网易云 node.js API 的一个客户端音乐播放器，主要是为了练习前端 UI 和 Electron 的开发。
后端的 API 部分我们直接使用了现成的开源项目，部署也比较简单，后续会考虑自己实现一个后端来对接网易云的接口。

## 技术栈

1. Next.js + React
2. Electron
3. Tailwind CSS
4. shadnCN UI
5. Makefile + k8s + Docker

## 部署方法

### 前端的部署方法

```bash
bun i
bun run dev
```

### 后端的部署方法

> 这里使用 k8s 来部署，我们在 backend 文件中会给出对用的 svc 和 pod 文件，你照着大致修改就好
>
> 我们使用的是这个[仓库](https://github.com/NeteaseCloudMusicApiEnhanced/api-enhanced)以及对应的[API 文档](https://docs-neteasecloudmusicapi.focalors.ltd/#/)
> 记得自己打包 image，如果有 `url.parse()` 出现的报错暂且不理会就好

1. 下载项目，进入项目打包 image

```bash
git clone https://github.com/NeteaseCloudMusicApiEnhanced/api-enhanced
cd api-enhanced
docker build -t netease-api:v1.0.0 ./
```

2. 使用 `Makefile` 部署到 k3s

```bash
make netease_deploy   # 部署
make netease_status   # 查看状态
make netease_undeploy # 卸载
```

## 待做功能

### 样式部分

- ~~ 实现 Your Library 部分滑动调整大小 ~~
- ~~ Your Library 按照 Playlist、Artists 分类显示 ~~
- ~~ 右下角按钮点击开启全屏模式 ~~
- ~~ F11 控制全屏的时候，同步更新全屏按钮状态，这个有点难搞，PC 端涉及到了 ipc 通信 ~~
- ~~ 点击音量喇叭，直接静音，再次点击恢复之前的音量 ~~
- ~~ 点击播放栏的封面，软件全屏歌单播放界面 ~~
- ~~ 侧边栏空间不够的时候做响应式处理：转换排列，专辑只显示封面 ~~
- 给侧边栏最小时候的 Menu 汉堡包按钮里面的找合适的 icon
- 鼠标移动到 icon 显示具体作用的小窗口
- 空间不足的侧边栏只显示封面，鼠标移动到上面显示详细内容

### 动画内容补充

- 音量条出现动画
- 更加丝滑的音量条 | 播放条滑动动画
- ~~ 歌词模态页面从下往上出现，带有弹性动画 ~~

### 接口部分

- ~~ 对接 node.js 网易云 API 后端 ~~
- 搜索框可以搜索内容
- 推荐部分，如果空间不够，播放按钮乱跑问题
- 点击头像实现登录网易云
  1. 二维码登录
  2. 手机号登录 | 短信登录
  3. 账号密码登录 | 校验功能
