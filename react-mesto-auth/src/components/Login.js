import { useEffect, useState } from 'react';
import '../index.css';

const Login = ({onLogin, setLoggedForm}) => {
  const cleanUserData = {
    password: '',
    email: '',
  };

  useEffect(() => {
    setLoggedForm(true);
  }, []);

  const [userData, setUserData] = useState(cleanUserData);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData(old => ({
      ...old,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {password, email} = userData;
    if(!email || !password) return;
    onLogin(password, email)
      .catch(err => {
        console.log(err);
        setUserData(old => ({
          ...old,
          message: 'Что-то пошло не так!',
      }));
    })
  }

  return (
    <div className="popup popup_for_authorization" onSubmit={handleSubmit}>
      <p className="popup__title popup__title_for_authorization">Вход</p>
      <input
        className="popup__input popup__input_for_authorization"
        required
        id="email"
        placeholder="Email"
        name="email"
        type="email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        className="popup__input popup__input_for_authorization"
        required
        id="password"
        placeholder="Пароль"
        name="password"
        type="password"
        value={userData.password}
        onChange={handleChange}
      />
      <button className="popup__btn-save popup__btn-save_for_authorization" type="submit" onSubmit={handleSubmit}>
        Войти
      </button>
    </div>
  );
}

export default Login;