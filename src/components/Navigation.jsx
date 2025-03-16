import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-link" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/movies" className="nav-link" activeClassName="active">
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
