import React, { useState } from "react";

interface AddTodoProps {
  onCreate: (value: string) => void
}

const AddTodo = ({ onCreate }: AddTodoProps): JSX.Element => {
  const useInputValue = (defaultValue: string) => {
    const [value, setValue] = useState(defaultValue);
    return {
      bind: {
        value: value,
        onChange: (e) => setValue(e.target.value),
      },
      clear: () => setValue(""),
      value: () => value,
    };
  }

  const input = useInputValue("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  };

  return (
    <form className="todo-form" onSubmit={submitHandler}>
      <input type="text" {...input.bind} />
      <button type="submit">Add todo</button>
    </form>
  );
}

export default AddTodo;
