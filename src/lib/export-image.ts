"use client";

import { toPng } from "html-to-image";

export async function exportCardNode(node: HTMLElement, width: number, height: number) {
  return toPng(node, {
    width,
    height,
    cacheBust: true,
    pixelRatio: 1,
    backgroundColor: "#ffffff",
    canvasWidth: width,
    canvasHeight: height,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: "none",
    },
  });
}
