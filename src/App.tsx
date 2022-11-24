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

  // Change filter value
  const changeListFilter = (filterValue: string) => {
    setFilter(filterValue)
  }

  // Render filtered tasks
  let toRender: Array<TaskType> = []

  switch(filter){
    case 'active':
        toRender = tasks.filter(t => t.isDone !== true)
        break
    case 'completed' :
        toRender = tasks.filter(t => t.isDone !== false)
        break
    default :
        toRender = tasks
  }


  

  return (
    <div className="App">
      <List title={listTitle} tasks={toRender} removeTask={removeTask} changeFilterValue={changeListFilter}/>
    </div>
  );
}

export default App;
