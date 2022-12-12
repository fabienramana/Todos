import { render, screen } from "@testing-library/react"
import TodoList from "../../../../components/todos/todo-list/TodoList"
import Todo from "../../../../models/Todo"



describe('TodoList component', () => {

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
    
    test('should display all todos content', () => {
  
      const removeTodo = () => {}
      const changeTodo = () => {}
  
      render(<TodoList todos={listOfTodos} 
        removeTodo={removeTodo}
        changeTodo={changeTodo}/>)
      
      listOfTodos.forEach(todo => {
        expect(screen.getByText(todo.title)).toBeInTheDocument();
      })
    })

    test('should match snapshot', () => {
  
      const removeTodo = () => {}
      const changeTodo = () => {}
  
      const {asFragment} = render(<TodoList todos={listOfTodos} 
        removeTodo={removeTodo}
        changeTodo={changeTodo}/>)
  
      expect(asFragment()).toMatchSnapshot();
    })

  })