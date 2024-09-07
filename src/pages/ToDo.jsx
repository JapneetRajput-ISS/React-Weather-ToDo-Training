import React, { useEffect, useState } from 'react'

export const ToDo = () => {

    const [todoList, setTodoList] = useState([])
    const [task, setTask] = useState("")

    const addToTodoList = (e) => {
        e.preventDefault();
        setTodoList(prevState => [...prevState, { id: todoList.length + 1, task: task, completed: false }])
        setTask("")
    }

    const markDone = (id) => {
        const updatedTodoList = todoList.map(obj => {
            if (obj.id === id) {
                return { ...obj, completed: !obj.completed }
            }
            return obj;
        })
        setTodoList(updatedTodoList);
    }

    const deleteTask = (id) => {
        const updatedTodoList = todoList.filter(obj => obj.id !== id);
        setTodoList(updatedTodoList);
    }

    useEffect(() => {
        localStorage.setItem('todoList', todoList)
    }, [todoList])

    useEffect(() => {
        console.log(localStorage.getItem('todoList'))
        setTodoList(localStorage.getItem('todoList'))
    }, [])

    return (
        <>
            <br />
            <form onSubmit={addToTodoList}>
                <input value={task} onChange={(e) => setTask(e.target.value)} />
                <button>Add ToDo</button>
            </form>
            <br />
            <ul>
                {todoList && todoList.map(todo => {
                    return (
                        <li
                            style={{ 'textDecorationLine': `${todo.completed ? 'line-through' : 'underline'}` }}
                            key={todo.id}>{todo.id} : {todo.task}
                            <button onClick={() => markDone(todo.id)} >✓</button>
                            <button onClick={() => deleteTask(todo.id)} >x</button>
                        </li>
                    )
                })}
            </ul>
            <br />
        </>
    )
}
