import React, { useEffect, useRef, useState } from "react";
import Todo from "../../models/Todo"

type TodoItemProps = {
    todo: Todo,
    removeTodo: (todo: Todo) => void,
    changeStatusOfTodo: (todoStatus: boolean, index: number) => void,
    changeContentOfTodo: (todoContent: string, index: number) => void
}

export default function TodoItem({ todo, removeTodo, changeStatusOfTodo, changeContentOfTodo }: TodoItemProps): JSX.Element{

    const inputModifierRef = useRef<HTMLInputElement>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [modifiedTodoContent, setModifiedTodoContent] = useState<string>(todo.content)


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        console.log(todo.id)
        changeStatusOfTodo(event.target.checked, todo.id);     
    };

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedTodoContent(event.target.value);
    };
    
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        if(event.detail === 2){
            setEditMode(!editMode)
        }
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        
         if(e.key === 'Enter' && modifiedTodoContent.trim() !== ""){
            changeContentOfTodo(modifiedTodoContent.trim(), todo.id)
            setEditMode(!editMode)
         }
        else if (e.key === 'Enter' && modifiedTodoContent.trim() === ""){
            removeTodo(todo);
            setEditMode(!editMode)
         }

        else if (e.key === 'Escape'){
            setEditMode(!editMode)
         }
    }
    
     useEffect(() => {
        if(editMode && inputModifierRef.current){
            inputModifierRef.current.focus();
        }
    }, [editMode]) 


    return(
        
        <li className={todo.completed ? editMode ? "completed editing" : "completed"  : editMode ? "editing" : "" }>
            <div className="view">
                <input className="toggle" aria-label="changeStatus" type="checkbox" onChange={handleCheckboxChange} checked={todo.completed}/>
                <label onClick={handleClick}>{todo.content}</label>
                <button className="destroy" aria-label="delete" onClick={() => removeTodo(todo)}></button>
            </div>
            <input ref={inputModifierRef} className="edit"
                   onChange={handleChangeValue}
                   onKeyDown={handleKeyPress} 
                   value={modifiedTodoContent}/> 
        </li>
    )
}