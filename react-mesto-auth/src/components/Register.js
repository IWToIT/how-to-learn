import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Register = ({ onRegister, setLoggedForm }) => {
  const [userData, setUserData] = useState({
    password: '',
    email: '',
  });

  useEffect(() => {
    setLoggedForm(false)
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { password, email } = userData;

    onRegister(password, email).catch((err) => {
      console.log(err);

      setUserData((old) => ({
        ...old,
        message: 'Что-то пошло не так!',
      }));
    });
  }

  return (
    <div className="popup popup_for_authorize" onSubmit={handleSubmit}>
      <p className="popup__title popup__title_for_authorize">Регистрация</p>
      <input
        className="popup__input popup__input_for_authorize"
        required
        id="email"
        placeholder="Email"
        name="email"
        type="email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        className="popup__input popup__input_for_authorize"
        required
        id="password"
        placeholder="Пароль"
        name="password"
        type="password"
        value={userData.password}
        onChange={handleChange}
      />
      <button className="popup__btn-save popup__btn-save_for_authorize" type="submit" onSubmit={handleSubmit}>
        Зарегистрироваться
      </button>
      <p className="popup__sign-in">
        Уже зарегистрированы?&nbsp;
        <Link className="popup__login-link" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;