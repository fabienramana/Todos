import { useState } from "react";

type MarkAllTodosProps = {
    changeStatusOfAllTodos: (status: boolean) => void
}

export default function MarkAllTodos({changeStatusOfAllTodos}: MarkAllTodosProps){

    const [markAllTodosBool, setMarkAllTodosBool] = useState<boolean>(true)

    function updateInputValue(){
        changeStatusOfAllTodos(markAllTodosBool);
        setMarkAllTodosBool(!markAllTodosBool)
    }
    function handleChange(){}

    return (
        <>
            <input id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={markAllTodosBool}
            onChange={handleChange}/>
            <label aria-label="mark-all" onClick={() => updateInputValue()}>Mark all as complete</label>
        </>
   )
}