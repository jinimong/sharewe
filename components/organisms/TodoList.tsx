import React, { useCallback } from 'react';
import Link from 'next/link';
import { useTodoContext } from '../../contexts/TodoContext';
import { supabase } from '../../api';

const TodoList: React.FC = () => {
  const {
    state: { todos },
    dispatch,
  } = useTodoContext();

  const onDelete = useCallback(
    (id: number) => async () => {
      const { error } = await supabase.from('todos').delete().match({ id });
      if (!error) {
        dispatch({ type: 'DELETE', id });
      }
    },
    [dispatch]
  );

  const onToggle = useCallback(
    (id: number, done: boolean) => async () => {
      const { error } = await supabase
        .from('todos')
        .update({ done })
        .match({ id });
      if (!error) {
        dispatch({ type: 'TOGGLE', id });
      }
    },
    [dispatch]
  );

  return (
    <ul className="mt-4">
      {todos.map(({ id, text, done }) => (
        <li
          key={id}
          role="presentation"
          onClick={onToggle(id, !done)}
          className="w-1/2 mx-auto my-1 border border-gray-400 rounded relative cursor-pointer"
        >
          <span
            className={`${done ? 'line-through text-gray-400 font-thin' : ''}`}
          >
            {text}
          </span>
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-end">
            <button
              type="button"
              onClick={onDelete(id)}
              className="text-gray-400 hover:font-bold h-3/4 my-auto mx-1 rounded px-1 text-xs"
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
