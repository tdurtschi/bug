import Bug from "../entities/bug/bug";
import bugSerializer from "../entities/bug/bugSerializer";
import Entity from "../entities/entity";
import Wall from "../entities/wall/wall";
import wallSerializer from "../entities/wall/wallSerializer";
import { IGameState } from "./gameStateRepository";

export function entitiesFromString(state: string): Entity[] {
    const entityData: EntitySnapshot[] = JSON.parse(state)

    const entities = entityData
        .map((entity: any) => {
            if (entity.type == "BUG") {
                return bugSerializer.fromSnapshot(entity.data)
            } else if (entity.type = "WALL") {
                return wallSerializer.fromSnapshot(entity.data)
            }
        })

    return entities
}

export function gameStateFromEntities(entities: Entity[], id: number): IGameState {
    const entityData = entities
        .map((entity: Entity) => {
            if (entity instanceof Bug) {
                return {
                    type: "BUG",
                    data: bugSerializer.getSnapshot(entity as Bug)
                }
            } else if (entity instanceof Wall) {
                return {
                    type: "WALL",
                    data: wallSerializer.getSnapshot(entity as Wall)
                }
            }
        })
        .filter(entity => entity !== undefined);

    return {
        id,
        state: JSON.stringify(entityData)
    };
}

interface EntitySnapshot {
    type: "BUG" | "WALL"
    data: object
}

export default {
    entitiesFromString,
    gameStateFromEntities
}