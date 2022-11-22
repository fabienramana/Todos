import React, {useRef, useState} from 'react'

type PropsParam = {
    addTodo: (content:string) => void
}

export default function TodoInputCreator({addTodo}: PropsParam): JSX.Element{
    const [todoContent, setTodoContent] = useState<string>('');
    
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setTodoContent(e.target.value)
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === 'Enter' && todoContent.trim() !== ""){
            addTodo(todoContent.trim());
            if(inputRef.current){
                inputRef.current.value = "";
            }
            setTodoContent("")
          }
    }


    return (
        <input className="new-todo"
         type="text"
         ref={inputRef}
         placeholder="What needs to be done?"
         onChange={handleChange} 
         onKeyDown={handleKeyPress}/>
    )
}