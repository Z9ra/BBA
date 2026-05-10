'use client';

import { useState, useTransition } from 'react';
import { markAsRead, deleteMessage } from './actions';
import styles from '../admin.module.css';
import { useRouter } from 'next/navigation';

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export default function MessagesList({ initialMessages }: { initialMessages: Message[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const handleMarkAsRead = async (id: number) => {
    startTransition(async () => {
      const res = await markAsRead(id);
      if (res.error) alert(res.error);
      router.refresh();
    });
  };

  const handleDeleteClick = (id: number) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    
    startTransition(async () => {
      try {
        const res = await deleteMessage(confirmDeleteId);
        if (res.error) {
          alert(res.error);
        } else {
          router.refresh();
        }
      } catch (err) {
        console.error('Delete error:', err);
      } finally {
        setConfirmDeleteId(null);
      }
    });
  };

  return (
    <div className={styles.listContainer} style={{ gap: '1rem' }}>
      {initialMessages.map((msg) => (
        <div
          key={msg.id}
          className={styles.card}
          style={{
            borderLeft: !msg.isRead
              ? '3px solid var(--accent-primary)'
              : '3px solid transparent',
            padding: '1.5rem',
            position: 'relative'
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
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginRight: '1rem' }}>
                {new Date(msg.createdAt).toLocaleString('id-ID')}
              </span>
              
              {!msg.isRead && (
                <button 
                  onClick={() => handleMarkAsRead(msg.id)}
                  className={styles.actionBtn}
                  title="Tandai sudah dibaca"
                  disabled={isPending}
                >
                  <i className="bi bi-check2-all"></i>
                </button>
              )}

              <button 
                onClick={() => handleDeleteClick(msg.id)}
                className={`${styles.actionBtn} ${styles.delete}`}
                title="Hapus pesan"
                disabled={isPending}
              >
                {confirmDeleteId === msg.id ? 'Confirm?' : <i className="bi bi-trash"></i>}
              </button>

              {confirmDeleteId === msg.id && (
                <button 
                  onClick={executeDelete}
                  className="btn btn-primary"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                >
                  Yes
                </button>
              )}
            </div>
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
  );
}
