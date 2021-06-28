import React from 'react';
import Link from 'next/link';
import { useTodoContext } from '../../contexts/TodoContext';

const TodoList: React.FC = () => {
  const { todos } = useTodoContext();
  return (
    <ul className="mt-4">
      {todos.map(({ id, text }) => (
        <li
          key={id}
          className="w-1/2 mx-auto my-1 border border-gray-400 rounded"
        >
          <Link href={`/todos/${id}`}>{text}</Link>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
