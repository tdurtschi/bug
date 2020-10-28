import Victor from "victor";
import Wall from "./wall";

function getSnapshot(wall: Wall): string {
    const wallData: object = {
        id: wall.id,
        size: wall.size,
        pos: wall.pos
    }

    return JSON.stringify(wallData);
}

function fromSnapshot(json: string): Wall {
    const wallData = JSON.parse(json)
    const wall = new Wall(wallData.id)
    wall.size = new Victor(wallData.size.x, wallData.size.y)
    wall.pos = new Victor(wallData.pos.x, wallData.pos.y)
    return wall
}

export default {
    getSnapshot,
    fromSnapshot
}