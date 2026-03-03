interface LibraryItemProps {
  id: string | number;
  title: string;
  subtitle: string;
  coverImg: string;
  isCollapsed: boolean;
}

export const LibraryItem = ({
  title,
  subtitle,
  coverImg,
  isCollapsed,
}: LibraryItemProps) => {
  {/* 如果是收纳状态，只显示一个居中的、稍大一点的封面图 */ }

  if (isCollapsed) {
    return (
      <div className="flex items-center justify-center w-full h-14 hover:bg-[#1a1a1a] rounded-md transition-colors cursor-pointer active:scale-95 group">
        <div className="w-12 h-12 rounded-md overflow-hidden shadow-lg transition-transform group-hover:scale-110">
          <img
            src={coverImg}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 p-2 hover:bg-[#1a1a1a] rounded-md cursor-pointer transition-colors group">
      <div className="w-12 h-12 rounded-md shrink-0 overflow-hidden shadow-md transition-transform group-hover:scale-105">
        <img
          src={coverImg}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col overflow-hidden flex-1">
        <span className="text-white truncate text-base font-normal group-hover:text-white">
          {title}
        </span>
        <span className="text-zinc-400 text-sm truncate mt-0.5">
          {subtitle}
        </span>
      </div>
    </div>
  );
};
