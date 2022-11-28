import {useState} from 'react'
import Todo from '../../models/Todo'

export default function useInitTodos(){
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

    const addTodo = (content: string): void => {
        const lastElemId = todos[todos.length -1].id
        const todo: Todo = {
            id: lastElemId+1,
            content,
            completed: false
        }
        setTodos([...todos, todo]);
    }

    const removeTodo = (todo: Todo) => {
        setTodos(todos.filter((t) => t.content !== todo.content)  );
    }

    const changeStatusOfTodo = (todoStatus: boolean, index: number) => {
        const shallowCopy = todos.slice();
 
        shallowCopy.forEach(todo => {
            if(index === todo.id){
                todo.completed = todoStatus
                console.log(todo)
            }
        })
        setTodos(shallowCopy)
    }

    const changeContentOfTodo = (todoContent: string, index: number) => {
        const shallowCopy = todos.slice();

        shallowCopy.forEach(todo => {
            if(index === todo.id){
                todo.content = todoContent
            }
        })

        setTodos(shallowCopy)
    }

    const removeCompletedTodos = () => {
        setTodos(todos.filter((todo) => todo.completed === false))
    }

    const changeStatusOfAllTodos = (status: boolean) =>{
        setTodos(todos.map((todo)=> {
            todo.completed = status
            return todo;
        }))
    }

    const setTodosArrayByFilter = (): Todo[] => {
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

    return { todos, 
             filter, 
             setFilter, 
             addTodo, 
             removeTodo, 
             changeStatusOfTodo,
             changeContentOfTodo,
             removeCompletedTodos,
             changeStatusOfAllTodos,
             setTodosArrayByFilter };
}
