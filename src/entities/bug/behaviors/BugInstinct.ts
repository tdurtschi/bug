import { randFromWeighted } from "../../../util";

export default class BugInstinct implements IBugInstinct {
    get IsTiredOfClimbing(): boolean {
        return randFromWeighted([394, 6]) == 1;
    }

    get WillClimb(): boolean {
        return Math.random() > 0.9;
    }
}

export class DummyBugInstinct implements IBugInstinct {
    WillClimb = false;
    IsTiredOfClimbing = false;

    constructor(initial?: Partial<IBugInstinct>) {
        initial !== undefined && Object.assign(this, initial);
    }
}

export interface IBugInstinct {
    WillClimb: boolean;
    IsTiredOfClimbing: boolean;
}