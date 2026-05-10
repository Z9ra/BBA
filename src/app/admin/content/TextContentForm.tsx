'use client';

import { useActionState } from 'react';
import { updateTextContent } from './actions';
import styles from '../admin.module.css';

interface TextContentFormProps {
  initialSettings: {
    heroTitle: string;
    heroSubtitle: string;
    aboutText: string;
  };
}

export default function TextContentForm({ initialSettings }: TextContentFormProps) {
  const [state, formAction, isPending] = useActionState(updateTextContent, null);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Website Text Content</h2>
      </div>
      <form action={formAction} className={styles.form} style={{ border: 'none', padding: 0, background: 'transparent' }}>
        <div className={styles.formGroup}>
          <label htmlFor="heroTitle">Hero Title</label>
          <input 
            type="text" 
            id="heroTitle" 
            name="heroTitle"
            defaultValue={initialSettings.heroTitle} 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="heroSubtitle">Hero Subtitle</label>
          <textarea 
            id="heroSubtitle" 
            name="heroSubtitle"
            rows={3}
            defaultValue={initialSettings.heroSubtitle} 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="aboutText">About Us Text</label>
          <textarea 
            id="aboutText" 
            name="aboutText"
            rows={5}
            defaultValue={initialSettings.aboutText} 
          />
        </div>

        {state?.error && <p style={{ color: '#ff453a' }}>{state.error}</p>}
        {state?.success && <p style={{ color: '#32d74b' }}>{state.success}</p>}

        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Text Changes'}
        </button>
      </form>
    </div>
  );
}
