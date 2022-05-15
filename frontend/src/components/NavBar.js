import React from "react";
import { Route, Link, Switch } from "react-router-dom";

function NavBar(props) {

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <div className="header__nav-container">
                    <div className="header__email">{props.userEmail}</div>
                    <div onClick={props.signOut} className="header__swicher">Выход</div>
                    </div>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__swicher">Регистрация</Link>
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__swicher">Войти</Link>
                </Route>
            </Switch>
        </>
    )
}

export default NavBar;
