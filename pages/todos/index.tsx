import TodoCreate from '../../components/organisms/TodoCreate';
import TodoList from '../../components/organisms/TodoList';

const Todos: React.FC = () => (
  <div className="w-full h-full text-center">
    <div className="py-8 text-lg">todos</div>
    <TodoList />
    <TodoCreate />
  </div>
);

export default Todos;
