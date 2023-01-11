import Todo from "../../../models/Todo"
import TodoItem from './TodoItem'
import classNames from 'classnames';
import { useState } from "react";

type TodoListProps = {
    todos: Todo[],
    removeTodo: (id: string) => void,
    changeTodo: (todo: Partial<Todo>, id: string) => void
}

export default function TodoList({ todos, removeTodo, changeTodo }: TodoListProps){
    const [editModeIndex, setEditMode] = useState<string>();

    const resetEditMode = () => {
        setEditMode("")
    }

    return(		
				<ul className="todo-list">
					{todos.map((todo) => {
                        const myComponentClasses = classNames({
                            "completed": todo.completed,
                            "editing": editModeIndex === todo.id
                        })
                        return(<li key={todo.id} className={myComponentClasses}>
                                    <TodoItem 
                                            todoTitle={todo.title}
                                            todoStatus={todo.completed}
                                            removeTodo={() => removeTodo(todo.id)}
                                            changeTodo={(t: Partial<Todo>, id=todo.id) => changeTodo(t, id)}
                                            setEditMode={() => setEditMode(todo.id)}
                                            resetEditMode={resetEditMode} />
                               </li>)
                    })}
				</ul>
    )
}