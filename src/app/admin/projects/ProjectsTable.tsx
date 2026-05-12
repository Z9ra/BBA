'use client';

import { useState, useTransition } from 'react';
import { deleteProject, updateProjectStatus, addProject, updateProject } from './actions';
import styles from '../admin.module.css';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  name: string;
  category: string;
  client: string | null;
  status: string;
  imageUrl?: string | null;
}

interface ProjectsTableProps {
  initialProjects: Project[];
}

export default function ProjectsTable({ initialProjects }: ProjectsTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('ProjectsTable Rendered with:', initialProjects.length, 'projects');

  const handleDelete = (id: number) => {
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;

    startTransition(async () => {
      try {
        console.log('Deleting project:', confirmDeleteId);
        const res = await deleteProject(confirmDeleteId);
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

  const handleStatusToggle = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Completed' ? 'In Progress' : 'Completed';
    startTransition(async () => {
      const res = await updateProjectStatus(id, newStatus);
      if (res.error) alert(res.error);
      router.refresh();
    });
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      let res;
      if (editingProject) {
        res = await updateProject(editingProject.id, formData);
      } else {
        res = await addProject(formData);
      }

      if (res?.error) {
        alert(res.error);
      } else {
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableActions}>
        <button className="btn btn-primary" onClick={handleOpenAdd}>Add New Project</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Client</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.category}</td>
              <td>{project.client || '-'}</td>
              <td>
                <span
                  className={`${styles.badge} ${project.status === 'Completed' ? styles.success : styles.warning}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleStatusToggle(project.id, project.status)}
                >
                  {project.status}
                </span>
              </td>
              <td style={{ display: 'flex', gap: '0.5rem' }}>
                <button className={styles.actionBtn} onClick={() => handleOpenEdit(project)}>Edit</button>
                <button
                  className={`${styles.actionBtn} ${styles.delete}`}
                  onClick={() => handleDelete(project.id)}
                  disabled={isPending}
                >
                  {confirmDeleteId === project.id ? 'Confirm?' : 'Delete'}
                </button>
                {confirmDeleteId === project.id && (
                  <button
                    type="button"
                    onClick={executeDelete}
                    className="btn btn-primary"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                  >
                    Yes
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>X</button>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit} style={{ border: 'none', padding: 0, background: 'transparent' }}>
              <div className={styles.formGroup}>
                <label>Project Name</label>
                <input name="name" defaultValue={editingProject?.name || ''} required />
              </div>
              <div className={styles.formGroup}>
                <label>Category</label>
                <input name="category" defaultValue={editingProject?.category || ''} required />
              </div>
              <div className={styles.formGroup}>
                <label>Client</label>
                <input name="client" defaultValue={editingProject?.client || ''} />
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select name="status" className={styles.select} defaultValue={editingProject?.status || 'In Progress'}>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Project Image</label>
                <input type="file" name="image" accept="image/*" />
                {editingProject?.imageUrl && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Current: {editingProject.imageUrl.split('/').pop()}
                  </span>
                )}
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : editingProject ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
