import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Footer from "../../../../components/todos/todo-footer/TodoFooter";


describe('Footer component', ()=>{
  
    let nbrOfTodosCompleted = 3
    let nbrOfTodosLeft = 3
  
    /****************** Comment faire pour matcher le texte quand split en plusieurs balises ? EX : <p><strong>0</strong> item left</p> ****************/   
    test('should render number of todos left', ()=>{
  
      const removeCompletedTodos = () => {};
  
      render(<Footer
              removeCompletedTodos={removeCompletedTodos}
              nbrOfTodosCompleted={nbrOfTodosCompleted}
              nbrOfTodosLeft={nbrOfTodosLeft}/>, {wrapper: BrowserRouter})
  
      
  
      expect(screen.getByText(`${nbrOfTodosLeft} items left`)).toBeInTheDocument();
    })
  
    test("should call removeCompletedTodos if Clear completed button is clicked", ()=>{
  
      const removeCompletedTodos = jest.fn();
  
      render(<Footer
        removeCompletedTodos={removeCompletedTodos}
        nbrOfTodosCompleted={nbrOfTodosCompleted}
        nbrOfTodosLeft={nbrOfTodosLeft}/>, {wrapper: BrowserRouter})
  
        fireEvent.click(screen.getByRole('button'));
  
        expect(removeCompletedTodos).toBeCalledTimes(1);
    })

    test("should render only completed todos if url is 'all'", ()=>{
  
      const removeCompletedTodos = () => {};
  
      render(<MemoryRouter initialEntries={["/all"]}>
        <Footer
              removeCompletedTodos={removeCompletedTodos}
              nbrOfTodosCompleted={nbrOfTodosCompleted}
              nbrOfTodosLeft={nbrOfTodosLeft}/>
      </MemoryRouter>)

      fireEvent.click(screen.getByRole('link', {
        name: /All/
      }));

      expect(screen.getByTestId('all').classList.contains('selected')).toBe(true);
    })


    test("should render only completed todos if url is 'active'", ()=>{
  
      const removeCompletedTodos = () => {};
  
      render(<MemoryRouter initialEntries={["/active"]}>
        <Footer
              removeCompletedTodos={removeCompletedTodos}
              nbrOfTodosCompleted={nbrOfTodosCompleted}
              nbrOfTodosLeft={nbrOfTodosLeft}/>
      </MemoryRouter>)

      fireEvent.click(screen.getByRole('link', {
        name: /Active/
      }));

      expect(screen.getByTestId('active').classList.contains('selected')).toBe(true);
    })


    test("should render only completed todos if url is 'completed'", ()=>{
  
      const removeCompletedTodos = () => {};
  
      render(<MemoryRouter initialEntries={["/completed"]}>
        <Footer
              removeCompletedTodos={removeCompletedTodos}
              nbrOfTodosCompleted={nbrOfTodosCompleted}
              nbrOfTodosLeft={nbrOfTodosLeft}/>
      </MemoryRouter>)


      fireEvent.click(screen.getByRole('link', {
        name: /Completed/
      }));

      expect(screen.getByTestId('completed').classList.contains('selected')).toBe(true);
    })


    test('should match snapshot', ()=>{
  
      const removeCompletedTodos = () => {};
  
      const {asFragment} = render(<Footer
              removeCompletedTodos={removeCompletedTodos}
              nbrOfTodosCompleted={nbrOfTodosCompleted}
              nbrOfTodosLeft={nbrOfTodosLeft}/>, {wrapper: BrowserRouter})
  
  
      expect(asFragment()).toMatchSnapshot();
    })
  })
  