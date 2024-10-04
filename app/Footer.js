import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';

export default function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="/terminos" className={styles.link}>
            Términos de Servicio
          </Link>
          <span> • </span>
          <Link href="/privacidad" className={styles.link}>
            Política de Privacidad
          </Link>
          <span> • </span>
          <Link href="/ayuda" className={styles.link}>
            Centro de Ayuda
          </Link>
        </div>
      </footer>
    );
  }