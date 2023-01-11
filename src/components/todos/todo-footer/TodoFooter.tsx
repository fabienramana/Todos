import { NavLink } from "react-router-dom"

type FooterProps = {
    removeCompletedTodos: ()=> void,
    nbrOfTodosLeft: number,
    nbrOfTodosCompleted: number
}

export default function TodoFooter({removeCompletedTodos, nbrOfTodosLeft, nbrOfTodosCompleted}: FooterProps){

    return(
        <footer className="footer">
            <span className="todo-count">{nbrOfTodosLeft} item{nbrOfTodosLeft !== 1 && "s"} left</span>
             <ul className="filters">
                <li>
                    <NavLink data-testid="all" className={({ isActive }) => (isActive && 'selected') || undefined} to="/">All</NavLink>
                </li>
                <li>
                    <NavLink data-testid="active" className={({ isActive }) => (isActive && 'selected') || undefined} to="/active">Active</NavLink>
                </li>
                <li>
                    <NavLink data-testid="completed" className={({ isActive }) => (isActive && 'selected') || undefined} to="/completed">Completed</NavLink>
                </li>
            </ul>
            {nbrOfTodosCompleted > 0 && (
            <> 
            <button className="clear-completed" onClick={() => removeCompletedTodos()}>Clear completed</button>
            </>
            )}
        </footer>
    )
}