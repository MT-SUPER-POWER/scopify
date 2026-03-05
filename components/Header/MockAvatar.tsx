import React from "react";

/**
 * MockAvatar: 仅在用户未上传头像时显示的占位组件
 */
const MockAvatar = () => (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white hover:scale-105 transition-transform border-[3px] border-black/70 hover:border-zinc-700">
        <div className="w-full h-full rounded-full bg-pink-600 flex items-center justify-center">
            <span className="text-xs font-bold"> M </span>
        </div>
    </div>
);

export default MockAvatar;
