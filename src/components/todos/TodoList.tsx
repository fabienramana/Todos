import { useRef } from "react";
import Todo from "../../models/Todo"
import TodoItem from './TodoItem'

type AppProps = {
    todoArray: Todo[],
    removeTodo: (index:number) => void,
    changeStatusOfTodo: (todoStatus: boolean, index: number) => void,
    changeStatusOfAllTodos: (status: boolean) => void
}

export default function TodoList({ todoArray, removeTodo, changeStatusOfTodo, changeStatusOfAllTodos }: AppProps): JSX.Element{

    const inputRef = useRef(document.createElement("input"));

    function updateInputValue(){
        inputRef.current.checked = !inputRef.current.checked
        changeStatusOfAllTodos(inputRef.current.checked)
    }

    return(
        <section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox" onClick={(e) => changeStatusOfAllTodos(e.currentTarget.checked)}/>
				<label onClick={() => updateInputValue()}>Mark all as complete</label>
				<ul className="todo-list">
					{todoArray.map((todo, index) => <TodoItem key={index}
                                                     value={index}
                                                     todo={todo}
                                                     removeTodo={removeTodo}
                                                     changeStatusOfTodo={changeStatusOfTodo}/>)}
				</ul>
			</section>
    )
}