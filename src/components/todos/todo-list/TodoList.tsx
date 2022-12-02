import Todo from "../../../models/Todo"
import TodoItem from './TodoItem'
import classNames from 'classnames';
import useTodosHook from '../../../hooks/todos/useTodosHook'
import { useState } from "react";

type TodoListProps = {
    todoArray: Todo[],
    removeTodo: (todo: Todo) => void,
    changeStatusOfTodo: (todoStatus: boolean, index: number) => void,
    changeStatusOfAllTodos: (status: boolean) => void, 
    changeContentOfTodo: (todoContent: string, index: number) => void
}

export default function TodoList({ todoArray, removeTodo, changeStatusOfTodo, changeStatusOfAllTodos, changeContentOfTodo }: TodoListProps){

    // const [markAllTodosBool, setMarkAllTodosBool] = useState<boolean>(true);
    const [editModeIndex, setEditMode] = useState<number>(0);

    const { markAllTodosBool, setMarkAllTodosBool } = useTodosHook("");

    function updateInputValue(){
        changeStatusOfAllTodos(markAllTodosBool);
        setMarkAllTodosBool(!markAllTodosBool)
    }

    return(
        <section className="main">
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label aria-label="mark-all" onClick={() => updateInputValue()}>Mark all as complete</label>
				<ul className="todo-list">
					{todoArray.map((todo) => {
                        const myComponentClasses = classNames({
                            "completed": todo.completed ? true : false,
                            "editing": editModeIndex === todo.id ? true : false
                        })
                        return(<li key={todo.id} className={myComponentClasses}>
                                    <TodoItem 
                                            todo={todo}
                                            removeTodo={removeTodo}
                                            changeStatusOfTodo={changeStatusOfTodo}
                                            changeContentOfTodo={changeContentOfTodo}
                                            editModeIndex={editModeIndex}
                                            setEditMode={setEditMode} />
                               </li>)
                    })}
				</ul>
			</section>
    )
}