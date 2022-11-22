import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from '../components/todos/TodoList';
import TodoItem from '../components/todos/TodoItem';
import Todo from '../models/Todo';
import TodoInputCreator from '../components/todos/TodoInputCreator';
import Footer from '../components/todos/Footer';


describe('TodoItem component', () => {
  const todo: Todo ={
    id:1,
    content: "Soccer match at 3 pm",
    completed: false
  }

  const removeTodo = jest.fn()
  const changeStatusOfTodo = jest.fn()
  const changeContentOfTodo = jest.fn()

  test('should display todo content', () => {

    render(<TodoItem todo={todo}
            removeTodo={removeTodo}
            changeStatusOfTodo={changeStatusOfTodo}
            changeContentOfTodo={changeContentOfTodo}/>)

    expect(screen.getByText(todo.content)).toBeInTheDocument();
  })

  test("should call 'removeTodo' with todo if clicked on delete button", ()=> {

    render(<TodoItem todo={todo}
            removeTodo={removeTodo}
            changeStatusOfTodo={changeStatusOfTodo}
            changeContentOfTodo={changeContentOfTodo}/>)

    fireEvent.click(screen.getByRole('button', {
      name: /delete/i
    }));

    const expectedCalledTimes = 1;
    const expectedToBeCalledWith = todo;

    expect(removeTodo).toBeCalledTimes(expectedCalledTimes);
    expect(removeTodo).toBeCalledWith(expectedToBeCalledWith)
  })

  test("should call changeStatusOfTodo if checkbox is toggled", () => {
    render(<TodoItem todo={todo}
      removeTodo={removeTodo}
      changeStatusOfTodo={changeStatusOfTodo}
      changeContentOfTodo={changeContentOfTodo}/>)

      fireEvent.click(screen.getByRole('checkbox'));
      fireEvent.click(screen.getByRole('checkbox'));

      expect(changeStatusOfTodo).toBeCalledTimes(2);
  })
})


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

  const removeTodo = jest.fn()
  const changeStatusOfTodo = jest.fn()
  const changeStatusOfAllTodos = jest.fn()
  const changeContentOfTodo = jest.fn()
  const filter= "all"

  
  test('should display all todos content', () => {

    render(<TodoList todoArray={listOfTodos} 
      removeTodo={removeTodo}
      changeStatusOfTodo={changeStatusOfTodo}
      filter={filter}
      changeStatusOfAllTodos={changeStatusOfAllTodos}
      changeContentOfTodo={changeContentOfTodo}/>)
    
    listOfTodos.forEach(todo => {
      expect(screen.getByText(todo.content)).toBeInTheDocument();
    })
  })

  test("should call 'changeStatusOfAllTodos' if 'mark all' label is clicked", () => {

    render(<TodoList todoArray={listOfTodos} 
      removeTodo={removeTodo}
      changeStatusOfTodo={changeStatusOfTodo}
      filter={filter}
      changeStatusOfAllTodos={changeStatusOfAllTodos}
      changeContentOfTodo={changeContentOfTodo}/>)
      
      const markAllLabel = screen.getByLabelText('mark-all')

      fireEvent.click(markAllLabel);

      expect(changeStatusOfAllTodos).toBeCalledTimes(1);
      expect(changeStatusOfAllTodos).toBeCalledWith(true)
  })
})

describe('TodoInputCreator component', () => {
  test("should call 'addTodo' with title entered in input if enter key is pressed", () => {

    const addTodo = jest.fn();
    const title = "Coucou"

    render(<TodoInputCreator addTodo={addTodo}/>)

    const input = screen.getByPlaceholderText("What needs to be done?")
    
    const expectedCalledTimes = 1;
    
    fireEvent.change(input, { target: {value: `${title}`} });
    fireEvent.keyDown(input, { key: "Enter", code: 13 });
    expect(addTodo).toHaveBeenCalledTimes(expectedCalledTimes);
    expect(addTodo).toHaveBeenCalledWith(title);
  })
}) 



describe('Footer component', ()=>{

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

  const removeCompletedTodos = jest.fn();
  const setFilter = jest.fn();
  let filter = "all"

  /****************** Comment faire pour matcher le texte quand split en plusieurs balises ? EX : <p><strong>0</strong> item left</p> ****************/   
  test('should render number of todos left', ()=>{

    render(<Footer todoArray={listOfTodos} 
            removeCompletedTodos={removeCompletedTodos}
            setFilter={setFilter}
            filter={filter}/>)

    const nbrTodosLeft = listOfTodos.filter((todo)=> todo.completed === false).length

    expect(screen.getByText(`${nbrTodosLeft} items left`)).toBeInTheDocument();
  })

  test("should call removeCompletedTodos if Clear completed button is clicked", ()=>{

    render(<Footer todoArray={listOfTodos} 
      removeCompletedTodos={removeCompletedTodos}
      setFilter={setFilter}
      filter={filter}/>)

      fireEvent.click(screen.getByRole('button'));

      expect(removeCompletedTodos).toBeCalledTimes(1);
  })

  test("should call setFilter with all if all filter is clicked", ()=>{

    render(<Footer todoArray={listOfTodos} 
      removeCompletedTodos={removeCompletedTodos}
      setFilter={setFilter}
      filter={filter}/>)

      fireEvent.click(screen.getByRole('link', {
        name: /all/i
      }));

      expect(setFilter).toBeCalledTimes(1);
      expect(setFilter).toBeCalledWith(filter)
  })

  test("should call setFilter with active if active filter is clicked", ()=>{

    filter = "active"
    render(<Footer todoArray={listOfTodos} 
      removeCompletedTodos={removeCompletedTodos}
      setFilter={setFilter}
      filter={filter}/>)

      fireEvent.click(screen.getByRole('link', {
        name: /active/i
      }));

      expect(setFilter).toBeCalledTimes(1);
      expect(setFilter).toBeCalledWith(filter)
  })

  test("should call setFilter with completed if active filter is clicked", ()=>{

    filter= "completed"

    render(<Footer todoArray={listOfTodos} 
      removeCompletedTodos={removeCompletedTodos}
      setFilter={setFilter}
      filter={filter}/>)

      fireEvent.click(screen.getByRole('link', {
        name: /completed/i
      }));

      expect(setFilter).toBeCalledTimes(1);
      expect(setFilter).toBeCalledWith(filter)
  })
})
