'use client';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Campo de búsqueda centralizado */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar tiendas o productos"
          className={styles.searchInput}
        />
      </div>
    </nav>
  );
};

export default Navbar;
