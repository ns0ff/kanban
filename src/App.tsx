import React, { useState } from "react";
import "./App.css";
import { List, TaskType } from "./List";
import { v1 } from "uuid";

export type FilterType = "all" | "completed" | "active";

function App() {
  const listTitle = "Camera setup checklist";
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "ISO", isDone: false },
    { id: v1(), title: "Cards", isDone: false },
    { id: v1(), title: "Battery", isDone: true },
    { id: v1(), title: "Recording resolution", isDone: true },
    { id: v1(), title: "Bitrate / Compression", isDone: true },
    { id: v1(), title: "Color space", isDone: true },
  ]);

  const [filter, setFilter] = useState<any>("all");

  // Remove task from the list
  const removeTask = (taskId: string) => {
    const removedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(removedTasks);
  };

  // Add task
  const addTask = (title: string) => {
    setTasks([{ id: v1(), title, isDone: false }, ...tasks])
  }

  // Change filter value
  const changeListFilter = (filterValue: string) => {
    setFilter(filterValue)
  }

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

  const filteredTasks: Array<TaskType> = getFilteredTask(tasks, filter)

  // Change task status
  const changeTaskStatus = (id: string, isDone: boolean) => {
    setTasks(tasks.map((el: TaskType) => el.id === id ? { ...el, isDone: isDone } : el))
  }




  return (
    <div className="App">
      <List
        title={listTitle}
        tasks={filteredTasks}
        filterValue={filter}
        removeTask={removeTask}
        changeFilterValue={changeListFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
