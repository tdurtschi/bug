import React, { useState } from "react"
import Victor from "victor"
import { BugState, defaultState } from "../../../core/entities/bug/bug"
import { randInt } from "../../../core/util/stats"
import { InputSet } from "./InputSet"

export interface BugFormProps {
    addBug: (initial: Partial<BugState>) => any
}


export const BugForm = (props: BugFormProps) => {
    const [bugState, setBugState] = useState<BugState>({
        ...defaultState(),
        pos: new Victor(200, 0)
    })

    const updateProperty = (property: string, value: any) =>
        setBugState({ ...bugState, [property]: value })

    return <form id="bug-form">
        <InputSet updateProperty={updateProperty} state={bugState} />
        <div>
            <button id="add-bug"
                type="button"
                onClick={() => {
                    console.log("Create Bug with: ", bugState);
                    props.addBug(bugState);
                    Object.keys(bugState).forEach(key => bugState[key] = bugState[key] instanceof Victor ? bugState[key].clone() : bugState[key])
                }}>
                Add Bug
            </button>
            <button type="button"
                onClick={() => {
                    const scaleFactor = randInt(8, 14)
                    const size = new Victor(3, 2).multiplyScalar(scaleFactor)
                    const speed = scaleFactor / 10

                    const bugState = { size, speed }
                    props.addBug(bugState);
                }}>
                Random Bug
            </button>
        </div>
    </form>
}