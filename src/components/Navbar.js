import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Crypto Trade</h2>
      </div>
      <Link to="/">Home</Link>
      <Link to="/exchanges">Exchages</Link>
    </nav>
  );
};

export default Navbar;
