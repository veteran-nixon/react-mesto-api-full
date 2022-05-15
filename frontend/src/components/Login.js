import React from "react";
import DefaultForm from "./DefaultForm";

function Login({handleLogin}) {
    const [data, setData] = React.useState({
      email: '',
      password: ''
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
        handleLogin(password, email)
    }

    return (
        <DefaultForm onSubmit={handleSubmit} title='Вход' name='login' buttonText='Войти'>
             <label className="default-form__field">
                <input className="default-form__input default-form__input_type_login-email" id="email-input" value={email} onChange={handleChange} type="email" name="email" placeholder="Email" autoComplete="off" required />
                <span className="default-form__input-error email-input-error"></span>
            </label>
            <label className="default-form__field">
                <input className="default-form__input default-form__input_type_login-password" id="password-input" value={password} onChange={handleChange} type="password" name="password" placeholder="Пароль" autoComplete="off" required />
                <span className="default-form__input-error password-input-error"></span>
            </label>
        </DefaultForm>
    )
}

export default Login;
