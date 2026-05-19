import styles from '../admin.module.css';
import prisma from '@/lib/prisma';
import ReviewsTable from './ReviewsTable';
export const dynamic = 'force-dynamic';


export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Penilaian Pengguna</h1>
        <p className={styles.subtitle}>Manage reviews from your clients.</p>
      </header>

      <ReviewsTable initialReviews={reviews} />
    </div>
  );
}
