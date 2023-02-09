import React, { useState } from "react"
import Victor from "victor"
import { EntityState } from "../../../core/entities/entity"
import { defaultState, PlantState } from "../../../core/entities/plant/plant"
import { PlantagoBushStruct } from "../../../core/entities/plant/plantago/plantagoBushStruct"
import { Indexable } from "../../Indexable"
import { InputSet } from "./InputSet"

export interface PlantFormProps {
    addPlant: (initial: Partial<PlantState>) => any
}

export const PlantForm = (props: PlantFormProps) => {
    const [plantState, setPlantState] = useState<Partial<PlantState>>({
        ...defaultState(),
        pos: new Victor(200, 0)
    })

    const updateProperty = (property: string, value: any) =>
        setPlantState({ ...plantState, [property]: value })

    return <form id="plant-form">
        <InputSet state={plantState} updateProperty={updateProperty} />
        <div>
            <button id="add-plant"
                type="button"
                onClick={() => {
                    const newState = cloneState(plantState) as PlantState;
                    newState.graph = new PlantagoBushStruct();
                    console.log("Create Plant with: ", newState);
                    props.addPlant(newState);
                }}>
                Add Plant
            </button>
            <button type="button"
                onClick={() => {
                    const plantState = {}
                    props.addPlant(plantState);
                }}>
                Random Plant
            </button>
        </div>
    </form >
}

export function cloneState(state: Indexable) {
    const newState: Indexable = {};
    Object.keys(state).forEach(key => {
        newState[key] = state[key] instanceof Victor ? state[key].clone() : state[key]
    });

    return newState as EntityState;
}