import React from "react";
import { CardListContext } from "../contexts/CardListContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Footer from "./Footer";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const cardList = React.useContext(CardListContext);
    

    return (
        <main className="main">
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__image">
                <img className="profile__avatar" alt="аватар" src={currentUser.avatar}/>
                <div className="profile__avatar-overlay"></div>
                </div>
                <div className="profile__info">
                <div className="profile__container">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button onClick={props.onEditProfile} type="button" className="profile__edit-button" aria-label="edit"></button>
                </div>
                <p className="profile__bio">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add-button" aria-label="add"></button>
            </section>
            <section className="elements">
                {cardList.map((card) => {
                   
                    
                    return (
                        <Card card={card} key={card._id} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} />
                    )}
                )}
            </section>
            <Footer />
        </main>
    )
}

export default Main;