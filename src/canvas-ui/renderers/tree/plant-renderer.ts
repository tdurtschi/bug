import { fixY } from "../../canvas-helpers"
import Plant from "../../../entities/plant/plant"
import { ITreeStruct } from "../../../entities/plant/ITreeStruct"
import { PlantagoStruct } from "../../../entities/plant/plantagoStruct"

const leafReference = require("./Leaf.png")
const leaf = new Image()
leaf.src = leafReference

const preRenderedPlants: OffscreenCanvas[] = []

type EitherCanvasContext =
  | OffscreenCanvasRenderingContext2D
  | CanvasRenderingContext2D

export default (plant: Plant, ctx: CanvasRenderingContext2D) => {
  if (preRenderedPlants[plant.id]) {
    drawPreRenderedPlant(plant, ctx)
  } else {
    const plantCanvas = new OffscreenCanvas(ctx.canvas.width, ctx.canvas.height)
    preRenderedPlants[plant.id] = plantCanvas
    drawPlantToCanvas(plant, plantCanvas.getContext("2d"))
  }
}

const drawPlantToCanvas = (plant: Plant, ctx: EitherCanvasContext) => {
  const { pos } = plant
  ctx.save()
  ctx.strokeStyle = "#a56a27"
  ctx.lineWidth = 10
  ctx.translate(pos.x, fixY(ctx, pos.y))
  renderTree(plant.graph, ctx)
  ctx.restore()
}

const drawPreRenderedPlant = (plant: Plant, ctx: CanvasRenderingContext2D) => {
  const rendered = preRenderedPlants[plant.id]
  ctx.drawImage(rendered, 0, 0, ctx.canvas.width, ctx.canvas.height)
}

const renderTree = (root: ITreeStruct, ctx: EitherCanvasContext) => {
  if (root instanceof PlantagoStruct) {
    renderLeaf(root, ctx)
  } else {
    renderBranch(root, ctx)
  }
}

const renderBranch = (root: ITreeStruct, ctx: EitherCanvasContext) => {
  const x = Math.floor(root.node.x),
    y = Math.floor(root.node.y)
  ctx.moveTo(0, 0)
  ctx.lineTo(x, -y)
  ctx.stroke()

  ctx.save()
  ctx.translate(x, -y)
  if (root.left) {
    renderTree(root.left, ctx)
  }
  if (root.right) {
    renderTree(root.right, ctx)
  }
  ctx.restore()
}

const renderLeaf = (root: ITreeStruct, ctx: EitherCanvasContext) => {
  const x = Math.floor(root.node.x),
    y = Math.floor(root.node.y)

  ctx.save()
  if (window.DEBUG) {
    ctx.moveTo(0, 0)
    ctx.lineTo(x, -y)
    ctx.stroke()
  }
  ctx.rotate(-root.node.angle() + Math.PI / 2)
  ctx.drawImage(leaf, -24, -173, 42, 178)
  ctx.restore()
}
