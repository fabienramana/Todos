import React, {useState} from 'react'

type PropsParam = {
    addTodo: (content:string) => void
}

export default function TodoInputCreator({addTodo}: PropsParam): JSX.Element{
    const [todoContent, setTodoContent] = useState<string>('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setTodoContent(e.target.value.trim())
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === 'Enter' && todoContent.trim() !== ""){
            addTodo(todoContent.trim());
          }
    }


    return (
        <input className="new-todo" 
         type="text"
         placeholder="What needs to be done?"
         onChange={handleChange} 
         onKeyPress={handleKeyPress}/>
    )
}