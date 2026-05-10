import type { Metadata } from 'next';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';
import { getSettings } from '@/lib/settings';
import prisma from '@/lib/prisma';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = 'PT. Bersama Berdikari Abadi | IT Solutions';
  const description = settings.heroSubtitle;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'id_ID',
      siteName: 'PT. Bersama Berdikari Abadi',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Home() {
  const settings = await getSettings();
  const [approvedReviews, completedProjects] = await Promise.all([
    prisma.review.findMany({
      where: { status: 'Approved' },
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.findMany({
      where: { status: 'Completed' },
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* HERO SECTION */}
        <section className={`${styles.hero} animate-fade-in`} id="home">
          <div className={`container ${styles.heroContainer}`}>
            <h1 className={styles.heroTitle}>
              SOLUSI <span className="accent">TEKNOLOGI</span>
              <br />
              UNTUK BISNIS ANDA
            </h1>
            <p className={styles.heroSubtitle}>
              {settings.heroSubtitle}
            </p>
            <div className={styles.heroActions}>
              <a href="#services" className="btn btn-primary">Lihat Layanan</a>
              <a href="#contact" className="btn btn-outline">Konsultasi Gratis</a>
            </div>
          </div>
          <div className={styles.heroBackground}></div>
        </section>

        {/* ABOUT SECTION */}
        <section className="section glass" id="about">
          <RevealOnScroll className="container">
            <div className={styles.aboutGrid}>
              <div className={styles.aboutContent}>
                <h2 className={styles.sectionTitle}>Tentang Kami</h2>
                <p>{settings.aboutText}</p>
                <p>
                  Hal ini memastikan setiap sistem aman, mudah digunakan, dan disesuaikan untuk membantu bisnis beroperasi lebih efisien. Perusahaan juga memiliki keahlian dalam integrasi infrastruktur jaringan TI dan dukungan teknis perangkat keras.
                </p>
              </div>
              <div className={styles.aboutImage}>
                <div className={styles.imagePlaceholder}>
                  <span>Inovasi &amp; Integritas</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* SERVICES SECTION */}
        <section className="section" id="services">
          <RevealOnScroll className="container">
            <h2 className={`${styles.sectionTitle} ${styles.textCenter}`}>Layanan Utama Kami</h2>

            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>01</div>
                <h3>Pengembangan Perangkat Lunak</h3>
                <p>Pengembangan perangkat lunak dan aplikasi yang disesuaikan dengan kebutuhan pelanggan, mengutamakan efisiensi, fungsionalitas, dan pengalaman pengguna.</p>
                <ul className={styles.serviceList}>
                  <li>Sistem Informasi &amp; ERP</li>
                  <li>Web Profil Perusahaan</li>
                  <li>Aplikasi Kasir (POS)</li>
                  <li>Platform E-commerce</li>
                </ul>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>02</div>
                <h3>Instalasi &amp; Pemeliharaan Jaringan</h3>
                <p>Integrasi infrastruktur jaringan TI untuk menyediakan konektivitas yang stabil, aman, dan berkecepatan tinggi yang disesuaikan dengan tata letak kantor.</p>
                <ul className={styles.serviceList}>
                  <li>Topologi Jaringan</li>
                  <li>Pengaturan Router &amp; Switch</li>
                  <li>Pengaturan Server &amp; NAS</li>
                  <li>Sistem Wi-Fi Aman</li>
                </ul>
              </div>

              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>03</div>
                <h3>Layanan &amp; Suplai Perangkat Keras</h3>
                <p>Memberikan dukungan teknis dan pemeliharaan untuk memperpanjang masa pakai komputer dan server melalui diagnosis dan perbaikan profesional.</p>
                <ul className={styles.serviceList}>
                  <li>Perbaikan Motherboard</li>
                  <li>Perakitan &amp; Suplai PC</li>
                  <li>Instalasi OS &amp; Aplikasi</li>
                  <li>Pemulihan Data (Data Recovery)</li>
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* PORTFOLIO / PROJECTS SECTION */}
        {completedProjects.length > 0 && (
          <section className="section glass" id="portfolio">
            <RevealOnScroll className="container">
              <h2 className={`${styles.sectionTitle} ${styles.textCenter}`}>Proyek Kami</h2>
              <p className={styles.sectionSubtitle}>
                Berikut adalah sebagian dari proyek yang telah kami selesaikan untuk klien kami.
              </p>
              <div className={styles.servicesGrid}>
                {completedProjects.map((project) => (
                  <div key={project.id} className={styles.serviceCard}>
                    <div className={styles.serviceIcon} style={{ fontSize: '1rem', opacity: 0.6 }}>
                      {project.category}
                    </div>
                    <h3>{project.name}</h3>
                    {project.client && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Klien: {project.client}
                      </p>
                    )}
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        padding: '0.2rem 0.75rem',
                        background: 'rgba(0, 200, 83, 0.15)',
                        color: '#00c853',
                        borderRadius: '999px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      <i className="bi bi-patch-check-fill" style={{ marginRight: '0.4rem' }}></i>
                      Selesai
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>
        )}

        {/* SEGMENTS SECTION */}
        <section className={`section ${styles.segmentsSection}`} id="segments">
          <RevealOnScroll className="container">
            <h2 className={`${styles.sectionTitle} ${styles.textCenter}`}>Segmen Pelanggan</h2>
            <div className={styles.segmentsGrid}>
              <div className={styles.segmentCard}>
                <h4>Skala Perusahaan</h4>
                <p>Solusi infrastruktur &amp; jaringan TI</p>
              </div>
              <div className={styles.segmentCard}>
                <h4>UMKM</h4>
                <p>Digitalisasi &amp; Pengembangan Software Berbasis Kebutuhan</p>
              </div>
              <div className={styles.segmentCard}>
                <h4>Pemerintah</h4>
                <p>Sistem Informasi &amp; Pengadaan Perangkat Keras</p>
              </div>
              <div className={styles.segmentCard}>
                <h4>Startup</h4>
                <p>Pembuatan Website Khusus &amp; Branding Image</p>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* TESTIMONIALS / REVIEWS SECTION */}
        {approvedReviews.length > 0 && (
          <section className="section glass" id="reviews">
            <RevealOnScroll className="container">
              <h2 className={`${styles.sectionTitle} ${styles.textCenter}`}>Apa Kata Mereka?</h2>
              <div className={styles.servicesGrid}>
                {approvedReviews.map((review) => (
                  <div key={review.id} className={styles.serviceCard}>
                    <div style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                      ))}
                    </div>
                    <h3 style={{ fontSize: '1.1rem' }}>{review.name}</h3>
                    {review.company && (
                      <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                        &quot;{review.company}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>
        )}

        {/* CONTACT SECTION */}
        <section className="section" id="contact">
          <RevealOnScroll className="container">
            <div className={styles.contactGrid}>
              <div className={styles.contactInfo}>
                <h2 className={styles.sectionTitle}>Hubungi Kami</h2>
                <p>
                  Kami siap membantu Anda. Kirimkan pesan, pertanyaan, atau konsultasikan kebutuhan IT Anda kepada kami.
                </p>
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}><i className="bi bi-geo-alt-fill"></i></span>
                    <span>Indonesia</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}><i className="bi bi-envelope-fill"></i></span>
                    <span>info@bba-solutions.com</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}><i className="bi bi-telephone-fill"></i></span>
                    <span>+62 812 xxxx xxxx</span>
                  </div>
                </div>
              </div>
              <div className={styles.contactFormWrapper}>
                <ContactForm />
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </main>

      <Footer />
    </>
  );
}
