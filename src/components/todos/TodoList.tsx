import { useRef } from "react";
import Todo from "../../models/Todo"
import TodoItem from './TodoItem'

type AppProps = {
    todoArray: Todo[],
    removeTodo: (todo: Todo) => void,
    changeStatusOfTodo: (todoStatus: boolean, index: number) => void,
    changeStatusOfAllTodos: (status: boolean) => void, 
    changeContentOfTodo: (todoContent: string, index: number) => void,
    filter: string
}

export default function TodoList({ todoArray, removeTodo, changeStatusOfTodo, changeStatusOfAllTodos, filter, changeContentOfTodo }: AppProps): JSX.Element{

    const inputRef = useRef(document.createElement("input"));

    function updateInputValue(){
        inputRef.current.checked = !inputRef.current.checked
        changeStatusOfAllTodos(inputRef.current.checked)
    }

    return(
        <section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox" onClick={(e) => changeStatusOfAllTodos(e.currentTarget.checked)}/>
				<label aria-label="mark-all" onClick={() => updateInputValue()}>Mark all as complete</label>
				<ul className="todo-list">
					{todoArray.filter((todo)=>{
                        if(filter === "active" && todo.completed === false){
                            return true;
                        }
                        else if(filter === "completed" && todo.completed === true){
                            return true;
                        }
                        else if(filter === "all"){
                            return true;
                        }
                        return false;
                    }).map((todo) => <TodoItem key={todo.id}
                                                     todo={todo}
                                                     removeTodo={removeTodo}
                                                     changeStatusOfTodo={changeStatusOfTodo}
                                                     changeContentOfTodo={changeContentOfTodo}/>)}
				</ul>
			</section>
    )
}