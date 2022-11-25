import {useState} from 'react'
import Todo from '../models/Todo'

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

    return { todos, setTodos, filter, setFilter };
}
