import useTodosHook from "../../../hooks/todos/useTodosHook"
import Todo from "../../../models/Todo"
import { act, renderHook } from "@testing-library/react"

describe('useTodosHook should', () => {

    test("init state value", ()=> {
        const {result} = renderHook(() => useTodosHook())
        
        expect(result.current.todos.length).toEqual(3);
        expect(result.current.filter).toEqual("all")
        expect(result.current.todoContent).toEqual('')
        expect(result.current.markAllTodosBool).toEqual(true)
    })

    test("change value of markAllTodosBool if setMarkAllTodosBool is called with defined boolean", () => {
        const {result} = renderHook(() => useTodosHook())

        const parameter = false;

        expect(result.current.markAllTodosBool).toEqual(true)
        act(() => {
            result.current.setMarkAllTodosBool(parameter);
        })

        expect(result.current.markAllTodosBool).toEqual(parameter)
    })

    test("change value of todoContent if setTodoContent is called with a string", () => {
        const {result} = renderHook(() => useTodosHook())

        const parameter = "new title";

        expect(result.current.todoContent).toEqual("")

        act(() => {
            result.current.setTodoContent(parameter);
        })

        expect(result.current.todoContent).toEqual(parameter)
    })

    test("change value of filter if setFilter is called with a string", () => {
        const {result} = renderHook(() => useTodosHook())

        const parameter = "active";

        expect(result.current.filter).toEqual("all")

        act(() => {
            result.current.setFilter(parameter);
        })

        expect(result.current.filter).toEqual(parameter)
    })

    test("add todo to state when addTodo is invoked with a title", () => {
        
        const {result} = renderHook(() => useTodosHook())

        const title = "Soccer at 6pm";
        const todosLength = result.current.todos.length
        expect(result.current.todos.length).toEqual(todosLength);

        
        act(() => {
            result.current.addTodo(title)
          });

        expect(result.current.todos.length).toEqual(todosLength+1)
        expect(result.current.todos[todosLength].content).toEqual(title);
    })

    test("remove todo from state when remove is invoked with a todo", () => {
        
        const {result} = renderHook(() => useTodosHook())

        const todosLength = result.current.todos.length
        expect(result.current.todos.length).toEqual(todosLength);

        const todo = {
            id:1,
            content:"Wake up early",
            completed: false
        }

        const todosLeft = [{
            id:2,
            content:"Sleep early",
            completed: false
        },
        {
            id:3,
            content:"Do the chores",
            completed: true
        }]

        
        act(() => {
            result.current.removeTodo(todo)
          });

        expect(result.current.todos.length).toEqual(todosLength-1)
        expect(result.current.todos).toEqual(todosLeft)
    })

    test("change status of a todo when changeStatusOfTodo is invoked with a defined boolean", () =>{
        const {result} = renderHook(() => useTodosHook())


        expect(result.current.todos[0].completed).toEqual(false);
        
        act(() => {
            result.current.changeStatusOfTodo(true, 1)
          });

          expect(result.current.todos[0].completed).toEqual(true);
    })

    test("change content of a todo when changeContentOfTodo is invoked with a defined string", () =>{
        const {result} = renderHook(() => useTodosHook())


        expect(result.current.todos[0].content).toEqual("Wake up early");

        const parameter = "Do homework"
        
        act(() => {
            result.current.changeContentOfTodo(parameter, 1)
          });

          expect(result.current.todos[0].content).toEqual(parameter);
    })

    test("remove completed todos when removeCompletedTodos is invoked", () =>{
        const {result} = renderHook(() => useTodosHook())

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
        const {result} = renderHook(() => useTodosHook())

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
    
    test("should filter todos with active todos if filter is 'all'", () =>{
        const {result} = renderHook(() => useTodosHook())
        

        let filteredArray: Todo[] = []
        const todosLength = result.current.todos.length

        act(() => {
          result.current.setFilter("all")
          filteredArray = result.current.setTodosArrayByFilter()
        })

        console.log(filteredArray)
        expect(result.current.todos.length).toEqual(todosLength)
    })
    
})