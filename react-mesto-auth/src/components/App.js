import '../index.css';
import {useState, useEffect} from 'react';
import {Switch, Route, useHistory, Redirect} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import PopupWithState from './PopupWithState';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {PopupAddPlace} from './PopupAddPlace';
import {PopupEditAvatar} from './PopupEditAvatar';
import {PopupEditProfile} from './PopupEditProfile';
import {CurrentUserContext} from '../context/CurrentUserContext';
import {api} from '../utils/Api';
import * as MestoAuth from '../MestoAuth';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isStatePopupOpen, setIsStatePopupOpen] = useState(false);
  const [menuActivity, setMenuActivity] = useState(false);
  const [resStatus, setResStatus] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedForm, setLoggedForm] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if(!loggedIn) return;
    api
      .getUserInfo()
      .then((info) => {
        setCurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    setMenuActivity(false);
  }, [loggedIn]);

  useEffect(() => {
    getContent();
  }, []);

  function handleLikeCard(card) {
    const isLike = card.likes.some((item) => item._id === currentUser._id);
    
    api 
      .changeLikeStatus(card._id, !isLike)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCard(deletedCard) {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== deletedCard._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsStatePopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .changeProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard(card) {
    api
      .addCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    return MestoAuth
      .authorize(password, email)
      .then((data) => {
        if (!data.token) return;
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        history.push('/');
        if (history.location.pathname === '/') {
          setMenuActivity(false);
        }
      })
  }

  function handleRegister(password, email) {
    return MestoAuth
      .register(password, email)
      .then((res) => {
        if(res) {
          setResStatus(true);
          history.push('/sign-in');
          setIsStatePopupOpen(true);
        } else {
          setResStatus(false);
        }
      })
  }

  function handleLogOut() {
    setUserEmail('');
    setLoggedIn(false);
    setMenuActivity(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function getContent() {
    const jwt = localStorage.getItem('jwt');
    if(!jwt) return;
    return MestoAuth
      .validateToken(jwt)
      .then((res) => {
        if(res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push('/')
        }
      })
      .catch((err) => console.log(err));
  }

  function handleAuthorization() {
    if(loggedForm) {
      history.push('/sign-up');
    } else {
      history.push('/sign-in');
    }
  }

  function handleMenuToggle() {
    setMenuActivity((active) => !active);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          loggedIn={loggedIn}
          onLogout={handleLogOut}
          onAuthorization={handleAuthorization}
          onMenuToggle={handleMenuToggle}
          menuActivity={menuActivity}
          history={history}
        />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main 
              onEditProfile={() => setIsEditProfilePopupOpen(true)}
              onAddPlace={() => setIsAddPlacePopupOpen(true)}
              onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
              onCard={handleCardClick}
              cards={cards}
              onCardLike={handleLikeCard}
              onCardDelete={handleDeleteCard}
            />
          </ProtectedRoute>
          <Route exact path="/sign-up">
            <Register onRegister={handleRegister} setLoggedForm={setLoggedForm} />
          </Route>
          <Route exact path="/sign-in">
            <Login onLogin={handleLogin} loggedIn={loggedIn} setLoggedForm={setLoggedForm} />
          </Route>
          <Route path="*">{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
        </Switch>
        <Footer />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onChangeUser={handleUpdateUser}
        />
        <PopupAddPlace
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onChangeAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          popupName="remove-card"
          title="Вы уверены?"
          buttonText="Да"
        />
        <ImagePopup
          popupName="scale-image"
          selectedCard={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <PopupWithState onClose={closeAllPopups} isOpen={isStatePopupOpen} resStatus={resStatus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
