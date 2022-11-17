import {useState} from 'react'
import Todo from "../../models/Todo"

type TodoItemProps = {
    todo: Todo,
    removeTodo: (index: number) => void,
    value: number
}

export default function TodoItem({ todo, removeTodo, value }: TodoItemProps): JSX.Element{

    const [isCompleted, setIsCompleted] = useState<boolean>(todo.completed);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(event.target.checked);
    };

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    };
    
    

    return(
        
        <li className={todo.completed ? "completed" : ""}>
            <div className="view">
                <input className="toggle" type="checkbox" onChange={handleCheckboxChange} checked={isCompleted}/>
                <label>{todo.content}</label>
                <button className="destroy" onClick={() => removeTodo(value)}></button>
            </div>
            <input className="edit" onChange={handleChangeValue} value="create MVC project"/> 
        </li>
    )
}