import styles from '../admin.module.css';
import prisma from '@/lib/prisma';
import ProjectsTable from './ProjectsTable';
export const dynamic = 'force-dynamic';


export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Manage Projects</h1>
        <p className={styles.subtitle}>Add, edit, or remove projects from your portfolio.</p>
      </header>

      <ProjectsTable initialProjects={projects} />
    </div>
  );
}
