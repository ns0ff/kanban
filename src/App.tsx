import React, { useState } from "react";
import "./App.css";
import { TodoList, TaskType } from "./components/List";
import { v1 } from "uuid";
import { AddItemForm } from "./components/addItemForm";
import AppBar from "@mui/material/AppBar/AppBar";
import { Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

export type FilterType = "all" | "completed" | "active";

type TodoListsType = {
  id: string
  title: string
  filter: FilterType
}

type TasksStateType = {
  [listID: string]: Array<TaskType>
}

function App() {
  const id_1 = v1()
  const id_2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    { id: id_1, title: "Camera setup checklist", filter: 'all' },
    { id: id_2, title: "Gear checklist", filter: 'all' }
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [id_1]: [
      { id: v1(), title: "ISO", isDone: true },
      { id: v1(), title: "Recording resolution", isDone: false },
      { id: v1(), title: "Bitrate / Compression", isDone: false },
      { id: v1(), title: "Color space", isDone: false }
    ],
    [id_2]: [
      { id: v1(), title: "Crane", isDone: false },
      { id: v1(), title: "Lenses", isDone: false },
      { id: v1(), title: "Battery", isDone: true },
      { id: v1(), title: "Cards", isDone: true },
    ]
  })

  // Remove task from the list
  const removeTask = (taskId: string, listID: string) => setTasks({ ...tasks, [listID]: tasks[listID].filter((task) => task.id !== taskId) })

  // Add task
  const addTask = (title: string, listID: string) => setTasks({ ...tasks, [listID]: [{ id: v1(), title, isDone: false }, ...tasks[listID]] })

  // Change task status
  const changeTaskStatus = (id: string, isDone: boolean, listID: string) => setTasks({ ...tasks, [listID]: tasks[listID].map((el: TaskType) => el.id === id ? { ...el, isDone: isDone } : el) })

  // Change task title
  const changeTaskTitle = (id: string, newTitle: string, listID: string) => setTasks({ ...tasks, [listID]: tasks[listID].map((el: TaskType) => el.id === id ? {...el, title: newTitle } : el) })

  // Change filter value
  const changeListFilter = (filterValue: FilterType, listID: string) => setTodoLists(todoLists.map(list => list.id === listID ? {...list, filter: filterValue } : list))
  

  // Render filtered tasks
  const getFilteredTask = (tasks: Array<TaskType>, filter: FilterType) => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => t.isDone !== true)
      case 'completed':
        return tasks.filter(t => t.isDone !== false)
      default:
        return tasks
    }
  }

  // Delete List:
  const removeList = (listID: string) => {
    setTodoLists(todoLists.filter(list => list.id !== listID))
    delete tasks[listID]
  }

  // Add new list:
  const addList = (newTitle: string) => {
    const newListID = v1()
    const newList: TodoListsType = {
      id: newListID,
      title: newTitle,
      filter: "all"
    }
    setTodoLists([...todoLists, newList])
    setTasks({...tasks, [newListID]: []})
  }

  // Rename list
  const renameList = (newTitle: string, listID: string) => setTodoLists(todoLists.map(list => list.id === listID ? {...list, title: newTitle } : list))

  // Lists components
  const listsComponents = todoLists.map((list: TodoListsType) => {
    const filteredTasks: Array<TaskType> = getFilteredTask(tasks[list.id], list.filter)
    return (
      <Grid item>
      <Paper sx={{p: '20px'}} elevation={10}>
      <TodoList
        listID={list.id}
        title={list.title}
        tasks={filteredTasks}
        filterValue={list.filter}
        removeTask={removeTask}
        changeFilterValue={changeListFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        removeList={removeList}
        renameList={renameList}
        renameTask={changeTaskTitle}
      />
      </Paper>
      </Grid>
    )

  })


  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lists
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Container fixed>
      <Grid container sx={{p: '10px 0'}}>
      <AddItemForm addItem={addList} />
      </Grid>
      <Grid container spacing={6}>
      {listsComponents}
      </Grid>
    </Container>
    </div>
  );
}

export default App