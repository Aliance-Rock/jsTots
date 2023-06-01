import React, { useContext } from "react";
import classNames from "classnames";
import Context from "../../context";

export interface TodoItemProps {
  id: number,
  title: string,
  completed: boolean
}

const TodoItem = ({ id, title, completed }: TodoItemProps): JSX.Element => {
  const { removeTodo, toggleTodo } = useContext(Context);
  const cl = classNames({ completed: completed });
  return (
    <li className="todo-item">
      <div>
        <input
          className="checkbox"
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        <span className={cl}>{title}</span>
      </div>
      <button className="clear" onClick={() => removeTodo(id)}>
        &times;
      </button>
    </li>
  );
}

export default TodoItem;
