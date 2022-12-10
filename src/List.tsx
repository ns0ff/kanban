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
  filterValue: FilterType
  removeTask: (taskId: string) => void;
  changeFilterValue: (filterValue: FilterType) => void
  addTask: (title: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void
};

export const List = (props: ListType) => {
  const listElements = props.tasks.length ?
    <ul>
      {props.tasks.map((task: TaskType) => {
        return (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)}
            />
            <span className={task.isDone ? 'completed' : 'task'}>{task.title}</span>
            <button onClick={() => props.removeTask(task.id)}>X</button>
          </li>
        );
      })}
    </ul>
    : <span>Your task list is empty :(</span>

  // Title local state
  let [title, setTitle] = useState<string>('')
  let [error, setError] = useState<boolean>(false)

  // Handlers:
  //Filter handler:
  const onClickHandlerCreator = (filter: FilterType) => () => props.changeFilterValue(filter)


  // Add task handlers:
  const addTaskHandler = () => {
    const trimmedTitle = title.trim()
    trimmedTitle ? props.addTask(trimmedTitle) : setError(true)
    setTitle('')
  }
  const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTitle(e.currentTarget.value)
  }
  const onEnterAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input className={error ? 'error' : ''}
          value={title}
          onChange={setLocalTitleHandler}
          onKeyDown={onEnterAddTaskHandler} />
        <button onClick={addTaskHandler}>+</button>
      </div>
      {listElements}
      <div>
        <button className={props.filterValue === 'all' ? 'btn-active' : ''}
          onClick={onClickHandlerCreator('all')}>All</button>
        <button className={props.filterValue === 'active' ? 'btn-active' : ''}
          onClick={onClickHandlerCreator('active')}>Active</button>
        <button className={props.filterValue === 'completed' ? 'btn-active' : ''}
          onClick={onClickHandlerCreator('completed')}>Completed</button>
      </div>
    </div>
  );
};
