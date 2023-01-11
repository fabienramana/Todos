import React, { useEffect, useRef, useState } from "react";
import Todo from "../../../models/Todo"

type TodoItemProps = {
    todoTitle: string,
    todoStatus: boolean,
    removeTodo: () => void,
    changeTodo:(todo: Partial<Todo>) => void
    setEditMode: () => void,
    resetEditMode: () => void
}

export default function TodoItem({ todoTitle, todoStatus, removeTodo, changeTodo, setEditMode, resetEditMode  }: TodoItemProps){

    const inputModifierRef = useRef<HTMLInputElement>(null);
    const [modifiedTodoContent, setModifiedTodoContent] = useState<string>(todoTitle)


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const todoStatus = {
            completed: event.target.checked
        }
        changeTodo(todoStatus);     
    };

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedTodoContent(event.target.value);
    };
    
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        setEditMode()
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        const normalizedInput = modifiedTodoContent.trim();

         if(e.key === 'Enter' && normalizedInput !== ""){
            const todoTitleToChange = {title: normalizedInput}
            changeTodo(todoTitleToChange)
            resetEditMode()
         }
        
         if (e.key === 'Enter' && normalizedInput === ""){
            removeTodo();
            resetEditMode()
         }

         if (e.key === 'Escape'){
            setModifiedTodoContent(todoTitle)
            resetEditMode()
         }
    }
    
      useEffect(() => {
        if(inputModifierRef.current){
            inputModifierRef.current.focus();
        }
    })  


    return(
        
        <div>
            <div className="view">
                <input className="toggle" aria-label="changeStatus" type="checkbox" onChange={handleCheckboxChange} checked={todoStatus}/>
                <label aria-label="title" onDoubleClick={handleClick}>{todoTitle}</label>
                <button className="destroy" aria-label="delete" onClick={() => removeTodo()}></button>
            </div>
            <input ref={inputModifierRef} className="edit"
                   onChange={handleChangeValue}
                   onKeyDown={handleKeyPress}
                   value={modifiedTodoContent}/> 
        </div>
    )
}