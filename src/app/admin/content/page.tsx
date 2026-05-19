import styles from '../admin.module.css';
import prisma from '@/lib/prisma';
import AppearanceForm from './AppearanceForm';
import TextContentForm from './TextContentForm';
import StaticImagesForm from './StaticImagesForm';
import DynamicContentForm from './DynamicContentForm';
import { getSettings } from '@/lib/settings';
export const dynamic = 'force-dynamic';


export default async function EditContentPage() {
  const settings = await getSettings();
  const customSections = await prisma.customSection.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Edit Content & Appearance</h1>
        <p className={styles.subtitle}>Manage website appearance, text, images, and add new sections.</p>
      </header>

      {/* Website Appearance */}
      <AppearanceForm initialSettings={settings} />

      {/* Text Content */}
      <TextContentForm initialSettings={settings} />

      {/* Static Images (Hero & About) */}
      <StaticImagesForm initialSettings={settings} />

      {/* Custom Sections */}
      <DynamicContentForm initialSections={customSections} />

    </div>
  );
}
