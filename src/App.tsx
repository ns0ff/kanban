import React from 'react';
import './App.css';
import { List } from './List';

const data = [
    {
        id: 1,
        title: 'What to learn',
        tasks: [{id: 1, title: 'CSS', isDone: false}, {id: 2, title: 'JS', isDone: false}, {id: 3, title: 'React', isDone: true}, {id: 3, title: 'HTML', isDone: true}]
},
    {
        id: 2,
        title: 'What to buy',
        tasks: [{id: 1, title: 'Beer', isDone: false}, {id: 2, title: 'Water', isDone: false}, {id: 3, title: 'Bread', isDone: true}, {id: 3, title: 'Laptop', isDone: true}]
},
    
]

function App() {
    return (
        <div className="App">
            <List id={data[0].id} title={data[0].title} tasks={data[0].tasks}/>
            <List id={data[1].id} title={data[1].title} tasks={data[1].tasks}/>
        </div>
    );
}

export default App;
