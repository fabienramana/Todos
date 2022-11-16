import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../components/todos/TodoList';
import TodoItem from '../components/todos/TodoItem';
import Todo from '../models/Todo';
import TodoInputCreator from '../components/todos/TodoInputCreator';
import addTodo from '../components/todos/Page'
import todos from '../components/todos/Page'


describe('TodoItem component', () => {
  test('should display todo content', () => {
    const todo: Todo ={
      content: "Soccer match at 3 pm",
      completed: false
    }
    render(<TodoItem todo={todo}/>)

    expect(screen.getByText(todo.content)).toBeInTheDocument();
  })
})


describe('TodoList component', () => {
  test('should display all todos content', () => {
    const listOfTodos: Array<Todo> = [
      {
          content:"Wake up early",
          completed: false
      },
      {
          content:"Sleep early",
          completed: false
      },
      {
          content:"Do the chores",
          completed: true
      } 

  ]

    render(<TodoList todoArray={listOfTodos}/>)

    listOfTodos.forEach(todo => {
      expect(screen.getByText(todo.content)).toBeInTheDocument();
    })
  })
})
/*
describe('TodoInputCreator component', () => {
  test('should create a new todo and add to the state list', () => {

    render(<TodoInputCreator addTodo={addTodo}/>)
  })
}) */
