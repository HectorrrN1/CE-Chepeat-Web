'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="navbar">
        <button onClick={toggleMenu}>
   
        </button>
        
        <Link href="/">Regístrate </Link>
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li><Link href="/perfil">Perfil</Link></li>
            {/* Otros enlaces */}
          </ul>
        </div>
      )}
    </nav>
  );
}
