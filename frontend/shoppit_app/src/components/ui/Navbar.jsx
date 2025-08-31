import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import styles from './NavBar.module.css';
import NavBarLink from './NavBarLink';
import logo from './images/logo.jpg'; // 🔁 Update this path if needed
import { motion } from "framer-motion";
import React from "react";



const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Shop", to: "/shop" },
];

const Navbar = ({numCartItems}) => {
  return (
    <nav className={`navbar navbar-expand-lg bg-white shadow-sm py-3 ${styles.navbar}`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* 🔷 Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo} alt="Weavum Logo" width="50" height="50" />
          <span className={`fw-bold text-primary ${styles.brandText}`} style={{ fontFamily: "Blaus93" }}>
            WEAVUM TECHNOLOGY
          </span>
        </Link>

        {/* 🔽 Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Nav Links + Cart */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav align-items-center gap-4">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                className="nav-item"
                whileHover={{
                  scale: 1.08,
                  y: -2,
                  color: "#2563EB",
                  textShadow: "0px 0px 6px rgba(37,99,235,0.6)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link className="nav-link fw-bold" to={item.to}>
                  {item.label}
                </Link>
              </motion.li>
            ))}

            {/* 🛒 Cart */}
            <li className="nav-item">
              <Link to="/cart"
                className={`btn btn-dark ms-2 rounded-pill position-relative ${styles.cartButton}`}
              >
                <FaCartShopping />
                {numCartItems ==0 || <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    fontSize: "0.85rem",
                    padding: "0.5em 0.65em",
                    backgroundColor: "#6050DC"
                  }}
                >
                  {numCartItems}
                </span> }
                
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;