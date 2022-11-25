import React, { useEffect, useRef, useState } from "react";
import Todo from "../../../models/Todo"

type TodoItemProps = {
    todo: Todo,
    removeTodo: (todo: Todo) => void,
    changeStatusOfTodo: (todoStatus: boolean, index: number) => void,
    changeContentOfTodo: (todoContent: string, index: number) => void,
    editModeIndex: number,
    setEditMode: (index: number) => void 
}

export default function TodoItem({ todo, removeTodo, changeStatusOfTodo, changeContentOfTodo , editModeIndex, setEditMode  }: TodoItemProps){

    const inputModifierRef = useRef<HTMLInputElement>(null);
    const [modifiedTodoContent, setModifiedTodoContent] = useState<string>(todo.content)


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeStatusOfTodo(event.target.checked, todo.id);     
    };

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedTodoContent(event.target.value);
    };
    
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        if(event.detail === 2){
            setEditMode(todo.id)
        }
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        
         if(e.key === 'Enter' && modifiedTodoContent.trim() !== ""){
            changeContentOfTodo(modifiedTodoContent.trim(), todo.id)
            setEditMode(0)
         }
        else if (e.key === 'Enter' && modifiedTodoContent.trim() === ""){
            removeTodo(todo);
            setEditMode(0)
         }

        else if (e.key === 'Escape'){
            setEditMode(0)
         }
    }
    
      useEffect(() => {
        if(editModeIndex === todo.id && inputModifierRef.current){
            inputModifierRef.current.focus();
        }
    }, [editModeIndex, todo.id])  


    return(
        
        <div>
            <div className="view">
                <input className="toggle" aria-label="changeStatus" type="checkbox" onChange={handleCheckboxChange} checked={todo.completed}/>
                <label onClick={handleClick}>{todo.content}</label>
                <button className="destroy" aria-label="delete" onClick={() => removeTodo(todo)}></button>
            </div>
            <input ref={inputModifierRef} className="edit"
                   onChange={handleChangeValue}
                   onKeyDown={handleKeyPress}
                   value={modifiedTodoContent}/> 
        </div>
    )
}