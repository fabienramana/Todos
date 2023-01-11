import axios from 'axios'
import {useState} from 'react'
import Todo from '../../models/Todo'

export default function useInitTodos(parentFilter: string){

    const domain = "http://localhost:4000"

     const listOfTodos: Array<Todo> = [
        {
            id:'aaa',
            title:"Wake up early",
            completed: false
        },
        {
            id:'bbb',
            title:"Sleep early",
            completed: false
        },
        {
            id:'ccc',
            title:"Do the chores",
            completed: true
        }
    ] 

    const [todos, setTodos] = useState<Todo[]>(listOfTodos)

    const addTodo = (title: string): void => {
        axios.post(`${domain}/todos`, {title})
        .then(res => {
            console.log(res.data)
            return axios.get(`${domain}/todos`)
        }).then(res => {
            console.log(res.data)
            setTodos(res.data)
        });
    }

    const removeTodo = (id:string) => {
        axios.delete(`${domain}/todos/${id}`)
        .then(() => {
            return axios.get(`${domain}/todos`)
        }).then(res => {
            console.log(res.data)
            setTodos(res.data)
        });
    }


    const changeTodo = (todo: Partial<Todo>, id: string) => {
        axios.patch(`${domain}/todos/${id}`, todo)
        .then(() => {
            return axios.get(`${domain}/todos`)
        }).then(res => {
            console.log(res.data)
            setTodos(res.data)
        });
    }

    const removeCompletedTodos = () => {
        axios.delete(`${domain}/todos?completed=true`)
        .then(() => {
            return axios.get(`${domain}/todos`)
        }).then(res => {
            console.log(res.data)
            setTodos(res.data)
        });
    }

    const changeStatusOfAllTodos = (status: boolean) =>{
        todos.forEach(async (todo) => {
            axios.patch(`${domain}/todos/${todo.id}`, {completed: status})
            .then(() => {
                return axios.get(`${domain}/todos`)
            })
            .then(res => {
                console.log(res.data)
                setTodos(res.data)
            })
        })
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
             setTodosArrayByFilter,
             setTodos };
}
