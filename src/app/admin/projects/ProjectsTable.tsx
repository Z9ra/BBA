'use client';

import { deleteProject, updateProjectStatus } from './actions';
import styles from '../admin.module.css';

interface Project {
  id: number;
  name: string;
  category: string;
  client: string | null;
  status: string;
}

interface ProjectsTableProps {
  initialProjects: Project[];
}

export default function ProjectsTable({ initialProjects }: ProjectsTableProps) {
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const handleStatusToggle = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Completed' ? 'In Progress' : 'Completed';
    await updateProjectStatus(id, newStatus);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project Name</th>
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
                  className={`${styles.badge} ${
                    project.status === 'Completed' ? styles.success : styles.warning
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleStatusToggle(project.id, project.status)}
                >
                  {project.status}
                </span>
              </td>
              <td>
                <button className={styles.actionBtn}>Edit</button>
                <button 
                  className={`${styles.actionBtn} ${styles.delete}`}
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {initialProjects.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                No projects found in the database.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
