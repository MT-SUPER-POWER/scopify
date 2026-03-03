// Electron `preload.js` 暴露给前端的 API 类型声明
interface ElectronAPI {
  on: (channel: string, callback: (...args: unknown[]) => void) => void;
  send: (channel: string, args?: unknown) => void;
  enterFullScreen: () => void;
  exitFullScreen: () => void;
  onFullScreenChanged: (callback: (isFullScreen: boolean) => void) => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export { };
