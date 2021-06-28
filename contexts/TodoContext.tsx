import React, { createContext, useContext, useReducer } from 'react';
import TodoList from '../components/organisms/TodoList';

export type TodoType = {
  id: number;
  text: string;
  done: boolean;
};

type StateType = { todos: TodoType[] };

const initialState: StateType = {
  todos: [
    { id: 1, text: 'hello', done: true },
    { id: 2, text: 'world', done: false },
  ],
};

const TodoContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => {} });

export const useTodoContext = () => useContext(TodoContext);

type ActionType =
  | {
      type: 'CREATE';
      text: string;
    }
  | {
      type: 'DELETE';
      id: number;
    }
  | {
      type: 'TOGGLE';
      id: number;
    };

const reducer = (state: StateType, action: ActionType) => {
  const { todos } = state;

  switch (action.type) {
    case 'CREATE':
      const newId = (todos[todos.length - 1]?.id || 0) + 1;
      return {
        ...state,
        todos: todos.concat({ id: newId, text: action.text, done: false }),
      };

    case 'DELETE':
      return {
        ...state,
        todos: todos.filter(({ id }) => id !== action.id),
      };

    case 'TOGGLE':
      return {
        ...state,
        todos: todos.map((todo) =>
          todo.id !== action.id ? todo : { ...todo, done: !todo.done }
        ),
      };
  }
};

export const TodoContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
