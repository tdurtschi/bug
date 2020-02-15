export function fixY(ctx: CanvasRenderingContext2D, y: number) {
	return ctx.canvas.height - y
}


// Draws a circle at 0,0. Useful for debugging bug rendering
export const circle = (ctx: CanvasRenderingContext2D, size: number) => {
	ctx.beginPath();
	ctx.arc(0, 0, size, 0, 2 * Math.PI, false);
	ctx.fillStyle = "rgb(0, 0, 255)";
	ctx.fill();
}