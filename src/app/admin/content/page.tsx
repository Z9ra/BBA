import styles from '../admin.module.css';
import AppearanceForm from './AppearanceForm';
import TextContentForm from './TextContentForm';
import DynamicContentForm from './DynamicContentForm';
import { getSettings } from '@/lib/settings';

export default async function EditContentPage() {
  const settings = await getSettings();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Edit Content & Appearance</h1>
        <p className={styles.subtitle}>Manage website appearance, text, images, and add new sections.</p>
      </header>

      {/* Website Appearance */}
      <AppearanceForm initialSettings={settings} />

      {/* Text Content */}
      <TextContentForm initialSettings={settings} />

      {/* Image Web Content (Mockup for now as it needs complex mapping) */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Image Web Content</h2>
        </div>
        <p className={styles.subtitle} style={{ marginBottom: '1.5rem' }}>
          Update the static images used in various sections of the website.
        </p>
        <form className={styles.form} style={{ border: 'none', padding: 0, background: 'transparent' }}>
          <div className={styles.formGroup}>
            <label htmlFor="heroImage">Hero Section Image / Illustration</label>
            <input type="file" id="heroImage" accept="image/*" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current: default-hero.jpg</span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="aboutImage">About Us Image</label>
            <input type="file" id="aboutImage" accept="image/*" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current: about-company.png</span>
          </div>

          <button type="button" className={`btn btn-primary ${styles.submitBtn}`}>
            Upload Images
          </button>
        </form>
      </div>

      {/* Add New Custom Content */}
      <DynamicContentForm />

    </div>
  );
}
