import Footer from "./Footer";
import Header from "./Header";
import TodoInputCreator from "./TodoInputCreator";
import TodoList from "./TodoList";
import Todo from "../../models/Todo";

import {useState} from 'react'

export default function TodoViewer(): JSX.Element{

    const listOfTodos: Array<Todo> = [
        {
            content:"Wake up early",
            completed: false
        },
        {
            content:"Sleep early",
            completed: false
        },
        {
            content:"Do the chores",
            completed: true
        } 

    ]

    const [todos, setTodos] = useState<Todo[]>(listOfTodos)

    function addTodo(content: string): void{
        const todo: Todo = {
            content,
            completed: false
        }
        setTodos([...todos, todo]);
    }

    function removeTodo(index: number): void{
        setTodos(todos.filter((todo,i) => i!== index))
    }

    function changeStatusOfTodo(todoStatus: boolean, index: number): void{
        setTodos(todos.map((todo, i) => {
            if(i === index){
                todo.completed = todoStatus
            }
            return todo;
        }))
    }

    function removeCompletedTodos(): void{
        setTodos(todos.filter((todo) => todo.completed === false))
    }
    
    return (
        <div>
            <section className="todoapp">
                <Header/>
                <TodoInputCreator addTodo={addTodo}/>
                <TodoList todoArray={todos} removeTodo={removeTodo} changeStatusOfTodo={changeStatusOfTodo}/>
                <Footer todoArray={todos} removeCompletedTodos={removeCompletedTodos}/>
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