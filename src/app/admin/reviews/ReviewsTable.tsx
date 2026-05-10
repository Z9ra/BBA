'use client';

import { deleteReview, updateReviewStatus } from './actions';
import styles from '../admin.module.css';

interface Review {
  id: number;
  name: string;
  company: string | null;
  rating: number;
  status: string;
  createdAt: Date;
}

interface ReviewsTableProps {
  initialReviews: Review[];
}

export default function ReviewsTable({ initialReviews }: ReviewsTableProps) {
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      await deleteReview(id);
    }
  };

  const handleStatusChange = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Approved' ? 'Pending' : 'Approved';
    await updateReviewStatus(id, newStatus);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Rating</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.name}</td>
              <td>{review.company || '-'}</td>
              <td>{review.rating} / 5</td>
              <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              <td>
                <span 
                  className={`${styles.badge} ${review.status === 'Approved' ? styles.success : styles.warning}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleStatusChange(review.id, review.status)}
                >
                  {review.status}
                </span>
              </td>
              <td>
                <button className={styles.actionBtn}>Edit</button>
                <button 
                  className={`${styles.actionBtn} ${styles.delete}`}
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {initialReviews.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                No reviews found in the database.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
