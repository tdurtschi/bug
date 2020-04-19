export function fixY(ctx: CanvasRenderingContext2D, y: number) {
	return ctx.canvas.height - y
}


export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
	ctx.canvas
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height)
	ctx.beginPath()
}


// Draws a circle at 0,0. Useful for debugging bug rendering
export const circle = (ctx: CanvasRenderingContext2D, size: number) => {
	ctx.beginPath();
	ctx.fillStyle = "rgb(0, 0, 255)";
	ctx.arc(0, 0, size, 0, 2 * Math.PI, false);
	ctx.fill();
}