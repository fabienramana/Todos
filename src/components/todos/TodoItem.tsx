import {useState} from 'react'
import Todo from "../../models/Todo"

type TodoItemProps = {
    todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps): JSX.Element{

    const [isCompleted, setIsCompleted] = useState(todo.completed);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCompleted(event.target.checked);
        // 👇️ this is the checkbox itself
        console.log(event.target);
    
        // 👇️ this is the checked value of the field
        console.log(event.target.checked);
      };

      const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
      };

    return(
            <li className={todo.completed ? "completed" : ""}>
                <div className="view">
                    <input className="toggle" type="checkbox" onChange={handleCheckboxChange} checked={isCompleted}/>
                    <label>{todo.content}</label>
                    <button className="destroy"></button>
                </div>
                <input className="edit" onChange={handleChangeValue} value="create MVC project"/> 
            </li>
    )
}