import { fixY, EitherCanvasContext, circle } from "../../canvas-helpers"
import Plant from "../../../entities/plant/plant"
import { ITreeStruct } from "../../../entities/plant/ITreeStruct"
import { Jade } from "../../../entities/plant/jade/jade"
import { Plantago } from "../../../entities/plant/plantago/plantago"

const leaf = loadLeafAsset()
const jade = loadJadeAsset()
const preRenderedPlants: OffscreenCanvas[] = []

export default (plant: Plant, ctx: CanvasRenderingContext2D) => {
  if(window.OffscreenCanvas != undefined && !window.DEBUG){
    if (preRenderedPlants[plant.id]) {
      drawPreRenderedPlant(plant, ctx)
    } else {
      const offscreenCanvas = new OffscreenCanvas(ctx.canvas.width, ctx.canvas.height)
      preRenderedPlants[plant.id] = offscreenCanvas
      drawPlantToCanvas(plant, offscreenCanvas.getContext("2d") as OffscreenCanvasRenderingContext2D)
    }
  } else {
    drawPlantToCanvas(plant, ctx);
  }
}

const drawPreRenderedPlant = (plant: Plant, ctx: CanvasRenderingContext2D) => {
  const rendered = preRenderedPlants[plant.id]
  ctx.drawImage(rendered, 0, 0, ctx.canvas.width, ctx.canvas.height)
}

const drawPlantToCanvas = (plant: Plant, ctx: EitherCanvasContext) => {
  const { pos } = plant
  ctx.save()
  ctx.translate(pos.x, fixY(ctx.canvas.height, pos.y))
  renderPlantRecursively(plant, plant.graph, ctx)
  ctx.restore()
}

const renderPlantRecursively = (
  plant: Plant,
  root: ITreeStruct,
  ctx: EitherCanvasContext
) => {
  if (plant instanceof Plantago) {
    renderLeaf(root, ctx)
  } else if (plant instanceof Jade) {
    renderJade(root, ctx)
  } else {
    // ctx.strokeStyle = "#a56a27"
    // ctx.lineWidth = 10
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    renderBranch(root, ctx)
    renderBranchChildren(plant, root, ctx)
  }
}

const renderBranch = (root: ITreeStruct, ctx: EitherCanvasContext) => {
  const x = Math.floor(root.node.x),
    y = Math.floor(root.node.y)
  ctx.moveTo(0, 0)
  ctx.lineTo(x, -y)
  ctx.stroke()
}

const renderBranchChildren = (plant: Plant, root: ITreeStruct, ctx: EitherCanvasContext) => {
  const x = Math.floor(root.node.x),
    y = Math.floor(root.node.y)
  ctx.save()
  ctx.translate(x, -y)
  if (root.left) {
    renderPlantRecursively(plant, root.left, ctx)
  }
  if (root.right) {
    renderPlantRecursively(plant, root.right, ctx)
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

function loadJadeAsset(): HTMLImageElement {
  const leaf = new Image()
  leaf.src = require("./jade-3.png")
  return leaf
}

function renderJade(root: ITreeStruct, ctx: EitherCanvasContext) {
  ctx.save()
  ctx.translate(1.1 * jade.width / 2, 0)
  ctx.drawImage(jade, -jade.width, -jade.height, jade.width, jade.height)
  ctx.translate(-1.1 * jade.width / 2, 0)
  if(window.DEBUG){
    renderBranch(root, ctx)
    renderBranchChildren(undefined, root, ctx)
  } 
  ctx.restore()
}

