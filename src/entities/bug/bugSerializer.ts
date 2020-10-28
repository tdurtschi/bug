import Victor from "victor";
import Bug from "./bug";

function getSnapshot(bug: Bug): object {
    const bugData: object = {
        id: bug.id,
        size: bug.size,
        direction: bug.direction,
        pos: bug.pos
    }

    return bugData;
}

function fromSnapshot(snapshot: any): Bug {
    const bug = new Bug(snapshot.id)
    bug.size = new Victor(snapshot.size.x, snapshot.size.y)
    bug.direction = new Victor(snapshot.direction.x, snapshot.direction.y)
    bug.pos = new Victor(snapshot.pos.x, snapshot.pos.y)
    return bug
}

export default {
    getSnapshot, fromSnapshot
}