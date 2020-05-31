import { fixY, EitherCanvasContext } from "../../canvas-helpers"
import Plant from "../../../entities/plant/plant"
import { ITreeStruct } from "../../../entities/plant/ITreeStruct"
import { PlantagoStruct } from "../../../entities/plant/plantagoStruct"

const leaf = loadLeafAsset()
const preRenderedPlants: OffscreenCanvas[] = []

export default (plant: Plant, ctx: CanvasRenderingContext2D) => {
  if (preRenderedPlants[plant.id]) {
    drawPreRenderedPlant(plant, ctx)
  } else {
    const offscreenCanvas = new OffscreenCanvas(
      ctx.canvas.width,
      ctx.canvas.height
    )
    drawPlantToCanvas(plant, offscreenCanvas.getContext("2d"))
    preRenderedPlants[plant.id] = offscreenCanvas
  }
}

const drawPreRenderedPlant = (plant: Plant, ctx: CanvasRenderingContext2D) => {
  const rendered = preRenderedPlants[plant.id]
  ctx.drawImage(rendered, 0, 0, ctx.canvas.width, ctx.canvas.height)
}

const drawPlantToCanvas = (plant: Plant, ctx: EitherCanvasContext) => {
  const { pos } = plant
  ctx.save()
  ctx.strokeStyle = "#a56a27"
  ctx.lineWidth = 10
  ctx.translate(pos.x, fixY(ctx, pos.y))
  renderPlantRecursively(plant.graph, ctx)
  ctx.restore()
}

const renderPlantRecursively = (
  root: ITreeStruct,
  ctx: EitherCanvasContext
) => {
  if (root instanceof PlantagoStruct) {
    renderLeaf(root, ctx)
  } else {
    renderBranch(root, ctx)
    renderBranchChildren(root, ctx)
  }
}

const renderBranch = (root: ITreeStruct, ctx: EitherCanvasContext) => {
  const x = Math.floor(root.node.x),
    y = Math.floor(root.node.y)
  ctx.moveTo(0, 0)
  ctx.lineTo(x, -y)
  ctx.stroke()
}

const renderBranchChildren = (root: ITreeStruct, ctx: EitherCanvasContext) => {
  const x = Math.floor(root.node.x),
    y = Math.floor(root.node.y)
  ctx.save()
  ctx.translate(x, -y)
  if (root.left) {
    renderPlantRecursively(root.left, ctx)
  }
  if (root.right) {
    renderPlantRecursively(root.right, ctx)
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

function loadLeafAsset(): HTMLImageElement {
  const leaf = new Image()
  leaf.src = require("./Leaf.png")
  return leaf
}
