import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type TodoType = {
  id: number;
  text: string;
};

const TodoContext = createContext<{
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}>({ todos: [], setTodos: () => {} });

export const useTodoContext = () => useContext(TodoContext);

export const TodoContextProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, text: 'hello' },
    { id: 2, text: 'world' },
  ]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
