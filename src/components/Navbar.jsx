import {NavLink} from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand navbar-dark bg-primary">
    <div className="container-fluid">
      <div className="navbar-brand">
        Note App
      </div>

      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Главная</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">Информация</NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
