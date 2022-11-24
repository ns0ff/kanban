import React from "react";
import { FilterType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type ListType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilterValue: (filterValue: FilterType) => void
};

export const List = (props: ListType) => {
  const listElements = props.tasks.map((task: TaskType) => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />{" "}
        <span>{task.title}</span>
        <button onClick={() => props.removeTask(task.id)}>X</button>
      </li>
    );
  });

  const changeFilterHandler = (value: FilterType) => {
    props.changeFilterValue(value)
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>{listElements}</ul>
      <div>
        <button onClick={() => changeFilterHandler('all')}>All</button>
        <button onClick={() => changeFilterHandler('active')}>Active</button>
        <button onClick={() => changeFilterHandler('completed')}>Completed</button>
      </div>
    </div>
  );
};
