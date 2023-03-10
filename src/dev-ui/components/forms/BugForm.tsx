import React, { useState } from "react"
import Victor from "victor"
import { BugState, defaultState } from "../../../core/entities/bug/bug"
import { randInt } from "../../../core/util/stats"
import { Indexable } from "../../Indexable"
import { InputSet } from "./InputSet"

export interface BugFormProps {
    addBug: (initial: Partial<BugState> | { size?: Victor | number }) => any
}


export const BugForm = (props: BugFormProps) => {
    const [bugState, setBugState] = useState<BugState & Indexable>({
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
                    const size = randInt(3, 6)
                    const speed = size * 3 / 10

                    const bugState = { size, speed }
                    props.addBug(bugState);
                }}>
                Random Bug
            </button>
        </div>
    </form>
}