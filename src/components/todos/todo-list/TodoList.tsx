import Todo from "../../../models/Todo"
import TodoItem from './TodoItem'
import classNames from 'classnames';
import { useState } from "react";

type TodoListProps = {
    todos: Todo[],
    removeTodo: (id: number) => void,
    changeTodo: (todo: Partial<Todo>, id: number) => void
}

export default function TodoList({ todos, removeTodo, changeTodo }: TodoListProps){
    const [editModeIndex, setEditMode] = useState<number>(0);

    const resetEditMode = () => {
        setEditMode(0)
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