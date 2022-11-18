import Todo from "../../models/Todo"
import TodoItem from './TodoItem'

type AppProps = {
    todoArray: Todo[],
    removeTodo: (index:number) => void,
    changeStatusOfTodo: (todoStatus: boolean, index: number) => void
}

export default function TodoList({ todoArray, removeTodo, changeStatusOfTodo }: AppProps): JSX.Element{
    return(
        <section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label >Mark all as complete</label>
				<ul className="todo-list">
					{todoArray.map((todo, index) => <TodoItem key={index} value={index} todo={todo} removeTodo={removeTodo} changeStatusOfTodo={changeStatusOfTodo}/>)}
				</ul>
			</section>
    )
}