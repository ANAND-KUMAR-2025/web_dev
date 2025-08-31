import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBarLink = () => {
  const links = ['Home', 'About', 'Contact', 'Shop'];

  return (
    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
      {links.map(link => (
        <li key={link} className={`nav-item ${styles.navItem}`}>
          <NavLink
            to={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
            className={({ isActive }) =>
              `${styles.animatedLink} nav-link ${isActive ? styles.active : ''}`
            }
          >
            
            {link}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavBarLink;
