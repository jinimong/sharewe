import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { supabase } from '../../api';
import TodoCreate from '../../components/organisms/TodoCreate';
import TodoList from '../../components/organisms/TodoList';
import withAuth from '../../helpers/withAuth';
import { StateType, useTodoContext } from '../../contexts/TodoContext';

const Todos: React.FC<StateType> = () => {
  const { dispatch } = useTodoContext();
  const user = supabase.auth.user();
  useEffect(async () => {
    if (user) {
      const { data: todos, error } = await supabase
        .from('todos')
        .select()
        .eq('user', user?.id);
      if (error) {
        alert(error.message);
      } else {
        dispatch({ type: 'INITIALIZE', todos });
      }
    }
  }, [dispatch, user]);

  return (
    <div className="w-full h-full text-center">
      <div className="py-16 text-xl">To Do App</div>
      <TodoList />
      <TodoCreate />
    </div>
  );
};

export default withAuth(Todos);
