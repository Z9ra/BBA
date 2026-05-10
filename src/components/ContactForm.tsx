'use client';

import { useActionState } from 'react';
import { submitContact } from '@/app/actions/contact';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, null);

  return (
    <form action={formAction} className={styles.form} id="contact-form">
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Nama Lengkap *</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email *</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            placeholder="nama@perusahaan.com"
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-phone">Nomor Telepon (Opsional)</label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          placeholder="+62 812 xxxx xxxx"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Pesan *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Ceritakan kebutuhan atau pertanyaan Anda..."
          required
        />
      </div>

      {state?.error && (
        <p className={styles.error}>{state.error}</p>
      )}
      {state?.success && (
        <p className={styles.success}>{state.success}</p>
      )}

      <button
        type="submit"
        className={`btn btn-primary ${styles.submit}`}
        disabled={isPending}
      >
        {isPending ? 'Mengirim...' : 'Kirim Pesan →'}
      </button>
    </form>
  );
}
