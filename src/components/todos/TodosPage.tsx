import TodoFooter from "./todo-footer/TodoFooter";
import TodoInputCreator from "./todo-creator/TodoInputCreator";
import TodoList from "./todo-list/TodoList";
import useTodosHook from "../../hooks/todos/useTodosHook"
import MarkAllTodos from "./todo-list/MarkAllTodos";

type TodosPageProps = {
    displayFilter: string
}

export default function TodosPage({displayFilter}: TodosPageProps){

    const { 
        todos, 
        addTodo, 
        removeTodo,
        changeTodo,
        removeCompletedTodos,
        changeStatusOfAllTodos,
        setTodosArrayByFilter 
    } = useTodosHook(displayFilter)

    
    return (
        <>
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>   
                </header>
                <TodoInputCreator addTodo={addTodo}/>
                {todos.length>0 && (
                    <>
                    <section className="main">
                        <MarkAllTodos changeStatusOfAllTodos={changeStatusOfAllTodos}/>
                        <TodoList todos={setTodosArrayByFilter()}
                                  removeTodo={removeTodo}
                                  changeTodo={changeTodo}/>
                    </section>
                    <TodoFooter
                            removeCompletedTodos={removeCompletedTodos}
                            nbrOfTodosCompleted={todos.filter((todo) => todo.completed === true).length}
                            nbrOfTodosLeft={todos.filter((todo) => todo.completed === false).length}/>
                    </>
                )}
            </section>
            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>Created by <a href="http://todomvc.com">Fabien</a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </> 
    )
}