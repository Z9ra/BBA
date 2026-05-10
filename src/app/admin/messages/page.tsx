import styles from '../admin.module.css';
import prisma from '@/lib/prisma';

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const unreadCount = messages.filter((m: any) => !m.isRead).length;

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
        <div className={styles.listContainer} style={{ gap: '1rem' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={styles.card}
              style={{
                borderLeft: !msg.isRead
                  ? '3px solid var(--accent-primary)'
                  : '3px solid transparent',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                    {msg.name}
                  </strong>
                  {!msg.isRead && (
                    <span
                      style={{
                        marginLeft: '0.5rem',
                        padding: '0.1rem 0.5rem',
                        background: 'rgba(0, 112, 243, 0.2)',
                        color: 'var(--accent-primary)',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      Baru
                    </span>
                  )}
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {new Date(msg.createdAt).toLocaleString('id-ID')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="bi bi-envelope"></i> {msg.email}
                </span>
                {msg.phone && (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="bi bi-telephone"></i> {msg.phone}
                  </span>
                )}
              </div>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  background: 'rgba(0,0,0,0.2)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  margin: 0,
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                }}
              >
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
