import React from "react";

function DefaultForm(props) {
    return (
        <div className="default-form">
            <h2 className="default-form__heading">{props.title}</h2>
            <form onSubmit={props.onSubmit} className="default-form__form" name={`${props.name}-form`}>
                {props.children}
                <button type="submit" className="default-form__submit-button" aria-label="submit" id={`${props.name}__submit-button`}>{props.buttonText}</button>
            </form>
        </div>
    )
    
}

export default DefaultForm;