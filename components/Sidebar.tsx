"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PACKAGE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { Library } from "lucide-react"
import playlist from "@/assets/data/playlist.json";
import artist from "@/assets/data/artist.json";
import { useReducer, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LibraryItem } from "./LibraryItem";
import { SiderBarMenu } from "./Siderbar/SiderbarMenu";
import { FiliterMenu } from "./Siderbar/FiliterMenut";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ UTILS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function reducer(_state: 0 | 1 | 2, action: { type: "ALL" | "PLAYLISTS" | "ARTISTS" }) {
  switch (action.type) {
    case "ALL": return 0;
    case "PLAYLISTS": return 1;
    case "ARTISTS": return 2;
    default: throw new Error();
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ MAIN UI ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Sidebar = ({ isCollapsed = false }: { isCollapsed?: boolean }) => {
  const [state, dispatch] = useReducer(reducer, 0);

  // NOTE: 利用 ResizeObserver 监听侧边栏容器的实际像素宽度
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 根据容器真实宽度判定：
  // isNarrow: 宽度不够装下三个操作按钮，开始收纳成汉堡菜单并且隐藏 Your Library 的文字，只留两侧图标水平排列
  const isNarrow = width < 260;
  // isVeryNarrow: 极其狭窄
  const isVeryNarrow = width < 150;

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col h-full w-full ",
        "transition-all duration-300 ease-in-out",
        "overflow-hidden bg-[#121212] rounded-lg",
        (isVeryNarrow && "justify-center gap-3")
      )}
    >

      {/* Header */}
      <div className={cn(
        "group/header flex items-center py-4 px-3 text-zinc-400 shrink-0",
        // 如果极度狭小，我们居中只展示单个库图标。如果没那么窄或者是收纳模式，横向排布并两边推开
        (isCollapsed || isVeryNarrow) ? "justify-center" : "justify-between"
      )}>
        {/* 左侧区域: Library Icon + (按需显示的 Text) */}
        <div className={cn(
          "flex items-center hover:text-white cursor-pointer",
          "transition-colors font-semibold overflow-hidden",
          "gap-2"
        )}>
          <Library className={cn("w-6 h-6 transition-transform shrink-0",
            (isCollapsed || isVeryNarrow) && "w-8 h-8")} />
          {/* 当未折叠且宽度允许时，才显示 Your Library 文字 */}
          {!isVeryNarrow && (<span className="truncate min-w-0">Your Library</span>)}
        </div>

        {/* 右侧区域: 按钮或汉堡菜单 */}
        {!isCollapsed && !isVeryNarrow &&
          <div className="flex items-center shrink-0 text-zinc-400">
            <SiderBarMenu />
          </div>
        }
      </div>

      {/* 歌单过滤选择 */}
      {!isVeryNarrow ? (
        <div className="flex gap-2 px-4 mb-2 overflow-x-auto shrink-0 scrollbar-custom-h">
          {(["ALL", "PLAYLISTS", "ARTISTS"] as const).map((type, idx) => (
            <button
              key={type}
              onClick={() => dispatch({ type })}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold transition-all flex justify-center shrink-0",
                state === idx ? "bg-white text-black" : "bg-[#242424] text-white hover:bg-[#2a2a2a]"
              )}
            >
              {type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center -mt-2">
          <FiliterMenu />
        </div>
      )}

      {/* 曲库 */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-2 scrollbar-custom">
        {(state === 0 || state === 1) &&
          playlist.map((item) => (
            <LibraryItem
              key={item.id}
              {...item}
              isCollapsed={isCollapsed}
            />
          ))}

        {(state === 0 || state === 2) &&
          artist.map((item) => (
            <LibraryItem
              key={item.id}
              {...item}
              isCollapsed={isCollapsed}
            />
          ))}
      </div>
    </div>
  );
};
