import Sidebar from '@/components/admin/Sidebar';
import styles from './layout.module.css';

export const metadata = {
  title: 'Admin Dashboard | PT. BBA',
  description: 'Admin panel for managing website content and settings.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
