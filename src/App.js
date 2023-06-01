import React, { Suspense, lazy, useEffect, useState } from 'react'
import Loader from './components/Loader/Loader'
import TodoList from './components/Todo/TodoList'
import Context from './context'

const AddTodo = lazy(() => import('./components/Todo/AddTodo'))

function App() {
	const [todos, setTodos] = useState([])
	const [loading, setloading] = useState()
	const url = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(todos =>
				setTimeout(() => {
					setTodos(todos)
					setloading(false)
				}, 2000)
			)
	})

	const toggleTodo = id => {
		setTodos(
			todos.map(todo => {
				if (todo.id === id) {
					todo.completed = !todo.completed
					console.log(todo.id)
				}
				return todo
			})
		)
	}

	const removeTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	const addTodo = value => {
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
			<div className='wrapper'>
				<h1>Todo List</h1>

				<Suspense fallback={'loading...'}>
					<AddTodo onCreate={addTodo} />
				</Suspense>

				{loading ? (
					<Loader />
				) : todos.length === 0 ? (
					<p className='empty'>-- No todo --</p>
				) : (
					<TodoList todos={todos} />
				)}
			</div>
		</Context.Provider>
	)
}

export default App
