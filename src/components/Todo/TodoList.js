import React from 'react'
import './Todo.css'
import  TodoItem  from './TodoItem'

const TodoList = ({ todos }) => {
	return (
		<ul>
			{todos.map(item => {
				const { id, title, completed } = item
				return (
					<TodoItem key={item.id} id={id} title={title} completed={completed} />
				)
			})}
		</ul>
	)
}

export default TodoList
