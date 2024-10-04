import React from 'react';
import Footer from './Footer';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/imagenes/logo.png"  alt="Cheapeat Logo" />
      </div>
      <h1>Bienvenido a Cheapeat</h1><br></br>
      <p>Por favor, inicia sesión para continuar.</p>
      <br></br>
      <form className={styles.loginForm}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          className={styles.inputField}
        />
        <a href="#" className={styles.forgotPassword}>¿Olvidaste tu contraseña?</a>
        <button type="submit" className={styles.loginButton}>Ingresar</button>
      </form>
      <br></br>
      <p>o</p>
      <br></br>
      <button className={styles.createAccountButton}>Crear Cuenta Nueva</button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a href="/terminos" className={styles.link}>Términos de Servicio</a>
        {' • '}
    
        <a href="/privacidad" className={styles.link}>Política de Privacidad</a>
        {' • '}
        <a href="/ayuda" className={styles.link}>Centro de Ayuda</a>
      </div>
    </footer>
     
    </div>
  );
}

