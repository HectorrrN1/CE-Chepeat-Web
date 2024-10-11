import Navbar from '../Navbar';
import Footer from '../Footer';
import styles from '../page.module.css';
import '../globals.css';

const Page = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.mapSection}>
        <img src="/mapa2.png" alt="Mapa" />
      </div>
      <div className={styles.discountSection}>
        <div className={styles.discountBanner}>
          <h2>A 50% de descuento</h2>
          <p>(Todos los productos de panadería después de las 9 PM todos los días)</p>
        </div>
      </div>
      <div className={styles.productGrid}>
        <div className={styles.productCard}>
          <img src="/imagenes/pasta.jpg" alt="Pasta Italiana" />
          <h3>Pasta Italiana</h3>
          <p>$12.99</p>
          <button className={styles.button}>Ver más</button>

        </div>
        <div className={styles.productCard}>
          <img src="/imagenes/hamburguesa.jpg" alt="Hamburguesa Clásica" />
          <h3>Hamburguesa Clásica</h3>
          <p>$9.99</p>
          <button className={styles.button}>Ver más</button>

        </div>
        <div className={styles.productCard}>
          <img src="/imagenes/sushi.jpg" alt="Sushi Variado" />
          <h3>Sushi Variado</h3>
          <p>$14.99</p>
          <button className={styles.button}>Ver más</button>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
