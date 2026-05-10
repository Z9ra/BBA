'use client';

import { useState } from 'react';
import styles from '../admin.module.css';

export default function DynamicContentForm() {
  const [sections, setSections] = useState([
    { id: 1, title: 'Our Vision', content: 'To be the leading tech provider in Indonesia.' }
  ]);
  
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newSection = {
      id: Date.now(),
      title: newTitle,
      content: newContent
    };

    setSections([...sections, newSection]);
    setNewTitle('');
    setNewContent('');
  };

  const handleDelete = (id: number) => {
    setSections(sections.filter(s => s.id !== id));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Custom Sections</h2>
      </div>
      <p className={styles.subtitle} style={{ marginBottom: '1.5rem' }}>
        Manage and add new custom content sections to your website.
      </p>

      {/* Existing Custom Sections */}
      <div className={styles.listContainer} style={{ marginBottom: '2rem' }}>
        {sections.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No custom sections added yet.</p>
        ) : (
          sections.map(section => (
            <div key={section.id} className={styles.listItem}>
              <div className={styles.itemInfo}>
                <strong>{section.title}</strong>
                <span>{section.content.substring(0, 50)}...</span>
              </div>
              <button 
                type="button" 
                onClick={() => handleDelete(section.id)}
                className={`${styles.actionBtn} ${styles.delete}`}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '2rem 0' }}></div>

      {/* Add New Section Form */}
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.1rem' }}>Add New Content Section</h3>
      <form onSubmit={handleAddSection} className={styles.form} style={{ border: 'none', padding: 0, background: 'transparent' }}>
        <div className={styles.formGroup}>
          <label htmlFor="newTitle">Section Title</label>
          <input 
            type="text" 
            id="newTitle" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Our Vision" 
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newContent">Section Content</label>
          <textarea 
            id="newContent" 
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Enter the text content for this new section..." 
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="newImage">Section Image (Optional)</label>
          <input 
            type="file" 
            id="newImage" 
            accept="image/*"
          />
        </div>

        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
          Add Section
        </button>
      </form>
    </div>
  );
}
