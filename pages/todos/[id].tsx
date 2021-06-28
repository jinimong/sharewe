import { useRouter } from 'next/router';
import React from 'react';
import { useTodoContext } from '../../contexts/TodoContext';

const TodoDetail: React.FC = () => {
  const {
    query: { id },
  } = useRouter();
  const {
    state: { todos },
  } = useTodoContext();

  if (!id) {
    return <div>404</div>;
  }
  const todo = todos.find((todo) => +id === todo.id);
  if (!todo) {
    return <div>404</div>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center text-center">
      <div className="text-xl">
        {todo.id}: {todo.text}
      </div>
    </div>
  );
};

export default TodoDetail;
