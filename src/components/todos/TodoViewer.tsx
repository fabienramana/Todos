import Footer from "./Footer";
import Header from "./Header";
import TodoInputCreator from "./TodoInputCreator";
import TodoList from "./TodoList";

export default function TodoViewer(): JSX.Element{
    return (
        <section className="todoapp">
            <Header/>
            <TodoInputCreator/>
            <TodoList/>
            <Footer/>
        </section>
        
    )
}