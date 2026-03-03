"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PACKAGE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import { PlayerBar } from "../components/PlayerBar";
import { MockRouterContent } from "../components/MockRouterContent";
import { SearchModal } from "../components/SearchModal";
import { ReactNode, useEffect, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { LyricsModal } from "../components/LyricModal";
import { LyricsProvider } from "../components/LyricsContext";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ UI ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function MusicPlayerLayout({
  children,
}: {
  children?: ReactNode;
}) {

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ VARIABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 全局快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 捕获 Ctrl+K 或 Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault(); // 极其重要：阻止浏览器默认的搜索栏跳转行为
        setIsSearchOpen((prev) => !prev);
      }
      // 捕获 ESC 关闭面板
      if (e.key === "Escape" && isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(false); // 直接关闭，不是 toggle
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // 卸载组件时清理监听器，防止内存泄漏
  }, [isSearchOpen]);

  return (
    <LyricsProvider>
      {/* 外层容器：纯黑背景，包含所有模块 */}
      <div className="w-full h-screen flex flex-col bg-black text-white font-sans overflow-hidden select-none">
        {/* 挂载搜索模态框 */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* 歌词模式模态 */}
        <LyricsModal />

        {/* 核心内容区 */}
        <div className="flex-1 flex flex-col overflow-hidden p-2 gap-2 pb-0">
          {/* 使用 Group 实现可拖拽调整大小 */}
          <Group orientation="horizontal" className="h-full">
            {/* 左侧栏 */}
            <Panel defaultSize="20%" minSize="7%" maxSize="25%">
              <div className="h-full bg-[#0f0f0f] rounded-lg overflow-hidden">
                <Sidebar />
              </div>
            </Panel>

            {/* 拖拽调整柄 */}
            <Separator className="w-2 cursor-col-resize relative flex justify-center items-center group transition-all">
              <div className="w-px h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-150" />
            </Separator>

            {/* 右侧主内容 */}
            <Panel>
              <div className="h-full bg-[#121212] rounded-lg relative overflow-hidden flex flex-col min-w-0">
                <Header onOpenSearch={() => setIsSearchOpen(true)} />

                {/* 滚动区域 */}
                <main
                  className="flex-1 overflow-y-auto relative
                  [&::-webkit-scrollbar]:w-3
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-transparent
                  hover:[&::-webkit-scrollbar-thumb]:bg-white/30
                  [&::-webkit-scrollbar-thumb]:border-[3px]
                  [&::-webkit-scrollbar-thumb]:border-[#121212]
                  [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                  {children ? children : <MockRouterContent />}
                </main>
              </div>
            </Panel>
          </Group>
        </div>

        {/* 底部固定播放条 */}
        <PlayerBar />
      </div>
    </LyricsProvider>
  );
}
