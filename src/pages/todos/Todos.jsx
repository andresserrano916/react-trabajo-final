import React, { useState } from 'react'

const Todos = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    const handlerAddTodo = () => {
        const todoList = [...todos];
        todoList.push(todo);
        setTodos(todoList);
    };

    return (
        <div style={{textAlign: 'center', width: '100%'}}>
            <h1>React app</h1>
            <div>
                <input type="text" placeholder="Add Todo" 
                    onChange={(e) => setTodo(e.target.value)}/>
                <button type="button" onClick={handlerAddTodo}>Add Todo</button>
            </div>
            <br/>
            <div style={{width: '100%', textAlign: '100%'}}>
                <h2>Todos List</h2>
                <ul>
                    {todos && todos.map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>
        </div>        
    );
};

export default Todos;
