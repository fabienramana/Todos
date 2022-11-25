import Todo from "../../../models/Todo"

type FooterProps = {
    todoArray: Todo[],
    removeCompletedTodos: ()=> void,
    filter: string,
    setFilter: (filter: string) => void
}

export default function TodoFooter({todoArray, removeCompletedTodos, filter, setFilter}: FooterProps){

    const nbrTodosLeft = todoArray.filter((todo) => todo.completed === false).length

    return(
        <footer className="footer">
            <span className="todo-count">{nbrTodosLeft} item{nbrTodosLeft !== 1 && "s"} left</span>
            <ul className="filters">
                <li>
                    <a className={filter==="all" ? "selected" : ""} onClick={() => setFilter("all")}  href="#/">All</a>
                </li>
                <li>
                    <a className={filter==="active" ? "selected" : ""} onClick={() => setFilter("active")} href="#/active">Active</a>
                </li>
                <li>
                    <a className={filter==="completed" ? "selected" : ""} onClick={() => setFilter("completed")} href="#/completed">Completed</a>
                </li>
            </ul>
            <button className="clear-completed" onClick={() => removeCompletedTodos()}>Clear completed</button>
        </footer>
    )
}