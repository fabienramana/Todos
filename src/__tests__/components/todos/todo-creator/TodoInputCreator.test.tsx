import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import TodoInputCreator from '../../../../components/todos/todo-creator/TodoInputCreator';


describe('TodoInputCreator component', () => {
    test("should call 'addTodo' with title entered in input if enter key is pressed", () => {
  
      const addTodo = jest.fn();
      const title = "Coucou"
  
      render(<TodoInputCreator addTodo={addTodo}/>)
  
      const input = screen.getByPlaceholderText("What needs to be done?")
      
      
      fireEvent.change(input, { target: {value: `${title}`} });
      fireEvent.keyDown(input, { key: "Enter", code: 13 });
      expect(addTodo).toHaveBeenCalledTimes(1);
      expect(addTodo).toHaveBeenCalledWith(title);
    })
  }) 