import React, { useState } from 'react';
import styles from './Sidebar.module.css'; // Importa los estilos
import { UserOutlined, EditOutlined, LogoutOutlined, ShopOutlined, InfoCircleOutlined } from '@ant-design/icons';

const Sidebar = ({ username }) => {
  const [isOpen, setIsOpen] = useState(true); // Estado para controlar si el sidebar está abierto

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Cambia el estado para abrir/cerrar el sidebar
  };

  return (
    <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      <div className={styles.header}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          {isOpen ? 'Cerrar' : 'Abrir'}
        </button>
      </div>
      <div className={styles.profileSection}>
        <div className={styles.profilePic}>
          {/* Imagen de perfil */}
          <img src="/imagenes/perfil1.png" alt="Profile" />
        </div>
        <h3 className={styles.username}>{username}</h3>
      </div>
      <ul className={styles.menuItems}>
        <li className={styles.menuItem}>
          <InfoCircleOutlined className={styles.icon} />
          {isOpen && <span>Mi Información</span>}
        </li>
        <li className={styles.menuItem}>
          <EditOutlined className={styles.icon} />
          {isOpen && <span>Editar Perfil</span>}
        </li>
        <li className={styles.menuItem}>
          <ShopOutlined className={styles.icon} />
          {isOpen && <span>Modo Vendedor</span>}
        </li>
        <li className={styles.menuItem}>
          <LogoutOutlined className={styles.icon} />
          {isOpen && <span>Cerrar Sesión</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
