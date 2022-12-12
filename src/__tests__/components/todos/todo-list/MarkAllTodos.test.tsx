import { render, screen, fireEvent } from "@testing-library/react"
import MarkAllTodos from "../../../../components/todos/todo-list/MarkAllTodos"

describe("TodosPage should", ()=> {
    test("call changeStatusOfAllTodos with true if label is clicked", () => {
        const changeStatusOfAllTodos = jest.fn()

        render(<MarkAllTodos changeStatusOfAllTodos={changeStatusOfAllTodos} />)

        const markAllLabel = screen.getByLabelText('mark-all')
  
        fireEvent.click(markAllLabel);

        expect(changeStatusOfAllTodos).toBeCalledTimes(1)
        expect(changeStatusOfAllTodos).toHaveBeenCalledWith(true)
        
    })

    test("call changeStatusOfAllTodos with false if label is clicked for the second time", () => {
        const changeStatusOfAllTodos = jest.fn()

        render(<MarkAllTodos changeStatusOfAllTodos={changeStatusOfAllTodos} />)

        const markAllLabel = screen.getByLabelText('mark-all')
  
        fireEvent.click(markAllLabel);
        fireEvent.click(markAllLabel);

        expect(changeStatusOfAllTodos).toBeCalledTimes(2)
        expect(changeStatusOfAllTodos).toHaveBeenCalledWith(true)
        
    })
    
    test('match snapshot', () => {
  
        const changeStatusOfAllTodos = () => {}
    
        const {asFragment} = render(<MarkAllTodos changeStatusOfAllTodos={changeStatusOfAllTodos} />)
    
        expect(asFragment()).toMatchSnapshot();
      })
})