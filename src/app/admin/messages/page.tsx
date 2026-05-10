import styles from '../admin.module.css';
import prisma from '@/lib/prisma';
import MessagesList from './MessagesList';

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pesan Masuk</h1>
        <p className={styles.subtitle}>
          {unreadCount > 0
            ? `${unreadCount} pesan belum dibaca dari total ${messages.length} pesan.`
            : `Semua ${messages.length} pesan sudah dibaca.`}
        </p>
      </header>

      {messages.length === 0 ? (
        <div className={styles.card} style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Belum ada pesan masuk dari formulir kontak.
          </p>
        </div>
      ) : (
        <MessagesList initialMessages={messages} />
      )}
    </div>
  );
}
