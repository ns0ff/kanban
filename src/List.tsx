import React, { ChangeEvent, useState, KeyboardEvent } from "react";
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
  addTask: (title: string) => void
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

  // Title local state
  let [title, setTitle] = useState('')

  // Handlers:
  //Filter handlers:
  const changeFilterHandler = (value: FilterType) => {
    props.changeFilterValue(value)
  }
  const onClickHandlerCreator = (filter: FilterType) => () => props.changeFilterValue(filter)


  // Add task handlers:
  const addTaskHandler = () => {
    props.addTask(title)
    setTitle('')
  }
  const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onEnterAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }

  

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={setLocalTitleHandler}
          onKeyDown={onEnterAddTaskHandler} />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>{listElements}</ul>
      <div>
        <button onClick={onClickHandlerCreator('all')}>All</button>
        <button onClick={onClickHandlerCreator('active')}>Active</button>
        <button onClick={onClickHandlerCreator('completed')}>Completed</button>
      </div>
    </div>
  );
};
