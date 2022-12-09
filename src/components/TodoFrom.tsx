import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';


const URL = 'http://localhost:3000';

interface Todo {
    todo_id : number;
    todo : string;
}

const TodoFrom = () => {
    const [todos, setTodos] = useState<Todo[] |[]>([]);
    const [value, setValue] = useState('');
    //const url = `${URL}/todos`;
    
    useEffect(() => {
        // axios.get(`${URL}/todos`)
        //     .then(res =>setTodos(res.data))
        loadTodos();
    }, [])
    
    const loadTodos = async () => {
            const response = await axios.get(`${URL}`)
            console.log(response.data);
            setTodos(response.data)
    }
    
    const handleAddTodo = async() => {
        // const newTodos = [...todos, value];
        // setTodos(newTodos);
        // setValue('');
        const data = { todo: value };
        const response = await axios.post(`${URL}`,data );
        console.log("newTodo : " + data);
        setTodos([...todos, response.data]);
        setValue('');
    }
    
    const onRemove = async (clickedIndex: number) => {
        const deleteIndex = String(clickedIndex);
        const response = await axios.delete(`${URL}/${deleteIndex}`)
        console.log(response)
        const removedTodos = todos.filter((todo) => todo.todo_id != clickedIndex);
        console.log(removedTodos)
        setTodos(removedTodos);
    };

    return (
        <div>
            TODOLIST
                <input value={value} placeholder='할일' onChange={e => setValue(e.target.value)}  />
                <button onClick={() => handleAddTodo()}>등록</button>
            {
                todos.map((todo) => (
                    <div key={todo.todo_id}>{todo.todo}<button onClick={()=>onRemove(todo.todo_id)}>삭제</button></div>
                ))
            }
        </div>
    );
};

export default TodoFrom;