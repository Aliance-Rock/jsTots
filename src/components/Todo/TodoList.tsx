import React from "react"
import TodoItem, { TodoItemProps } from "./TodoItem"
import "./Todo.css"

interface TodoListProps {
  todos: TodoItemProps[]
}

const TodoList = ({ todos }: TodoListProps): JSX.Element => {
  return (
    <ul>
      {
        todos.map((item) => {
          const {id, title, completed} = item;
          return <TodoItem key={item.id} id={id} title={title} completed={completed} />
        })
      }
    </ul>
  )
}

export default TodoList
