import React from "react";
import { Link } from "react-router-dom";
import DefaultForm from "./DefaultForm";


function Register({ handleRegister}) {
    // const [data, setData] = React.useState({})
    const [data, setData] = React.useState({
        password: '12345678Q1',
        email: 'qwertytest11@ya.ru'
    })

    const { password, email } = data;
    

    function handleChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(password, email)
    }

    return (
        <>
            <DefaultForm onSubmit={handleSubmit} title='Регистрация' name='register' buttonText='Зарегистрироваться'>
                <label className="default-form__field">
                    <input className="default-form__input default-form__input_type_register-email" id="email-input" value={email} onChange={handleChange} type="email" name="email" placeholder="Email" autoComplete="off" />
                    <span className="default-form__input-error email-input-error"></span>
                </label>
                <label className="default-form__field">
                    <input className="default-form__input default-form__input_type_register-password" id="password-input" value={password} onChange={handleChange} type="password" name="password" placeholder="Пароль" autoComplete="off" />
                    <span className="default-form__input-error password-input-error"></span>
                </label>
            </DefaultForm>
            {/* <p className="defaul-form__registered">Уже зарегистрированы? Войти</p> */}
            <Link to="/sign-in" className="defaul-form__registered">Уже зарегистрированы? Войти</Link>
        </>
    )
}

export default Register;