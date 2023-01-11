import { useState } from 'react'

type TodoInputCreatorProps = {
    addTodo: (content:string) => void
}

export default function TodoInputCreator({addTodo}: TodoInputCreatorProps){

    const [todoContent, setTodoContent] = useState("")
    

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setTodoContent(e.target.value)
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        const normalizedInput = todoContent.trim();
        if(e.key === 'Enter' && normalizedInput !== ""){
            addTodo(normalizedInput);
            setTodoContent("")
          }
    }


    return (
        <input className="new-todo"
         type="text"
         value={todoContent}
         placeholder="What needs to be done?"
         onChange={handleChange} 
         onKeyDown={handleKeyPress}/>
    )
}