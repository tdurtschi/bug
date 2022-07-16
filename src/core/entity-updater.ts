import Entity, { EntityState } from "./entities/entity";
import { IEntityManager } from "./entity-manager";
import Bug from "./entities/bug/bug";
import Victor = require("victor");

export default class EntityUpdater {
  frame: number = 0;

  constructor(private entityManager: IEntityManager) {}

  update() {
    this.updateAllEntities();
    this.frame = this.frame + 1;
  }

  public updateAllEntities() {
    const entities = this.entityManager.getEntities();
    entities.forEach((entity: Entity) => {
      if (entity.updateSpeed !== 0 && this.frame % entity.updateSpeed == 0) {
        entity.update(this.getCollisions(entity, entities));
      }
    });
  }

  private getCollisions = (
    entity: Entity,
    otherEntities: Entity[]
  ): Entity[] => {
    const collisions: Entity[] = [];
    otherEntities.forEach((otherEntity) => {
      if (
        isIntersecting(entity, otherEntity) &&
        !twoBugsHaveDifferentDirection(entity, otherEntity)
      ) {
        collisions.push(otherEntity);
      }
    });
    return collisions;
  };
}

const areTwoEntitiesIntersecting = (e1: EntityState, e2: EntityState) => {
  const {
    pos: { x: x1, y: y1 },
    size: { x: width1, y: height1 },
  } = e1;
  const {
    pos: { x: x2, y: y2 },
    size: { x: width2, y: height2 },
  } = e2;

  return (
    x2 < x1 + width1 &&
    x2 + width2 > x1 &&
    y2 < y1 + height1 &&
    height2 + y2 > y1
  );
};

const isIntersecting = (obj1: EntityState, obj2: EntityState): boolean => {
  const [pos1, size1] = fixBugPosition(obj1);
  const [pos2, size2] = fixBugPosition(obj2);

  if (
    obj2 !== obj1 &&
    areTwoEntitiesIntersecting(
      { pos: pos1, size: size1 },
      { pos: pos2, size: size2 }
    )
  ) {
    return true;
  }
  return false;
};

export const isPointInsideEntity = (entity: Entity, x: number, y: number) => {
  let newPos: Victor;
  if (entity instanceof Bug && (entity as Bug).direction.x > 0) {
    newPos = entity.pos.clone().subtractScalarX(entity.size.x);
  }

  return areTwoEntitiesIntersecting(
    newPos ? { pos: newPos, size: entity.size } : entity,
    {
      pos: new Victor(x - 1, y),
      size: new Victor(3, 1),
    }
  );
};

function fixBugPosition(obj: EntityState) {
  let newPos: Victor = obj.pos;
  let newSize: Victor = obj.size;

  if (obj instanceof Bug && (obj as Bug).direction.x > 0) {
    newPos = obj.pos.clone().subtractScalarX(1);
  }

  if (obj instanceof Bug) {
    // newSize = new Victor(2, 2);
  }

  return [newPos, newSize];
}

function twoBugsHaveDifferentDirection(entity: Entity, otherEntity: Entity) {
  if (!(entity instanceof Bug) || !(otherEntity instanceof Bug)) return false;

  const distBetween = Math.abs(entity.pos.x - otherEntity.pos.x);

  return (
    entity.direction.x != otherEntity.direction.x &&
    distBetween > entity.size.x * 0.5
  );
}
