import { useEffect, useState } from 'react';
import { supabase } from '../api';
import TodoCreate from '../components/organisms/TodoCreate';
import TodoList from '../components/organisms/TodoList';
import withAuth from '../helpers/withAuth';
import { StateType, useTodoContext } from '../contexts/TodoContext';
import { useAuthContext } from '../contexts/AuthContext';

const Todos: React.FC<StateType> = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    if (user) {
      const fetchTodos = async () => {
        const { data: todos, error } = await supabase
          .from('todos')
          .select()
          .eq('user', user?.id)
          .order('id');
        if (error) {
          alert(error.message);
        } else {
          dispatch({ type: 'INITIALIZE', todos });
          setLoading(false);
        }
      };
      fetchTodos();
    }
  }, [dispatch, user]);

  return (
    <div className="w-full h-full text-center">
      <div className="py-16 text-xl">To Do App</div>
      {loading ? <>loading...</> : <TodoList />}
      <TodoCreate />
    </div>
  );
};

export default withAuth(Todos);
