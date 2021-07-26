import React, { useState } from "react"
import Victor from "victor"
import { BugState, defaultState } from "../../core/entities/bug/bug"
import { randInt } from "../../core/util/stats"

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
        {Object.keys(bugState).map(key => <div key={key} className={"input-row"}>
            <label htmlFor={key}>{key}</label>
            {bugState[key] instanceof Victor
                ?
                <span>
                    <input type="number"
                        name={`${key}-x`}
                        value={bugState[key].x}
                        onChange={(event) => updateProperty(key, new Victor(parseInt(event.target.value), bugState[key].y))} />
                    <input type="number"
                        name={`${key}-y`}
                        value={bugState[key].y}
                        onChange={(event) => updateProperty(key, new Victor(bugState[key].x, parseInt(event.target.value)))} />
                </span>
                :
                <input type="number"
                    name={key}
                    value={JSON.stringify(bugState[key] as any)}
                    onChange={(event) => updateProperty(key, parseInt(event.target.value))} />
            }
        </div>
        )}
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
                    const scaleFactor = randInt(5, 10)
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