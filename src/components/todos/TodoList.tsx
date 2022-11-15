import Todo from "../../models/Todo"
import TodoItem from './TodoItem'

type AppProps = {
    todoArray: Todo[]
}

export default function TodoList({ todoArray }: AppProps): JSX.Element{
    return(
        <section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label >Mark all as complete</label>
				<ul className="todo-list">
					{todoArray.map((todo, index) => <TodoItem key={index} todo={todo}/>)}
				</ul>
			</section>
    )
}