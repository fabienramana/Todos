import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoItem from "../../../../components/todos/todo-list/TodoItem"
import Todo from "../../../../models/Todo"


describe('TodoItem component', () => {
    const todo: Todo ={
      id:1,
      title: "Soccer match at 3 pm",
      completed: false
    }
  
    test('should display todo title', () => {
  
      const removeTodo = () => {}
      const changeTodo = () => {}
      const setEditMode = () => {}
      const resetEditMode = () => {}
  
      const {asFragment} = render(<TodoItem todoTitle={todo.title}
              todoStatus={todo.completed}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
              setEditMode={setEditMode}
              resetEditMode={resetEditMode}/>)
  
      expect(screen.getByText(todo.title)).toBeInTheDocument();
      expect(asFragment()).toMatchSnapshot();
    })
  
    test("should call 'removeTodo' if clicked on delete button", ()=> {
  
      const removeTodo = jest.fn()
      const changeTodo = () => {}
      const setEditMode = () => {}
      const resetEditMode = () => {}
  
      render(<TodoItem todoTitle={todo.title}
              todoStatus={todo.completed}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
              setEditMode={setEditMode}
              resetEditMode={resetEditMode}/>)
  
      fireEvent.click(screen.getByRole('button', {
        name: /delete/
      }));
  
      expect(removeTodo).toBeCalledTimes(1);
      expect(removeTodo).toBeCalledWith()
    })
  
    test("should call changeTodo with a status if checkbox is toggled once", () => {
  
      const removeTodo = () => {}
      const changeTodo = jest.fn()
      const setEditMode = () => {}
      const resetEditMode = () => {}
  
      render(<TodoItem todoTitle={todo.title}
              todoStatus={todo.completed}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
              setEditMode={setEditMode}
              resetEditMode={resetEditMode}/>)

      fireEvent.click(screen.getByRole('checkbox', {
        name: /changeStatus/
      }));
      
      expect(changeTodo).toHaveBeenCalledTimes(1)
      expect(changeTodo).toHaveBeenCalledWith({completed: !todo.completed})
    })


    test("should call 'setEditMode' if label is double clicked", () => {
  
      const removeTodo = () => {}
      const changeTodo = () => {}
      const setEditMode = jest.fn()
      const resetEditMode = () => {}
  
      render(<TodoItem todoTitle={todo.title}
              todoStatus={todo.completed}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
              setEditMode={setEditMode}
              resetEditMode={resetEditMode}/>)

      fireEvent.doubleClick(screen.getByLabelText("title"));
      
      expect(setEditMode).toHaveBeenCalledTimes(1)
    })


    test("should call 'changeTodo' with modified string in input is changed, then enter is pressed", () => {
  
      const removeTodo = () => {}
      const changeTodo = jest.fn()
      const setEditMode = () => {}
      const resetEditMode = () => {}
  
      render(<TodoItem todoTitle={todo.title}
              todoStatus={todo.completed}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
              setEditMode={setEditMode}
              resetEditMode={resetEditMode}/>)

      const input = screen.getByRole("textbox")

      fireEvent.change(input, {target: {value: ''}})
      const modifiedString = `${todo.title}aaa`

      userEvent.type(input, `${modifiedString}{Enter}`);
      
      expect(changeTodo).toHaveBeenCalledTimes(1)
      expect(changeTodo).toHaveBeenCalledWith({title: `${modifiedString}`})
    })

    test("should call 'removeTodo' if input is changed to blank, then enter is pressed", () => {
  
      const removeTodo = jest.fn()
      const changeTodo = () => {}
      const setEditMode = () => {}
      const resetEditMode = () => {}
  
      render(<TodoItem todoTitle={todo.title}
              todoStatus={todo.completed}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
              setEditMode={setEditMode}
              resetEditMode={resetEditMode}/>)

      const input = screen.getByRole("textbox")
      fireEvent.change(input, {target: {value: ''}})
      userEvent.type(input, `{Enter}`);
      
      expect(removeTodo).toHaveBeenCalledTimes(1)
      expect(removeTodo).toHaveBeenCalledWith()
    })

    test("should call 'removeTodo' if input is filled with whitespaces blank, then enter is pressed", () => {
  
      const removeTodo = jest.fn()
      const changeTodo = () => {}
      const setEditMode = () => {}
      const resetEditMode = () => {}
  
      render(<TodoItem todoTitle={todo.title}
              todoStatus={todo.completed}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
              setEditMode={setEditMode}
              resetEditMode={resetEditMode}/>)

      const input = screen.getByRole("textbox")
      fireEvent.change(input, {target: {value: ''}})
      userEvent.type(input, `{Enter}`);
      
      expect(removeTodo).toHaveBeenCalledTimes(1)
      expect(removeTodo).toHaveBeenCalledWith()
    })
  })