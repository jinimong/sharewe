import React, { useCallback, useState } from 'react';
import { supabase } from '../../api';
import { useTodoContext } from '../../contexts/TodoContext';

const TodoCreate: React.FC = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTodoContext();

  const onCreate = useCallback(async (text: string) => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ text }])
      .single();
    const { id } = data;
    if (!error) {
      dispatch({ type: 'CREATE', id, text });
    }
  }, []);

  const onChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onCreate(text);
      setText('');
      e.preventDefault();
    },
    [onCreate, text]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="relative mx-auto w-1/2 h-7 border border-gray-200 text-center rounded"
    >
      <input
        value={text}
        onChange={onChange}
        className="w-full h-full text-center font-light text-sm"
        placeholder="Write todo ..."
        required
      />
      <button
        type="submit"
        className="absolute text-white bg-gray-400 h-3/4 top-0 bottom-0 right-1 my-auto rounded px-1 text-xs"
      >
        SAVE
      </button>
    </form>
  );
};

export default TodoCreate;
