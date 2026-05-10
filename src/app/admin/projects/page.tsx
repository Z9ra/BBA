import styles from '../admin.module.css';
import prisma from '@/lib/prisma';
import ProjectsTable from './ProjectsTable';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Manage Projects</h1>
        <p className={styles.subtitle}>Add, edit, or remove projects from your portfolio.</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button className="btn btn-primary">Add New Project</button>
      </div>

      <ProjectsTable initialProjects={projects} />
    </div>
  );
}
