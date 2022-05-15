import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardListContext } from "../contexts/CardListContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import * as mestoAuth from '../utils/mestoAuth.js'
import InfoTooltip from "./InfoTooltip";
import NavBar from "./NavBar";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardList, setCardList] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSucces, setIsSucces] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if(loggedIn) {
      api.getAllData()
      .then(([user, cards]) => {
        setCardList(cards)
        setCurrentUser(user)
      })
      .catch((err) => console.log(err))
    }
  }, [loggedIn])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(item) {
    setSelectedCard(item)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === card.owner);
    console.log(currentUser._id)
    console.log(card._id)

    if(isLiked) {
        api.deleteLike(card._id)
        .then((newCard) => {
          setCardList((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
    } else {
        api.putLike(card._id)
        .then((newCard) => {
          setCardList((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
      api.deleteCard(card._id)
        .then(() => {
          setCardList((state) => state.filter((c) => c !== card._id))
        })
        .catch((err) => console.log(err));
  }

  function handleUpdateUser(currentUser) {
      api.editProfile(currentUser)
        .then((data) => {
          setCurrentUser(data)
        })
        .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(currentUser) {
    api.editAvatar(currentUser)
      .then((data) => {
        setCurrentUser(data)
       })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.createNewCard(card)
      .then((newCard) => {
        setCardList([newCard, ...cardList])
       })
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
    tokenCheck()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, loggedIn])

  function handleRegister(password, email) {
    return mestoAuth.register(password, email).then(() => {
      setIsSucces(true);
      setIsInfoTooltipPopupOpen(true);
      history.push('/sign-in')})
      .catch(() => {
        setIsInfoTooltipPopupOpen(true)
      });
  }

  function handleLogin(password, email) {
    return mestoAuth.authorize(password, email).then((data) => {
        localStorage.setItem('token', data.token)
        setLoggedIn(true)
        history.push('/')
    })
    .catch((err) => {
      setIsInfoTooltipPopupOpen(true);
      console.log(err)
    });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token){
      mestoAuth.getContent(token).then((res) => {
        if (res){
          setEmail(res.email)
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch((err) => console.log(err));
    }
  }

  function signOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false)
    setEmail('')
  }

  return (
  <div className="page">
      <Header>
        <NavBar userEmail={email} signOut={signOut}/>
      </Header>
    <CurrentUserContext.Provider value={currentUser}>
      <CardListContext.Provider value={cardList}>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register handleRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
        </Switch>
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      <AddPlacePopup onLoadNewCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
      <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSucces={isSucces} />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </CardListContext.Provider>
    </CurrentUserContext.Provider>
  </div>
);
}

export default App;
