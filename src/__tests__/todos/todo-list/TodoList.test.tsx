import { render, screen, fireEvent } from "@testing-library/react"
import TodoList from "../../../components/todos/todo-list/TodoList"
import Todo from "../../../models/Todo"



describe('TodoList component', () => {

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
    
    test('should display all todos content', () => {
  
      const removeTodo = jest.fn()
      const changeStatusOfTodo = jest.fn()
      const changeStatusOfAllTodos = jest.fn()
      const changeContentOfTodo = jest.fn()
  
      render(<TodoList todoArray={listOfTodos} 
        removeTodo={removeTodo}
        changeStatusOfTodo={changeStatusOfTodo}
        changeStatusOfAllTodos={changeStatusOfAllTodos}
        changeContentOfTodo={changeContentOfTodo}/>)
      
      listOfTodos.forEach(todo => {
        expect(screen.getByText(todo.content)).toBeInTheDocument();
      })
    })
  
    test("should call 'changeStatusOfAllTodos' if 'mark all' label is clicked", () => {
  
      const removeTodo = jest.fn()
      const changeStatusOfTodo = jest.fn()
      const changeStatusOfAllTodos = jest.fn()
      const changeContentOfTodo = jest.fn()
  
      render(<TodoList todoArray={listOfTodos} 
        removeTodo={removeTodo}
        changeStatusOfTodo={changeStatusOfTodo}
        changeStatusOfAllTodos={changeStatusOfAllTodos}
        changeContentOfTodo={changeContentOfTodo}/>)
        
        const markAllLabel = screen.getByLabelText('mark-all')
  
        fireEvent.click(markAllLabel);
  
        expect(changeStatusOfAllTodos).toBeCalledTimes(1);
        expect(changeStatusOfAllTodos).toBeCalledWith(true)
    })
  })