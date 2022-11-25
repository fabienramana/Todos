import TodoFooter from "./todo-footer/TodoFooter";
import TodoInputCreator from "./todo-creator/TodoInputCreator";
import TodoList from "./todo-list/TodoList";
import Todo from "../../models/Todo";

import {useState} from 'react'

export default function TodoApp(){

    const listOfTodos: Array<Todo> = [
        {
            id:1,
            content:"Wake up early",
            completed: false
        },
        {
            id:2,
            content:"Sleep early",
            completed: false
        },
        {
            id:3,
            content:"Do the chores",
            completed: true
        }
    ]

    const [todos, setTodos] = useState<Todo[]>(listOfTodos)
    const [filter, setFilter] = useState<string>("all");

    function addTodo(content: string): void{
        const lastElemId = todos[todos.length -1].id
        const todo: Todo = {
            id: lastElemId+1,
            content,
            completed: false
        }
        setTodos([...todos, todo]);
    }

    function removeTodo(todo: Todo): void{
        setTodos(todos.filter((t) => t.content !== todo.content)  );
    }

    function changeStatusOfTodo(todoStatus: boolean, index: number): void{
        const shallowCopy = todos.slice();
 
        shallowCopy.forEach(todo => {
            if(index === todo.id){
                todo.completed = todoStatus
                console.log(todo)
            }
        })
        setTodos(shallowCopy)
    }

    function changeContentOfTodo(todoContent: string, index: number): void{
        const shallowCopy = todos.slice();

        shallowCopy.forEach(todo => {
            if(index === todo.id){
                todo.content = todoContent
            }
        })

        setTodos(shallowCopy)
    }

    function removeCompletedTodos(): void{
        setTodos(todos.filter((todo) => todo.completed === false))
    }

    function changeStatusOfAllTodos(status: boolean): void{
        setTodos(todos.map((todo)=> {
            todo.completed = status
            return todo;
        }))
    }

    function setTodosArrayByFilter(): Todo[]{
        return todos.filter((todo)=>{
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
        })
    }
    
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