import React from "react"
import Victor from "victor"
import { Indexable } from "../../Indexable"

export interface InputSetProps {
    state: Indexable,
    updateProperty: (property: string, value: any) => any
}

export const InputSet = ({ state, updateProperty }: InputSetProps) => {
    return (<>
        {Object.keys(state).map(key => <div key={key} className={"input-row"}>
            <label htmlFor={key}>{key}</label>
            {state[key] instanceof Victor
                ?
                <span>
                    <input type="number"
                        name={`${key}-x`}
                        value={state[key].x}
                        onChange={(event) => updateProperty(key, new Victor(parseInt(event.target.value), state[key].y))} />
                    <input type="number"
                        name={`${key}-y`}
                        value={state[key].y}
                        onChange={(event) => updateProperty(key, new Victor(state[key].x, parseInt(event.target.value)))} />
                </span>
                :
                <input type="number"
                    name={key}
                    value={JSON.stringify(state[key] as any)}
                    onChange={(event) => updateProperty(key, parseInt(event.target.value))} />
            }
        </div>
        )}
    </>)
}