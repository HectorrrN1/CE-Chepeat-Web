import React from 'react';
import Link from 'next/link';
import styles from '../perfil.module.css'; 

export default function Perfil() {
  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <img src="/imagenes/perfil1.png" alt="Usuario" className={styles.avatar} />
        <h2>@usuarioforaneo</h2>
      </div>
      <ul className={styles.profileMenu}>
        <li><Link href="/mi-informacion">Mi información</Link></li>
        <li><Link href="/politicas-privacidad">Políticas y privacidad</Link></li>
        <li><Link href="/editar-perfil">Editar perfil</Link></li>
        <li><Link href="/modo-vendedor">Modo vendedor</Link></li>
        <li><Link href="/cerrar-sesion">Cerrar sesión</Link></li>
      </ul>
    </div>
  );
}
