import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoList from '../components/todos/TodoList';
import TodoItem from '../components/todos/TodoItem';
import Todo from '../models/Todo';
import TodoInputCreator from '../components/todos/TodoInputCreator';
import Footer from '../components/todos/Footer';


describe('TodoItem component', () => {
  test('should display todo content', () => {
    const todo: Todo ={
      id:1,
      content: "Soccer match at 3 pm",
      completed: false
    }

    const removeTodo = jest.fn()
    const changeStatusOfTodo = jest.fn()
    const changeContentOfTodo = jest.fn()

    render(<TodoItem todo={todo}
            removeTodo={removeTodo}
            changeStatusOfTodo={changeStatusOfTodo}
            changeContentOfTodo={changeContentOfTodo}/>)

    expect(screen.getByText(todo.content)).toBeInTheDocument();
  })
})


describe('TodoList component', () => {
  test('should display all todos content', () => {
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
})

describe('TodoInputCreator component', () => {
  test('should create a new todo and add to the state list', () => {

    const addTodo = jest.fn();
    const title = "Coucou"

    render(<TodoInputCreator addTodo={addTodo}/>)

    const input = screen.getByPlaceholderText("What needs to be done?")
    
    
    fireEvent.change(input, { target: {value: `${title}`} });
    input.focus();
    fireEvent.keyPress(input, { key: "Enter", code: 13 });
    expect(addTodo).toHaveBeenCalledTimes(1);
    expect(addTodo).toHaveBeenCalledWith(title);
    
  })
}) 


describe('Footer component', ()=>{

  /****************** Comment faire pour matcher le texte quand split en plusieurs balises ? EX : <p><strong>0</strong> item left</p> ****************/   
  test('should render number of todos left', ()=>{

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
    const filter = "all"

    render(<Footer todoArray={listOfTodos} 
            removeCompletedTodos={removeCompletedTodos}
            setFilter={setFilter}
            filter={filter}/>)

    const nbrTodosLeft = listOfTodos.filter((todo)=> todo.completed === false).length

    expect(screen.getByText(`${nbrTodosLeft} item left`)).toBeInTheDocument();

  })
})
