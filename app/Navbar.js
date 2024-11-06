

'use client';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Ícono de menú hamburguesa */}
      <div className={styles.menuIcon}>
        <span>&#9776;</span>
      </div>

      {/* Campo de búsqueda */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar tiendas o productos"
          className={styles.searchInput}
        />
      </div>

      {/* Ícono de cuadrícula */}
      <div className={styles.gridIcon}>
        <span>&#x1F5C3;</span>
      </div>
    </nav>
  );
};

export default Navbar;
