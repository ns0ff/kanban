import Button from "@mui/material/Button";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { AddItemForm } from "./addItemForm";
import { FilterType } from "./App";
import { EditableSpan } from "./components/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ButtonGroup, IconButton, ListItem, Typography } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'

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

export const TodoList = (props: ListType) => {
  const listElements = props.tasks.length ?
    <List>
      {props.tasks.map((task: TaskType) => {
        const renameTask = (newTitle: string) => props.renameTask(task.id, newTitle, props.listID)
        return (
          <ListItem key={task.id} sx={{p: '0'}}>
            <Checkbox 
              size='small'
              checked={task.isDone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.listID)}
            />
            <div style={{display: 'inline-block'}} className={task.isDone ? 'completed' : 'task'}>
              <EditableSpan title={task.title} changeTitle={renameTask}/>
            </div>
            <IconButton size='small' color='secondary' onClick={() => props.removeTask(task.id, props.listID)}><HighlightOffIcon fontSize="small"/></IconButton>
          </ListItem>
        );
      })}
    </List>
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
        <Typography variant="h6" align="center">
          <EditableSpan title={props.title} changeTitle={renameList}/>
          <IconButton onClick={removeListHandler} color='secondary'><DeleteForeverIcon /></IconButton>
        </Typography>
      </div>
      <AddItemForm addItem={addNewTask}/>
      {listElements}
      <div>
        <ButtonGroup 
        fullWidth
        size={'small'}
        variant={'outlined'}
        >
        <Button 
          sx={{mr: '3px', fontSize: '10px', minWidth: 'fit-content'}}
          color={props.filterValue === 'all' ? 'secondary' : 'primary'}
          onClick={onClickHandlerCreator('all')}>All</Button>
        <Button 
          sx={{mr: '3px', fontSize: '10px', minWidth: 'fit-content'}}
          color={props.filterValue === 'active' ? 'secondary' : 'primary'}
          onClick={onClickHandlerCreator('active')}>Active</Button>
        <Button 
          sx={{fontSize: '10px', minWidth: 'fit-content'}}
          color={props.filterValue === 'completed' ? 'secondary' : 'primary'}
          onClick={onClickHandlerCreator('completed')}>Completed</Button>
          </ButtonGroup>
      </div>
    </div>
  );
};
