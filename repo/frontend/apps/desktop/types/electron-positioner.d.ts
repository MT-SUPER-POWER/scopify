declare module "electron-positioner" {
  import type { BrowserWindow, Rectangle } from "electron";

  export type Position =
    | "trayLeft"
    | "trayBottomLeft"
    | "trayRight"
    | "trayBottomRight"
    | "trayCenter"
    | "trayBottomCenter"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "topCenter"
    | "bottomCenter"
    | "leftCenter"
    | "rightCenter"
    | "center";

  export interface PositionCoords {
    x: number;
    y: number;
  }

  export default class Positioner {
    constructor(browserWindow: BrowserWindow);
    move(position: Position, trayBounds?: Rectangle): void;
    calculate(position: Position, trayBounds?: Rectangle): PositionCoords;
  }
}
