import TodoFooter from "./todo-footer/TodoFooter";
import TodoInputCreator from "./todo-creator/TodoInputCreator";
import TodoList from "./todo-list/TodoList";
import useTodosHook from "../../hooks/todos/useTodosHook"

export default function TodoApp(){

    const { 
        todos, 
        filter, 
        setFilter, 
        addTodo, 
        removeTodo, 
        changeStatusOfTodo,
        changeContentOfTodo,
        removeCompletedTodos,
        changeStatusOfAllTodos,
        setTodosArrayByFilter 
    } = useTodosHook()
    
    return (
        <div>
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>   
                </header>
                <TodoInputCreator addTodo={addTodo}/>
                <div style={ todos.length>0 ? {display: ""} : {display: "none"}}>
                    <TodoList todoArray={setTodosArrayByFilter()}
                            removeTodo={removeTodo}
                            changeStatusOfTodo={changeStatusOfTodo}
                            changeContentOfTodo={changeContentOfTodo}
                            changeStatusOfAllTodos={changeStatusOfAllTodos}/>
                    <TodoFooter todoArray={todos}
                            removeCompletedTodos={removeCompletedTodos}
                            filter={filter}
                            setFilter={setFilter}/>
                </div>
            </section>
            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>Created by <a href="http://todomvc.com">Fabien</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>

            <script src="node_modules/todomvc-common/base.js"></script>
            <script src="js/app.js"></script>
        </div>
        
        
    )
}