import React, { useCallback } from 'react';
import Link from 'next/link';
import { useTodoContext } from '../../contexts/TodoContext';

const TodoList: React.FC = () => {
  const {
    state: { todos },
    dispatch,
  } = useTodoContext();

  const onDelete = useCallback(
    (id: number) => () => dispatch({ type: 'DELETE', id }),
    []
  );

  const onToggle = useCallback(
    (id: number) => () => dispatch({ type: 'TOGGLE', id }),
    []
  );

  return (
    <ul className="mt-4">
      {todos.map(({ id, text, done }) => (
        <li
          key={id}
          onClick={onToggle(id)}
          className="w-1/2 mx-auto my-1 border border-gray-400 rounded relative cursor-pointer"
        >
          <span
            className={`${done ? 'line-through text-gray-400 font-thin' : ''}`}
          >
            {text}
          </span>
          <Link href={`/todos/${id}`}>
            <a className="absolute text-gray-200 hover:text-white hover:bg-gray-200 h-full top-0 bottom-0 right-5 my-auto rounded px-1">
              ➡️
            </a>
          </Link>
          <button
            type="button"
            onClick={onDelete(id)}
            className="absolute text-gray-200 hover:text-white hover:bg-gray-200 h-3/4 top-0 bottom-0 right-1 my-auto rounded px-1 text-xs"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
