export type EitherCanvasContext =
  | OffscreenCanvasRenderingContext2D
  | CanvasRenderingContext2D;

export function fixY(height: number, y: number) {
  return height - y;
}

export const clearCanvas = (ctx: EitherCanvasContext) => {
  ctx.canvas;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
};

// Draws a circle at 0,0. Useful for debugging bug rendering
export const circle = (ctx: EitherCanvasContext, size: number) => {
  ctx.beginPath();
  ctx.fillStyle = "rgb(0, 0, 255)";
  ctx.arc(0, 0, size, 0, 2 * Math.PI, false);
  ctx.fill();
};

export function horizLine(ctx: CanvasRenderingContext2D, length: number) {
  ctx.beginPath();
  ctx.fillStyle = "rgb(0, 0, 255)";
  ctx.moveTo(0, 0);
  ctx.lineTo(length, 0);
  ctx.stroke();
}
