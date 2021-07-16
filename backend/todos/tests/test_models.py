def test_todo(todo_factory):
    todo = todo_factory(done=False)
    assert str(todo) == f"[ ]: {todo.text}"
