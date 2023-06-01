import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react"
import TodoList from "./components/Todo/TodoList"
import Loader from './components/Loader/Loader'
import Context from "./context";
import { TodoItemProps } from "components/Todo/TodoItem"

const AddTodo = lazy(() => import("./components/Todo/AddTodo"))

function App() {
  const [todos, setTodos] = useState<TodoItemProps[]>([])
  const [loading, setloading] = useState<boolean>(true)
  const url = "https://jsonplaceholder.typicode.com/todos?_limit=10"

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((todos) =>
        setTimeout(() => {
          setTodos(todos)
          setloading(false)
        }, 2000)
      )
  }, [])

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
          console.log(todo.id)
        }
        return todo
      })
    )
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addTodo = (value: string) => {
    setTodos(
      todos.concat([
        {
          id: Date.now(),
          title: value,
          completed: false,
        },
      ])
    )
  }

  return (
    <Context.Provider
      value={{
        removeTodo: removeTodo,
        toggleTodo: toggleTodo,
      }}
    >
      <div className="wrapper">
        <h1>Todo List</h1>

        <Suspense fallback={"loading..."}>
          <AddTodo onCreate={addTodo} />
        </Suspense>

        {loading ? (
          <Loader />
        ) : todos.length === 0 ? (
          <p className="empty">-- No todo --</p>
        ) : (
          <TodoList todos={todos} />
        )}
      </div>
    </Context.Provider>
  )
}

export default App
