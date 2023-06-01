import { createContext } from "react";

interface ContextProps {
  removeTodo: (id: number) => void
  toggleTodo: (id: number) => void
}

const Context = createContext({} as ContextProps);

export default Context;