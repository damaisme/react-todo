const root = ReactDOM.createRoot(document.getElementById("root"))


function App(){
    const [todos, setTodos] = React.useState([])
    const [todo, setTodo] = React.useState('')
    const inputRef = React.useRef(null)

    React.useEffect(() => {
        const getLocal = JSON.parse(localStorage.getItem('todos'));
        if (getLocal) {
         setTodos(getLocal);
        }
      }, []);

    React.useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    function addTodo(event){
        event.preventDefault()
        const todosNew = todos.slice()
        todosNew.unshift(todo)
        setTodos(todosNew)
        inputRef.current.value = ''
    }

    return (
        <div className="pt-8 px-24 lg   :px-80 w-100%">
            <h1 className="text-xl font-bold text-center">React Todo List</h1>

            <form onSubmit={addTodo}>
                <div className="flex mt-4 justify-between">
                    <input ref={inputRef} type="text" className="block border border-gray-300 bg-gray-50 rounded-lg w-4/6 p-3 text-sm h-10 mr-4" name="task" onChange={function(event){
                        setTodo(event.target.value)
                    }}/>
                    <button className="block bg-blue-500 rounded-md p-2 text-white h-10 w-1/6" type="submit">Add</button>
                </div>                
            </form>

            <ul className="mt-8">
                {todos.map(function(item, index){
                    return (
                        <div key={index} className="flex justify-between mb-6">
                            <p className="text-lg w-10/12">{item}</p>
                            <button onClick={function(){
                                const todosNew = todos.slice()
                                todosNew.splice(index,1)
                                setTodos(todosNew)
                            }} className="bg-red-500 rounded px-2 py-1 mx-auto">X</button>
                        </div>
                    )
                })}
            </ul>

        </div>
    )
}

root.render(<App />)