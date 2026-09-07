import { describe, expect, test } from "bun:test";
import { createTrayPanelController, getTrayPanelPosition } from "../electron/main/window/trayPanel";

const area = { x: 0, y: 0, width: 1920, height: 1040 };

function setup() {
  let visible = false;
  let focused = false;
  let shows = 0;
  let hides = 0;
  let position = { x: 0, y: 0 };
  const controller = createTrayPanelController({
    getWorkArea: () => area,
    window: {
      isDestroyed: () => false,
      isVisible: () => visible,
      isFocused: () => focused,
      getSize: () => [240, 420],
      setPosition: (x, y) => {
        position = { x, y };
      },
      show: () => {
        visible = true;
        shows++;
      },
      hide: () => {
        visible = false;
        hides++;
      },
      focus: () => {
        focused = true;
      },
    },
  });
  return {
    controller,
    state: () => ({ visible, shows, hides, position }),
    blur: () => {
      focused = false;
      controller.blur();
    },
  };
}

describe("tray position", () => {
  test("opens beside cursor and flips above and left at bottom right", () => {
    expect(getTrayPanelPosition({ x: 100, y: 100 }, [240, 420], area)).toEqual({ x: 108, y: 108 });
    expect(getTrayPanelPosition({ x: 1900, y: 1060 }, [240, 420], area)).toEqual({
      x: 1652,
      y: 612,
    });
  });
  test("clamps all edges on a display with negative coordinates", () => {
    const secondary = { x: -1920, y: -1080, width: 1920, height: 1040 };
    for (const point of [
      { x: -2000, y: -1200 },
      { x: -1, y: -1 },
      { x: -960, y: -500 },
    ]) {
      const pos = getTrayPanelPosition(point, [240, 420], secondary);
      expect(pos.x).toBeGreaterThanOrEqual(-1912);
      expect(pos.x + 240).toBeLessThanOrEqual(-8);
      expect(pos.y).toBeGreaterThanOrEqual(-1072);
      expect(pos.y + 420).toBeLessThanOrEqual(-48);
    }
  });
  test("keeps top left accessible when the display is smaller than the panel", () => {
    expect(
      getTrayPanelPosition({ x: 90, y: 90 }, [240, 420], { x: 0, y: 0, width: 100, height: 100 }),
    ).toEqual({ x: 0, y: 0 });
  });
});

describe("tray visibility", () => {
  test("waits for ready and retains the first click position through duplicate input", () => {
    const { controller, state } = setup();
    controller.requestOpen({ x: 100, y: 100 });
    controller.requestOpen({ x: 400, y: 400 });
    expect(state().shows).toBe(0);
    controller.markReady();
    expect(state().position).toEqual({ x: 108, y: 108 });
    controller.requestOpen({ x: 400, y: 400 });
    expect(state().shows).toBe(1);
    expect(state().hides).toBe(0);
    controller.dispose();
  });
  test("left click cancels an opening queued before readiness", () => {
    const { controller, state } = setup();
    controller.requestOpen({ x: 100, y: 100 });
    controller.hide();
    controller.markReady();
    expect(state().shows).toBe(0);
    controller.dispose();
  });
  test("blur followed by right click does not hide and reopen; outside blur still hides", async () => {
    const { controller, state, blur } = setup();
    controller.markReady();
    controller.requestOpen({ x: 100, y: 100 });
    blur();
    controller.requestOpen({ x: 100, y: 100 });
    await Bun.sleep(300);
    expect(state().shows).toBe(1);
    expect(state().hides).toBe(0);
    blur();
    await Bun.sleep(300);
    expect(state().visible).toBe(false);
    expect(state().hides).toBe(1);
    controller.dispose();
  });
  test("dispose cancels delayed hiding", async () => {
    const { controller, state, blur } = setup();
    controller.markReady();
    controller.requestOpen({ x: 100, y: 100 });
    blur();
    controller.dispose();
    await Bun.sleep(300);
    expect(state().hides).toBe(0);
  });
});
