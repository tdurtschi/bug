export default class BugInstinct implements IBugInstinct {
    get WillClimb(): boolean {
        return Math.random() > 0.9;
    }
}

export interface IBugInstinct {
    WillClimb: boolean;
}