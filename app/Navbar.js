'use client';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1>Cheapeat </h1>
     
      <input type="text" placeholder="Buscar tiendas o productos" />
    </nav>
  );
};

export default Navbar;
