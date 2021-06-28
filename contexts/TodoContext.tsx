import React, { createContext, useContext, useReducer } from 'react';

export type TodoType = {
  id: number;
  text: string;
};

type StateType = { todos: TodoType[] };

const initialState: StateType = {
  todos: [
    { id: 1, text: 'hello' },
    { id: 2, text: 'world' },
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
    };

const reducer = (state: StateType, action: ActionType) => {
  const { todos } = state;

  switch (action.type) {
    case 'CREATE':
      const newId = (todos[todos.length - 1]?.id || 0) + 1;
      return {
        ...state,
        todos: todos.concat({ id: newId, text: action.text }),
      };

    case 'DELETE':
      return {
        ...state,
        todos: todos.filter(({ id }) => id !== action.id),
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
