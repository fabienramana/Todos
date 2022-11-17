import Todo from "../../models/Todo"

type AppProps = {
    todoArray: Todo[]
}

export default function Footer({todoArray}: AppProps): JSX.Element {

    const nbrTodosLeft = todoArray.filter((todo) => todo.completed === false).length

    return(
        <footer className="footer">
            <span className="todo-count">{nbrTodosLeft} item left</span>
            <ul className="filters">
                <li>
                    <a className="selected" href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}