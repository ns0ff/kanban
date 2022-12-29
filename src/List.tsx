import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { AddItemForm } from "./addItemForm";
import { FilterType } from "./App";
import { EditableSpan } from "./components/EditableSpan";

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
  renameTask: (id: string, newTitle: string, listID: string) => void
  renameList: (newTitle: string, listID: string) => void
};

export const List = (props: ListType) => {
  const listElements = props.tasks.length ?
    <ul>
      {props.tasks.map((task: TaskType) => {
        const renameTask = (newTitle: string) => props.renameTask(task.id, newTitle, props.listID)
        return (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.listID)}
            />
            {/* <span className={task.isDone ? 'completed' : 'task'}>{task.title}</span> */}
            <div style={{display: 'inline-block'}} className={task.isDone ? 'completed' : 'task'}>
              <EditableSpan title={task.title} changeTitle={renameTask}/>
            </div>
            <button onClick={() => props.removeTask(task.id, props.listID)}>X</button>
          </li>
        );
      })}
    </ul>
    : <span>Your task list is empty :(</span>

  // Handlers:
  //Filter handler:
  const onClickHandlerCreator = (filter: FilterType) => () => props.changeFilterValue(filter, props.listID)

  // Remove list handler
  const removeListHandler = () => props.removeList(props.listID)

  // Add new task handler
  const addNewTask = (title: string) => props.addTask(title, props.listID)

  const renameList = (newTitle: string) => props.renameList(newTitle, props.listID)

  return (
    <div>
      <div>
        <h3>
          <EditableSpan title={props.title} changeTitle={renameList}/>
          {/* {props.title} */}
          <button onClick={removeListHandler}>x</button>
        </h3>
      </div>
      <AddItemForm addItem={addNewTask}/>
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
