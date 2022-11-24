import React from "react";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type ListType = {
    id: number
    title: string
    tasks: Array<TaskType>
}

export const List = (props: ListType) => {
    return (
        <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li key={props.id}><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                    <li key={props.id}><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                    <li key={props.id}><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
                    <li key={props.id}><input type="checkbox" checked={props.tasks[3].isDone}/> <span>{props.tasks[3].title}</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    )
}