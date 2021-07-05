import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { supabase } from '../../api';
import TodoCreate from '../../components/organisms/TodoCreate';
import TodoList from '../../components/organisms/TodoList';
import { withAuth } from '../../contexts/AuthContext';
import { StateType, useTodoContext } from '../../contexts/TodoContext';

const Todos: React.FC<StateType> = ({ todos }) => {
  const { dispatch } = useTodoContext();
  useEffect(() => {
    dispatch({ type: 'INITIALIZE', todos });
  }, [dispatch, todos]);

  return (
    <div className="w-full h-full text-center">
      <div className="py-16 text-xl">To Do App</div>
      <TodoList />
      <TodoCreate />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: todos, error } = await supabase.from('todos').select();
  return { props: { todos, error } };
};

export default withAuth(Todos);
