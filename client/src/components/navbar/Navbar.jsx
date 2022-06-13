import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <span className="logo"><Link to="/" className="link">Portfolio Management</Link></span>
        <button className="dashboardbtn"><Link to="/dashboard" className="link">Dashboards</Link></button>
      </div>
    </div>
  );
};

export default Navbar;
