'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar({ logoUrl = '/logo.png' }: { logoUrl?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image src={logoUrl} alt="PT. BBA Logo" className={styles.logoImage} width={120} height={40} priority />
        </Link>
        
        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.open : ''}`}>
          <Link href="#about" onClick={() => setMobileMenuOpen(false)}>Tentang Kami</Link>
          <Link href="#services" onClick={() => setMobileMenuOpen(false)}>Layanan</Link>
          <Link href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portofolio</Link>
          <Link href="#segments" onClick={() => setMobileMenuOpen(false)}>Segmen</Link>
          <Link href="https://api.whatsapp.com/send/?phone=6282127772205" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
            Hubungi Kami
          </Link>
        </div>

        <button 
          className={styles.mobileToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen1 : ''}`}></span>
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen2 : ''}`}></span>
          <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen3 : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}
