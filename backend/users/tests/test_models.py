def test_user(user_factory):
    password = "1234"
    user = user_factory(password=password)
    assert user.is_active
    assert user.check_password(password)
