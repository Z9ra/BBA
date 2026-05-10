'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/login/actions';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard',         icon: 'bi-speedometer2',       path: '/admin' },
    { name: 'Edit Content',      icon: 'bi-pencil-square',      path: '/admin/content' },
    { name: 'Penilaian Pengguna',icon: 'bi-star-half',          path: '/admin/reviews' },
    { name: 'Projects',          icon: 'bi-folder2-open',       path: '/admin/projects' },
    { name: 'Pesan Masuk',       icon: 'bi-envelope-open',      path: '/admin/messages' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        BBA<span className={styles.accent}>.</span> Admin
      </div>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
          >
            <i className={`bi ${item.icon} ${styles.navIcon}`}></i>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <form action={logout}>
          <button type="submit" className={styles.logoutBtn}>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
