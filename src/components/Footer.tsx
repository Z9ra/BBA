import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandInfo}>
          <Link href="/" className={styles.logo}>
            BBA<span className={styles.accent}>.</span>
          </Link>
          <p className={styles.description}>
            Layanan pengembangan perangkat lunak dan aplikasi profesional, integrasi infrastruktur jaringan TI, dan pemeliharaan perangkat keras.
          </p>
        </div>
        
        <div className={styles.links}>
          <h4 className={styles.heading}>Navigasi</h4>
          <ul>
            <li><Link href="#about">Tentang Kami</Link></li>
            <li><Link href="#services">Layanan Utama</Link></li>
            <li><Link href="#segments">Segmen Pelanggan</Link></li>
          </ul>
        </div>
        
        {/* <div className={styles.contact}>
          <h4 className={styles.heading}>Hubungi Kami</h4>
          <address className={styles.address}>
            DUSUN DARONGDONG RT./RW. 01/08 DESA BUAHDUA,<br />
            KEC. BUAHDUA, KAB. SUMEDANG, JAWA BARAT 45392
          </address>
          <div className={styles.contactItems}>
            <p><strong>Telp:</strong> (0261) 2142579</p>
            <p><strong>WA:</strong> <a href="https://wa.me/6282127772205" target="_blank" rel="noopener noreferrer">0821-2777-2205</a></p>
            <p><strong>Email:</strong> <a href="mailto:pt.bersamaberdikariabadi@gmail.com">pt.bersamaberdikariabadi@gmail.com</a></p>
          </div>
        </div> */}
      </div>
      
      <div className={styles.copyright}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} PT. Bersama Berdikari Abadi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
