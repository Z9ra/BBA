import Link from 'next/link';
import styles from './admin.module.css';
import prisma from '@/lib/prisma';
import { getSettings } from '@/lib/settings';
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch real stats
  const [projectCount, reviewCount, pendingReviews, unreadMessages, recentReviews, recentProjects, settings] = await Promise.all([
    prisma.project.count(),
    prisma.review.count(),
    prisma.review.count({ where: { status: 'Pending' } }),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.review.findMany({ take: 2, orderBy: { createdAt: 'desc' } }),
    prisma.project.findMany({ take: 2, orderBy: { createdAt: 'desc' } }),
    getSettings()
  ]);

  const stats = [
    { title: 'Total Projects', value: projectCount.toString(), icon: 'bi-folder2-open', change: 'Total in DB' },
    { title: 'Total Reviews', value: reviewCount.toString(), icon: 'bi-star-half', change: `${pendingReviews} pending` },
    { title: 'Pesan Masuk', value: unreadMessages.toString(), icon: 'bi-envelope-open', change: 'Belum dibaca' },
    { title: 'Website Status', value: 'Live', icon: 'bi-hdd-network', change: 'Connected to MySQL' },
  ];

  // Dummy Chart Data (Visitors per day) - For future integration
  const visitorData = [
    { day: 'Mon', count: 120 },
    { day: 'Tue', count: 150 },
    { day: 'Wed', count: 180 },
    { day: 'Thu', count: 130 },
    { day: 'Fri', count: 210 },
    { day: 'Sat', count: 250 },
    { day: 'Sun', count: 220 },
  ];
  const maxVisitors = Math.max(...visitorData.map((d) => d.count));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back, Admin. System is connected to MySQL.</p>
      </header>

      {/* Top Stats */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3>{stat.title}</h3>
              <i className={`bi ${stat.icon}`} style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', opacity: 0.7 }}></i>
            </div>
            <div className={styles.statValue}>{stat.value}</div>
            <p className={styles.statChange}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className={styles.dashboardGrid}>
        
        {/* Left Column: Graphic & Content Summary */}
        <div className={styles.gridCol}>
          
          {/* Chart Section */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Web Visitors (Last 7 Days)</h2>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.chartWrapper}>
                {visitorData.map((data, idx) => {
                  const heightPercentage = (data.count / maxVisitors) * 100;
                  return (
                    <div key={idx} className={styles.barGroup}>
                      <div className={styles.barTooltip}>{data.count}</div>
                      <div className={styles.barTrack}>
                        <div 
                          className={styles.barFill} 
                          style={{ height: `${heightPercentage}%` }}
                        ></div>
                      </div>
                      <span className={styles.barLabel}>{data.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Summary */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Content Settings Status</h2>
              <Link href="/admin/content" className={styles.viewAll}>Edit</Link>
            </div>
            <ul className={styles.summaryList}>
              <li>
                <span className={styles.summaryLabel}>Hero Title:</span>
                <span className={styles.summaryValue}>{settings.heroTitle}</span>
              </li>
              <li>
                <span className={styles.summaryLabel}>Hero Subtitle:</span>
                <span className={styles.summaryValue}>{settings.heroSubtitle}</span>
              </li>
              <li>
                <span className={styles.summaryLabel}>About Us Text:</span>
                <span className={styles.summaryValue}>{settings.aboutText.substring(0, 50)}...</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Reviews & Projects */}
        <div className={styles.gridCol}>
          
          {/* Reviews Summary */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Recent Reviews</h2>
              <Link href="/admin/reviews" className={styles.viewAll}>View All</Link>
            </div>
            <div className={styles.listContainer}>
              {recentReviews.map((review, idx) => (
                <div key={idx} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <strong>{review.name}</strong>
                    <span>Rating: {review.rating} / 5</span>
                  </div>
                  <span className={`${styles.badge} ${review.status === 'Approved' ? styles.success : styles.warning}`}>
                    {review.status}
                  </span>
                </div>
              ))}
              {recentReviews.length === 0 && <p>No reviews yet.</p>}
            </div>
          </div>

          {/* Projects Summary */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Active Projects</h2>
              <Link href="/admin/projects" className={styles.viewAll}>Manage</Link>
            </div>
            <div className={styles.listContainer}>
              {recentProjects.map((project, idx) => (
                <div key={idx} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <strong>{project.name}</strong>
                  </div>
                  <span className={`${styles.badge} ${project.status === 'Completed' ? styles.success : styles.warning}`}>
                    {project.status}
                  </span>
                </div>
              ))}
              {recentProjects.length === 0 && <p>No projects yet.</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
