'use client';

import { useActionState, useState, useTransition, useEffect } from 'react';
import { addCustomSection, deleteCustomSection, updateCustomSection } from './actions';
import styles from '../admin.module.css';
import { useRouter } from 'next/navigation';

interface Section {
  id: number;
  title: string;
  content: string;
  imageUrl?: string | null;
}

export default function DynamicContentForm({ initialSections }: { initialSections: Section[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // DEBUG: Check if component re-renders
  console.log('DynamicContentForm Rendered with:', initialSections.length, 'sections');

  const handleDelete = (id: number) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    
    startTransition(async () => {
      try {
        console.log('Deleting section:', confirmDeleteId);
        const res = await deleteCustomSection(confirmDeleteId);
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

  const handleOpenAdd = () => {
    setEditingSection(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (section: Section) => {
    setEditingSection(section);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      let res;
      if (editingSection) {
        res = await updateCustomSection(editingSection.id, formData);
      } else {
        res = await addCustomSection(null, formData);
      }
      
      if (res?.error) {
        alert(res.error);
      } else {
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save section');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Custom Sections</h2>
        <button className="btn btn-primary" onClick={handleOpenAdd}>Add New Section</button>
      </div>
      <p className={styles.subtitle} style={{ marginBottom: '1.5rem' }}>
        Manage and add new custom content sections to your website.
      </p>

      {/* Existing Custom Sections */}
      <div className={styles.listContainer}>
        {initialSections.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No custom sections added yet.</p>
        ) : (
          initialSections.map(section => (
            <div key={section.id} className={styles.listItem}>
              <div className={styles.itemInfo}>
                <strong>{section.title}</strong>
                <span>{section.content.substring(0, 50)}...</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => handleOpenEdit(section)}
                  className={styles.actionBtn}
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  onClick={() => handleDelete(section.id)}
                  className={`${styles.actionBtn} ${styles.delete}`}
                  disabled={isPending}
                >
                  {confirmDeleteId === section.id ? 'Confirm?' : 'Delete'}
                </button>
                {confirmDeleteId === section.id && (
                  <button 
                    type="button" 
                    onClick={executeDelete}
                    className="btn btn-primary"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                  >
                    Yes
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>X</button>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingSection ? 'Edit Section' : 'Add New Section'}
              </h2>
            </div>

            <form className={styles.form} style={{ padding: 0, background: 'none', border: 'none' }} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input name="title" defaultValue={editingSection?.title || ''} required />
              </div>

              <div className={styles.formGroup}>
                <label>Content</label>
                <textarea name="content" rows={5} defaultValue={editingSection?.content || ''} required />
              </div>

              <div className={styles.formGroup}>
                <label>Image (Optional)</label>
                <input type="file" name="image" accept="image/*" />
                {editingSection?.imageUrl && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Current: {editingSection.imageUrl.split('/').pop()}
                  </span>
                )}
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : editingSection ? 'Update Section' : 'Add Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
