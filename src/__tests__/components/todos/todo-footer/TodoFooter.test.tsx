import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../../../../components/todos/todo-footer/TodoFooter";
import Todo from "../../../../models/Todo";


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
  
    let filter = "all"
  
    /****************** Comment faire pour matcher le texte quand split en plusieurs balises ? EX : <p><strong>0</strong> item left</p> ****************/   
    test('should render number of todos left', ()=>{
  
      const removeCompletedTodos = () => {};
      const setFilter = () => {};
  
      render(<Footer todoArray={listOfTodos} 
              removeCompletedTodos={removeCompletedTodos}
              setFilter={setFilter}
              filter={filter}/>)
  
      const nbrTodosLeft = listOfTodos.filter((todo)=> todo.completed === false).length
  
      expect(screen.getByText(`${nbrTodosLeft} items left`)).toBeInTheDocument();
    })
  
    test("should call removeCompletedTodos if Clear completed button is clicked", ()=>{
  
      const removeCompletedTodos = jest.fn();
      const setFilter = () => {};
  
      render(<Footer todoArray={listOfTodos} 
        removeCompletedTodos={removeCompletedTodos}
        setFilter={setFilter}
        filter={filter}/>)
  
        fireEvent.click(screen.getByRole('button'));
  
        expect(removeCompletedTodos).toBeCalledTimes(1);
    })
  
    test("should call setFilter with all if all filter is clicked", ()=>{
  
      const removeCompletedTodos = jest.fn();
      const setFilter = jest.fn();
  
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
      
      const removeCompletedTodos = () => {};
      const setFilter = jest.fn();
  
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
  
      const removeCompletedTodos = () => {};
      const setFilter = jest.fn();
  
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
  