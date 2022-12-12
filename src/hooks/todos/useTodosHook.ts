import {useState} from 'react'
import Todo from '../../models/Todo'

export default function useInitTodos(parentFilter: string){
    const listOfTodos: Array<Todo> = [
        {
            id:1,
            title:"Wake up early",
            completed: false
        },
        {
            id:2,
            title:"Sleep early",
            completed: false
        },
        {
            id:3,
            title:"Do the chores",
            completed: true
        }
    ]

    const [todos, setTodos] = useState<Todo[]>(listOfTodos)

    const addTodo = (title: string): void => {
        let todo: Todo
        if(todos.length>0){
            const lastElemId = todos[todos.length -1].id
            todo = {
                id: lastElemId+1,
                title,
                completed: false
            }
        }
        else{
            todo = {
                id: 1,
                title,
                completed: false
            }
        }
        setTodos([...todos, todo]);
    }

    const removeTodo = (id:number) => {
        setTodos(todos.filter((t) => t.id !== id));
    }


    const changeTodo = (todo: Partial<Todo>, id: number) => {
        const shallowCopy = todos.slice()
        
        shallowCopy.forEach(t => {
            if(t.id === id){
                if("title" in todo){
                    t.title = todo.title || ""
                }
                if("completed" in todo){
                    t.completed = todo.completed || false
                }
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
            if(parentFilter === "active" && todo.completed === false){
                return true;
            }
            else if(parentFilter === "completed" && todo.completed === true){
                return true;
            }
            else if(parentFilter === "all"){
                return true;
            }
            return false;
        })
    }

    return { todos, 
             addTodo, 
             removeTodo,
             changeTodo,
             removeCompletedTodos,
             changeStatusOfAllTodos,
             setTodosArrayByFilter };
}
