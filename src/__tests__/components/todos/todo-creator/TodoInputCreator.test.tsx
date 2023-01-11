import { render, screen } from '@testing-library/react';
import TodoInputCreator from '../../../../components/todos/todo-creator/TodoInputCreator';
import userEvent from '@testing-library/user-event';


describe('TodoInputCreator component', () => {
  test("should call 'addTodo' with title entered in input if enter key is pressed", () => {

    const addTodo = jest.fn();
    const title = "Coucou"

    render(<TodoInputCreator addTodo={addTodo} />)

    const input = screen.getByPlaceholderText("What needs to be done?")

    userEvent.type(input, `${title}{Enter}`);

    expect(addTodo).toHaveBeenCalledTimes(1);
    expect(addTodo).toHaveBeenCalledWith(title);
  })

  test("shouldn't call 'addTodo' if input is empty", () => {

    const addTodo = jest.fn();

    render(<TodoInputCreator addTodo={addTodo} />)

    const input = screen.getByPlaceholderText("What needs to be done?")

    userEvent.type(input, `{Enter}`);

    expect(addTodo).toHaveBeenCalledTimes(0);
  })

  test("shouldn't call 'addTodo' if input is only whitespaces", () => {

    const addTodo = jest.fn();

    render(<TodoInputCreator addTodo={addTodo} />)

    const input = screen.getByPlaceholderText("What needs to be done?")

    userEvent.type(input, `    {Enter}`);

    expect(addTodo).toHaveBeenCalledTimes(0);
  })

  test('should match snapshot', ()=>{
  
    const addTodo = () => {};

    const {asFragment} = render(<TodoInputCreator addTodo={addTodo} />)

    expect(asFragment()).toMatchSnapshot();
  })
}) 