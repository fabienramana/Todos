import { render, screen, fireEvent } from "@testing-library/react"
import TodoItem from "../../../components/todos/todo-list/TodoItem"
import Todo from "../../../models/Todo"


describe('TodoItem component', () => {
    const todo: Todo ={
      id:1,
      content: "Soccer match at 3 pm",
      completed: false
    }
  
    
  
    test('should display todo content', () => {
  
      const removeTodo = jest.fn()
      const changeStatusOfTodo = jest.fn()
      const changeContentOfTodo = jest.fn()
  
      const {asFragment} = render(<TodoItem todo={todo}
              removeTodo={removeTodo}
              changeStatusOfTodo={changeStatusOfTodo}
              changeContentOfTodo={changeContentOfTodo}/>)
  
      expect(screen.getByText(todo.content)).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    })
  
    test("should call 'removeTodo' with todo if clicked on delete button", ()=> {
  
      const removeTodo = jest.fn()
      const changeStatusOfTodo = jest.fn()
      const changeContentOfTodo = jest.fn()
  
      render(<TodoItem todo={todo}
              removeTodo={removeTodo}
              changeStatusOfTodo={changeStatusOfTodo}
              changeContentOfTodo={changeContentOfTodo}/>)
  
      fireEvent.click(screen.getByRole('button', {
        name: /delete/i
      }));
  
      expect(removeTodo).toBeCalledTimes(1);
      expect(removeTodo).toBeCalledWith(todo)
    })
  
    test("should call changeStatusOfTodo if checkbox is toggled", () => {
  
      const removeTodo = jest.fn()
      const changeStatusOfTodo = jest.fn()
      const changeContentOfTodo = jest.fn()
  
      render(<TodoItem todo={todo}
        removeTodo={removeTodo}
        changeStatusOfTodo={changeStatusOfTodo}
        changeContentOfTodo={changeContentOfTodo}/>)
  
        fireEvent.click(screen.getByRole('checkbox'));
        fireEvent.click(screen.getByRole('checkbox'));
  
        expect(changeStatusOfTodo).toBeCalledTimes(2);
    })
  })