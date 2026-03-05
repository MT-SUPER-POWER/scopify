'use client';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PACKAGE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import Header from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { PlayerBar } from "../components/PlayerBar";
import { MockRouterContent } from "../components/MockRouterContent";
import { SearchModal } from "../components/SearchModal";
import { ReactNode, useEffect, useState } from "react";
import { LyricsModal } from "../components/LyricModal";
import { LyricsProvider } from "../components/LyricsContext";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useDefaultLayout } from "react-resizable-panels";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ UI ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function MusicPlayerLayout({
  children,
}: {
  children?: ReactNode;
}) {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ VARIABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // BUG: 不知道为什么还是会走 node.js 去找 localStorage 导致报错，但是功能正确，我就不管了，报错不影响使用，报错也只是再刷新页面的时候出现
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    groupId: "unique-group-id",
    storage: localStorage
  });

  // 全局快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  return (
    <LyricsProvider>
      <div className="w-full h-screen flex flex-col bg-black text-white font-sans overflow-hidden select-none p-2 gap-2">
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <LyricsModal />

        <div className="flex-1 min-h-0 relative">
          <ResizablePanelGroup orientation="horizontal"
            defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged}>
            {/* 左侧侧边栏 */}
            <ResizablePanel
              defaultSize="20%"
              minSize="15%"
              maxSize="40%"
              collapsible
              collapsedSize={80}
              className="bg-[#0f0f0f] rounded-lg overflow-hidden"
            >
              <Sidebar />
            </ResizablePanel>

            {/* 拖拽柄 - 透明但有感应热区 */}
            <ResizableHandle className="w-2 bg-transparent hover:bg-white/5 transition-colors" />

            {/* 右侧主内容 */}
            <ResizablePanel defaultSize={80}>
              <div className="h-full bg-[#121212] rounded-lg relative flex flex-col min-w-0">
                <Header onOpenSearch={() => setIsSearchOpen(true)} />
                <main className="flex-1 overflow-y-auto relative scrollbar-custom">
                  {children ? children : <MockRouterContent />}
                </main>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        <PlayerBar />
      </div>
    </LyricsProvider>
  );
}
