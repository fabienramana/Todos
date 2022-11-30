import useTodosHook from '../../../hooks/todos/useTodosHook'

type TodoInputCreatorProps = {
    addTodo: (content:string) => void
}

export default function TodoInputCreator({addTodo}: TodoInputCreatorProps){
    /* const [todoContent, setTodoContent] = useState<string>(''); */

    const {todoContent, setTodoContent} = useTodosHook()
    


    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setTodoContent(e.target.value)
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === 'Enter' && todoContent.trim() !== ""){
            addTodo(todoContent.trim());
            setTodoContent("")
          }
    }


    return (
        <input className="new-todo"
         type="text"
         value={todoContent}
         placeholder="What needs to be done?"
         onChange={handleChange} 
         onKeyDown={handleKeyPress}/>
    )
}