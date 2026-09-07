import type { BrowserWindow, Point, Rectangle } from "electron";

export interface TrayOptions {
  onMainWindowRequested?(): Promise<void> | void;
}

export interface TrayPanelOptions {
  window: Pick<
    BrowserWindow,
    | "isDestroyed"
    | "isVisible"
    | "isFocused"
    | "getSize"
    | "setPosition"
    | "show"
    | "hide"
    | "focus"
  >;
  getWorkArea(point: Point): Rectangle;
}
