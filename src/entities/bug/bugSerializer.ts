import Victor from "victor";
import Bug from "./bug";

export function toJson(bug: Bug): string {
    const bugData: object = {
        id: bug.id,
        size: bug.size,
        direction: bug.direction,
        pos: bug.pos
    }

    return JSON.stringify(bugData);
}

export function fromJson(json: string): Bug {
    const bugData = JSON.parse(json)
    const bug = new Bug(bugData.id)
    bug.size = new Victor(bugData.size.x, bugData.size.y)
    bug.direction = new Victor(bugData.direction.x, bugData.direction.y)
    bug.pos = new Victor(bugData.pos.x, bugData.pos.y)
    return bug
}