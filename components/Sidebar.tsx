"use client";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PACKAGE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { Library, Plus, ArrowRight } from "lucide-react";
import playlist from "@/assets/data/playlist.json";
import artist from "@/assets/data/artist.json";
import { LibraryItem } from "./LibraryItem";
import { useReducer, useState } from "react";
import { PanelLeftClose } from "lucide-react";
import { cn } from "@/lib/utils";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CONSTANTS & UTILS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function reducer(
  _state: 0 | 1 | 2,
  action: { type: "ALL" | "PLAYLISTS" | "ARTISTS" },
) {
  switch (action.type) {
    case "ALL":
      return 0;
    case "PLAYLISTS":
      return 1;
    case "ARTISTS":
      return 2;
    default:
      throw new Error();
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ UI ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const Sidebar = () => {
  const [state, dispatch] = useReducer(reducer, 0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // 根据是否折叠动态调整宽度和对齐样式
    <div className={cn(
      "flex flex-col h-full transition-all duration-300 ease-in-out overflow-hidden",
      isCollapsed ? "w-18 items-center" : "w-full"
    )}>
      {/* 顶部工具栏 */}
      <div className={cn(
        "group/header flex items-center p-4 text-zinc-400 shrink-0 gap-2 w-full",
        isCollapsed ? "flex-col gap-4" : "justify-between"
      )}>
        {/* Logo 和 收纳按钮 */}
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors font-semibold relative overflow-visible"
        >
          {/* 收纳按钮：仅在非折叠状态且 hover 时显示 */}
          {!isCollapsed && (
            <div className="hidden sm:block absolute -left-1 opacity-0 group-hover/header:opacity-100 transition-all duration-300 pointer-events-none group-hover/header:pointer-events-auto">
              <PanelLeftClose className="w-5 h-5 hover:scale-110 active:scale-95 transition-transform" />
            </div>
          )}

          {/* 图标和文字 */}
          <div className={cn(
            "flex items-center gap-2 transition-all duration-300",
            !isCollapsed && "sm:group-hover/header:translate-x-7"
          )}>
            <Library className={cn("w-6 h-6 transition-transform", isCollapsed && "hover:scale-110 text-white")} />
            {!isCollapsed && <span className="truncate">Your Library</span>}
          </div>
        </div>

        {/* 右侧按钮：即使收纳，也保留核心功能，改为垂直排列或紧凑布局 */}
        <div className={cn("flex items-center gap-2", isCollapsed ? "flex-col" : "")}>
          <button className="hover:text-white hover:bg-[#1a1a1a] rounded-full p-1.5 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          {!isCollapsed && (
            <button className="hover:text-white hover:bg-[#1a1a1a] rounded-full p-1.5 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Pills：收纳时改为垂直的小点或极简图标，或者保留 All/PL/AR 的首字母 */}
      <div
        className={cn(
          "flex gap-2 px-4 mb-2 overflow-x-auto shrink-0 transition-all duration-300",
          isCollapsed ? "flex-col items-center px-0" : "flex-row [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        )}
      >
        <button
          onClick={() => dispatch({ type: "ALL" })}
          className={cn(
            "rounded-full text-xs font-bold transition-all flex items-center justify-center shrink-0",
            isCollapsed ? "w-8 h-8" : "px-3 py-1.5",
            state === 0 ? "bg-white text-black" : "bg-[#242424] text-white hover:bg-[#2a2a2a]"
          )}
          title="All"
        >
          {isCollapsed ? "A" : "All"}
        </button>
        <button
          onClick={() => dispatch({ type: "PLAYLISTS" })}
          className={cn(
            "rounded-full text-xs font-bold transition-all flex items-center justify-center shrink-0",
            isCollapsed ? "w-8 h-8" : "px-3 py-1.5",
            state === 1 ? "bg-white text-black" : "bg-[#242424] text-white hover:bg-[#2a2a2a]"
          )}
          title="Playlists"
        >
          {isCollapsed ? "P" : "Playlists"}
        </button>
        <button
          onClick={() => dispatch({ type: "ARTISTS" })}
          className={cn(
            "rounded-full text-xs font-bold transition-all flex items-center justify-center shrink-0",
            isCollapsed ? "w-8 h-8" : "px-3 py-1.5",
            state === 2 ? "bg-white text-black" : "bg-[#242424] text-white hover:bg-[#2a2a2a]"
          )}
          title="Artists"
        >
          {isCollapsed ? "R" : "Artists"}
        </button>
      </div>

      {/* Library List */}
      <div
        className={cn(
          "flex-1 overflow-y-auto px-2 space-y-2 pb-2 scrollbar-none transition-all duration-300",
          isCollapsed ? "px-0" : ""
        )}
      >
        {/* ...existing code... */}

        {(state === 0 || state === 1) &&
          playlist.map((item) => (
            <LibraryItem
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              coverImg={item.coverImg}
              isCollapsed={isCollapsed}
            />
          ))}

        {(state === 0 || state === 2) &&
          artist.map((item) => (
            <LibraryItem
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              coverImg={item.coverImg}
              isCollapsed={isCollapsed}
            />
          ))}
      </div>
    </div>
  );
};
