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

  return (
    <ul className="mt-4">
      {todos.map(({ id, text }) => (
        <li
          key={id}
          className="w-1/2 mx-auto my-1 border border-gray-400 rounded relative"
        >
          <Link href={`/todos/${id}`}>
            <a className="hover:text-gray-400">{text}</a>
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
