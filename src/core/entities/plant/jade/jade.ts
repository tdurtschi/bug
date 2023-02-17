import Victor from "victor";
import { ITreeStruct } from "../ITreeStruct";
import Plant from "../plant";

export class Jade extends Plant {
  protected generateGraph(): ITreeStruct {
    return this.generateGraphRecursive(jadeTree);
  }

  private generateGraphRecursive(
    segment: TreeStructData,
    parent?: PlantSegment,
    depth = 0
  ): PlantSegment {
    const newSegment = new PlantSegment(
      depth,
      parent,
      new Victor(segment.node.x, segment.node.y),
      undefined,
      undefined
    );

    if (segment.children && segment.children.length) {
      newSegment.left = this.generateGraphRecursive(segment.children[0], newSegment, depth + 1);
      
      if(segment.children.length > 1){
        newSegment.right = this.generateGraphRecursive(segment.children[1], newSegment, depth + 1);
      }
    }

    if(segment.flipY){
      newSegment.flipY = true;
    }

    return newSegment;
  }

  public update() {}
}

interface TreeStructData {
  node: {x: number, y: number},
  children?: TreeStructData[],
  flipY?: boolean
}

var jadeTree: TreeStructData = {
  node: { x: 9, y: 92 },
  flipY: true,
  children: [
    { node: { x: 40, y: 8 } },
    {
      node: { x: 1, y: 54 },
      flipY: true,
      children: [
        {
          node: { x: 2, y: 66 },
          flipY: true,
          children: [{ node: { x: -3, y: 33 } }, { node: { x: 66, y: 29 } }],
        },
      ],
    },
  ],
};

class PlantSegment implements ITreeStruct {
  public flipY: boolean = false;

  constructor(
    public depth: number,
    public parent: ITreeStruct,
    public node: Victor,
    public left: PlantSegment | undefined,
    public right: PlantSegment | undefined
  ) {}
}
