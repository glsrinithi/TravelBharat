import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">🌏 TravelBharat</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/states">States</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/admin">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;