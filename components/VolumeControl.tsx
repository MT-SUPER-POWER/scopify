"use client";

import { useState, useRef, useEffect } from "react";
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react";
import { SmoothSlider } from "./SmoothSlider";

interface VolumeControlProps {
  initialVolume?: number;
  onChange?: (volume: number) => void;
}

export const VolumeControl = ({
  initialVolume = 70,
  onChange,
}: VolumeControlProps) => {
  const [volume, setVolume] = useState(initialVolume);
  const [isMuted, setMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 获取音量图标
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeOff className="w-5 h-5" />;
    } else if (volume < 33) {
      return <Volume className="w-5 h-5" />;
    } else if (volume < 66) {
      return <Volume1 className="w-5 h-5" />;
    } else {
      return <Volume2 className="w-5 h-5" />;
    }
  };

  // 处理音量变化
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setMuted(false);
    }
    onChange?.(newVolume);
  };

  // 处理静音
  const handleMuteToggle = () => {
    setMuted(!isMuted);
    onChange?.(isMuted ? volume : 0);
  };

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Volume Icon Button */}
      <button
        onClick={handleMuteToggle}
        className="text-[#b3b3b3] hover:text-white transition-colors p-1"
      >
        {getVolumeIcon()}
      </button>

      {/* Popup Volume Slider */}
      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 z-50">
          {/* 透明的连接区域，防止鼠标移动时断开 hover */}
          <div className="bg-zinc-900 rounded-lg p-3 shadow-xl border border-zinc-700">
            <div className="flex flex-col items-center gap-2">
              {/* Vertical Slider with Motion */}
              <SmoothSlider
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                orientation="vertical"
                size={100}
                trackThickness={6}
                thumbSize={14}
                thumbOnHover={false}
              />
              {/* Volume Display */}
              <span className="text-xs text-white font-medium tabular-nums">
                {isMuted ? 0 : volume}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
