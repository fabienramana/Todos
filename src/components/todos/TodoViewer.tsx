import Footer from "./Footer";
import Header from "./Header";
import TodoInputCreator from "./TodoInputCreator";
import TodoList from "./TodoList";
import Todo from "../../models/Todo";

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
    
    return (
        <div>
            <section className="todoapp">
                <Header/>
                <TodoInputCreator/>
                <TodoList todoArray={listOfTodos}/>
                <Footer/>
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