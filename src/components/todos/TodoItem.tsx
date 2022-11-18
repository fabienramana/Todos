import Todo from "../../models/Todo"

type TodoItemProps = {
    todo: Todo,
    removeTodo: (index: number) => void,
    value: number,
    changeStatusOfTodo: (todoStatus: boolean, index: number) => void
}

export default function TodoItem({ todo, removeTodo, value, changeStatusOfTodo }: TodoItemProps): JSX.Element{

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeStatusOfTodo(event.target.checked, value);     
    };

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    };
    
    

    return(
        
        <li className={todo.completed ? "completed" : ""}>
            <div className="view">
                <input className="toggle" type="checkbox" onChange={handleCheckboxChange} checked={todo.completed}/>
                <label>{todo.content}</label>
                <button className="destroy" onClick={() => removeTodo(value)}></button>
            </div>
            <input className="edit" onChange={handleChangeValue} value="create MVC project"/> 
        </li>
    )
}