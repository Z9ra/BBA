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
  const [approvedReviews, completedProjects, customSections] = await Promise.all([
    prisma.review.findMany({
      where: { status: 'Approved' },
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.customSection.findMany({
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  return (
    <>
      <Navbar logoUrl={settings.logoUrl} />

      <main className={styles.main}>
        {/* HERO SECTION */}
        <section className={`${styles.hero} animate-fade-in`} id="home">
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                {settings.heroTitle.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {word === 'TEKNOLOGI' ? <span className="accent">TEKNOLOGI</span> : word}
                    {i < arr.length - 1 ? ' ' : ''}
                    {i === 1 ? <br /> : ''}
                  </span>
                ))}
              </h1>
              <p className={styles.heroSubtitle}>
                {settings.heroSubtitle}
              </p>
              <div className={styles.heroActions}>
                <a href="#services" className="btn btn-primary">Lihat Layanan</a>
                <a href="https://api.whatsapp.com/send/?phone=6282127772205" className="btn btn-outline">Konsultasi Gratis</a>
              </div>
            </div>
            <div className={styles.heroImageColumn}>
              {settings.heroImageUrl ? (
                <div className={styles.heroIllustration}>
                  <Image
                    src={settings.heroImageUrl}
                    alt="Hero Illustration"
                    width={600}
                    height={600}
                    priority
                    className={styles.heroImg}
                  />
                </div>
              ) : (
                <div className={styles.heroPlaceholder}>
                  {/* Generic Tech Illustration if no image */}
                  <i className="bi bi-cpu" style={{ fontSize: '10rem', opacity: 0.2 }}></i>
                </div>
              )}
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
                {settings.aboutImageUrl ? (
                  <div className={styles.aboutImageWrapper}>
                    <Image
                      src={settings.aboutImageUrl}
                      alt="About PT. BBA"
                      width={600}
                      height={400}
                      className={styles.dynamicImage}
                    />
                  </div>
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span>Inovasi &amp; Integritas</span>
                  </div>
                )}
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
                  <div key={project.id} className={styles.projectCard}>
                    {project.imageUrl ? (
                      <div className={styles.projectImageWrapper}>
                        <Image
                          src={project.imageUrl}
                          alt={project.name}
                          fill
                          className={styles.projectImage}
                        />
                      </div>
                    ) : (
                      <div className={styles.projectImagePlaceholder}>
                        <i className="bi bi-image"></i>
                      </div>
                    )}
                    <div className={styles.projectContent}>
                      <div className={styles.projectCategory}>{project.category}</div>
                      <h3>{project.name}</h3>
                      {project.client && (
                        <p className={styles.projectClient}>Klien: {project.client}</p>
                      )}
                      <div className={styles.projectStatus}>
                        <i className="bi bi-patch-check-fill"></i> Selesai
                      </div>
                    </div>
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

        {/* CUSTOM SECTIONS */}
        {customSections.map((section, index) => (
          <section
            key={section.id}
            className={`section ${index % 2 === 0 ? 'glass' : ''}`}
          >
            <RevealOnScroll className="container">
              <div className={styles.aboutGrid} style={{ direction: index % 2 === 0 ? 'ltr' : 'rtl' }}>
                <div className={styles.aboutContent} style={{ direction: 'ltr' }}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <div className={styles.customContent}>
                    {section.content.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
                {section.imageUrl && (
                  <div className={styles.aboutImage}>
                    <div className={styles.aboutImageWrapper}>
                      <Image
                        src={section.imageUrl}
                        alt={section.title}
                        width={600}
                        height={400}
                        className={styles.dynamicImage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          </section>
        ))}

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
                    <span>DUSUN DARONGDONG RT./RW. 01/08 DESA BUAHDUA,<br />
                      KEC. BUAHDUA, KAB. SUMEDANG, JAWA BARAT 45392</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}><i className="bi bi-telephone-fill"></i></span>
                    <span>(0261) 2142579</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}><i className="bi bi-envelope-fill"></i></span>
                    <span>pt.bersamaberdikariabadi@gmail.com</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}><i className="bi bi-telephone-fill"></i></span>
                    <span>0821-2777-2205</span>
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
