import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type ListType = {
  listID: string
  title: string
  tasks: Array<TaskType>
  filterValue: FilterType
  removeTask: (taskId: string, listID: string) => void
  changeFilterValue: (filterValue: FilterType, listID: string) => void
  addTask: (title: string, listID: string) => void
  changeTaskStatus: (id: string, isDone: boolean, listID: string) => void
  removeList: (id: string) => void
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.listID)}
            />
            <span className={task.isDone ? 'completed' : 'task'}>{task.title}</span>
            <button onClick={() => props.removeTask(task.id, props.listID)}>X</button>
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
  const onClickHandlerCreator = (filter: FilterType) => () => props.changeFilterValue(filter, props.listID)

  // Add task handlers:
  const addTaskHandler = () => {
    const trimmedTitle = title.trim()
    trimmedTitle ? props.addTask(trimmedTitle, props.listID) : setError(true)
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

  // Remove list handler
  const removeListHandler = () => props.removeList(props.listID)

  return (
    <div>
      <div>
        <h3>
          {props.title}
          <button onClick={removeListHandler}>x</button>
        </h3>
      </div>
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
