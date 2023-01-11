import useTodosHook from "../../../hooks/todos/useTodosHook"
import { act, renderHook } from "@testing-library/react"

describe('useTodosHook should', () => {

    test("init state value", ()=> {
        const {result} = renderHook(() => useTodosHook(""))
        
        expect(result.current.todos.length).toEqual(3);
    })

    test("add todo to state when addTodo is invoked with a title", () => {
        
        const {result} = renderHook(() => useTodosHook(""))

        const title = "Soccer at 6pm";
        const todosLength = result.current.todos.length
        expect(result.current.todos.length).toEqual(todosLength);

        
        act(() => {
            result.current.addTodo(title)
          });

        expect(result.current.todos.length).toEqual(todosLength+1)
        expect(result.current.todos[todosLength].title).toEqual(title);
    })

    test("remove todo from state when remove is invoked with a todo", () => {
        
        const {result} = renderHook(() => useTodosHook(""))

        const todosLength = result.current.todos.length
        expect(result.current.todos.length).toEqual(todosLength);

        const todo = {
            id:"1",
            title:"Wake up early",
            completed: false
        }

        const todosLeft = [{
            id:"2",
            title:"Sleep early",
            completed: false
        },
        {
            id:"3",
            title:"Do the chores",
            completed: true
        }]

        
        act(() => {
            result.current.removeTodo(todo.id)
          });

        expect(result.current.todos.length).toEqual(todosLength-1)
        expect(result.current.todos).toEqual(todosLeft)
    })

    test("remove completed todos when removeCompletedTodos is invoked", () =>{
        const {result} = renderHook(() => useTodosHook(""))

        let trueTodos = 0;

        result.current.todos.forEach(todo => {
            if(todo.completed)
                trueTodos +=1;
        })
        
        expect(trueTodos).toEqual(1)

        act(() => {
            result.current.removeCompletedTodos()
        });

        result.current.todos.forEach(todo =>{
            expect(todo.completed).toEqual(false)
        })        
    })

    test("change status of all todos todos when changeStatusOfAllTodos is invoked with a defined boolean", () =>{
        const {result} = renderHook(() => useTodosHook(""))

        let trueTodos = 0;
        let falseTodos = 0;

        result.current.todos.forEach(todo => {
            if(todo.completed)
                trueTodos +=1;
            else
                falseTodos +=1;
        })
        
        expect(trueTodos).toEqual(1)
        expect(falseTodos).toEqual(2)

        act(() => {
            result.current.changeStatusOfAllTodos(true)
        });

        result.current.todos.forEach(todo =>{
            expect(todo.completed).toEqual(true)
        })        
    })
})