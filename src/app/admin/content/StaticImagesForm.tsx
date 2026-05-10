'use client';

import { useActionState } from 'react';
import { updateStaticImages } from './actions';
import styles from '../admin.module.css';
import { AppSettings } from '@/lib/settings';

export default function StaticImagesForm({ initialSettings }: { initialSettings: AppSettings }) {
  const [state, action, isPending] = useActionState(updateStaticImages, null);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Image Web Content</h2>
      </div>
      <p className={styles.subtitle} style={{ marginBottom: '1.5rem' }}>
        Update the static images used in various sections of the website.
      </p>

      {state?.error && <div className={styles.error} style={{ marginBottom: '1rem', color: 'var(--error)' }}>{state.error}</div>}
      {state?.success && <div className={styles.success} style={{ marginBottom: '1rem', color: 'var(--success)' }}>{state.success}</div>}

      <form action={action} className={styles.form} style={{ border: 'none', padding: 0, background: 'transparent' }}>
        <div className={styles.formGroup}>
          <label htmlFor="heroImage">Hero Section Image / Illustration</label>
          <input type="file" id="heroImage" name="heroImage" accept="image/*" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Current: {initialSettings.heroImageUrl.split('/').pop() || 'default-hero.jpg'}
          </span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="aboutImage">About Us Image</label>
          <input type="file" id="aboutImage" name="aboutImage" accept="image/*" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Current: {initialSettings.aboutImageUrl.split('/').pop() || 'about-company.png'}
          </span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="logoImage">Header Logo</label>
          <input type="file" id="logoImage" name="logoImage" accept="image/*" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Current: {initialSettings.logoUrl.split('/').pop() || 'logo.png'}
          </span>
        </div>

        <button type="submit" disabled={isPending} className={`btn btn-primary ${styles.submitBtn}`}>
          {isPending ? 'Uploading...' : 'Upload Images'}
        </button>
      </form>
    </div>
  );
}
