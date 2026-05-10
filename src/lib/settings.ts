import prisma from './prisma';

export interface AppSettings {
  backgroundType: 'color' | 'image';
  backgroundColor: string;
  backgroundImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
}

const defaultSettings: AppSettings = {
  backgroundType: 'color',
  backgroundColor: '#050505',
  backgroundImageUrl: '',
  heroTitle: 'SOLUSI TEKNOLOGI UNTUK BISNIS ANDA',
  heroSubtitle: 'Membangun infrastruktur digital yang kuat, aman, dan efisien melalui perangkat lunak kustom dan integrasi jaringan terbaik.',
  aboutText: 'PT. Bersama Berdikari Abadi menyediakan layanan pengembangan perangkat lunak dan aplikasi profesional, menghadirkan alat digital seperti aplikasi seluler dan situs web melalui proses konsultasi, pengkodean, dan pengujian kualitas yang ketat.',
};

export async function getSettings(): Promise<AppSettings> {
  try {
    const dbSettings = await prisma.setting.findMany();
    
    // Map array of {key, value} to AppSettings object
    const settingsObj = dbSettings.reduce((acc, curr) => {
      acc[curr.key as keyof AppSettings] = curr.value as any;
      return acc;
    }, {} as AppSettings);

    // Merge with defaults to ensure all keys exist
    return { ...defaultSettings, ...settingsObj };
  } catch (error) {
    console.error('Failed to fetch settings from DB:', error);
    return defaultSettings;
  }
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<void> {
  try {
    // Save each key-value pair to the database
    const promises = Object.entries(settings).map(([key, value]) => {
      return prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Failed to save settings to DB:', error);
    throw new Error('Failed to save settings');
  }
}
