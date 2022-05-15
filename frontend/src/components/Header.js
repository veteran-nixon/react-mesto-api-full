import logoHeader from '../images/header_logo.svg';

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logoHeader} alt="логотип Место" />
            {props.children}
        </header>
  )
}

export default Header;