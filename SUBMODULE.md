# Git Submodule 配置说明

## 项目结构

本项目已将后端 API 配置为 Git Submodule，位置在 `backend/` 目录。

## 第一次克隆项目

使用以下命令克隆项目并自动初始化 submodule：

```bash
git clone --recurse-submodules https://github.com/yourname/momo-music-player.git
cd momo-music-player
```

## 如果已经克隆但没有 submodule

手动初始化 submodule：

```bash
git submodule update --init --recursive
```

## 更新 Submodule 到最新版本

```bash
# 方式 1: 更新特定 submodule
cd backend
git pull origin main
cd ..
git add backend
git commit -m "Update backend submodule to latest version"

# 方式 2: 更新所有 submodule
git submodule update --remote
git add .
git commit -m "Update all submodules"
```

## Submodule 后端信息

- **仓库**: https://github.com/NeteaseCloudMusicApiEnhanced/api-enhanced
- **位置**: `./backend/`
- **目的**: 后端 API 服务，不在主仓库中跟踪

## 注意事项

- ✅ 主仓库中只记录 submodule 的提交 hash，不包含完整代码
- ✅ 减少主仓库体积
- ✅ 后端更新独立管理
- ⚠️ 克隆时需要加 `--recurse-submodules` 标志，或手动初始化

## 关于 .gitmodules

`.gitmodules` 文件已自动生成，包含 submodule 配置信息。

## 问题排查

如果 submodule 出现问题：

```bash
# 检查 submodule 状态
git submodule status

# 重新初始化 submodule
git submodule update --init --recursive --force
```
