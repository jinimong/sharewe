import { useEffect } from 'react';
import { supabase } from '../../api';
import TodoCreate from '../../components/organisms/TodoCreate';
import TodoList from '../../components/organisms/TodoList';
import { StateType, useTodoContext } from '../../contexts/TodoContext';

const Todos: React.FC<StateType> = ({ todos }) => {
  const { dispatch } = useTodoContext();
  useEffect(() => {
    dispatch({ type: 'INITIALIZE', todos });
  }, [dispatch, todos]);

  return (
    <div className="w-full h-full text-center">
      <div className="py-8 text-lg">todos</div>
      <TodoList />
      <TodoCreate />
    </div>
  );
};

export async function getServerSideProps() {
  const { data: todos, error } = await supabase.from('todos').select();
  return { props: { todos } };
}

export default Todos;
