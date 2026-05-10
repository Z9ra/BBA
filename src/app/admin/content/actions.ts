'use server';

import fs from 'fs/promises';
import path from 'path';
import { saveSettings } from '@/lib/settings';
import { revalidatePath } from 'next/cache';

export async function updateAppearance(prevState: { error?: string; success?: string } | null, formData: FormData) {
  try {
    const backgroundType = formData.get('backgroundType') as 'color' | 'image';
    const backgroundColor = formData.get('backgroundColor') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const imageFile = formData.get('imageFile') as File | null;

    let finalImageUrl = imageUrl;

    // Handle File Upload
    if (backgroundType === 'image' && imageFile && imageFile.size > 0) {
      // Validate file type (simple check)
      if (!imageFile.type.startsWith('image/')) {
        return { error: 'Please upload a valid image file.' };
      }

      // Save to public/uploads
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      // Generate a unique filename to avoid caching issues
      const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadDir, filename);

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await fs.writeFile(filePath, buffer);
      
      // Update the URL to the uploaded file
      finalImageUrl = `/uploads/${filename}`;
    }

    // Save to settings
    await saveSettings({
      backgroundType,
      backgroundColor: backgroundColor || '#050505',
      backgroundImageUrl: finalImageUrl || '',
    });

    // Revalidate layout to apply changes immediately
    revalidatePath('/', 'layout');

    return { success: 'Appearance settings updated successfully!' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update appearance settings.' };
  }
}

export async function updateTextContent(prevState: { error?: string; success?: string } | null, formData: FormData) {
  try {
    const heroTitle = formData.get('heroTitle') as string;
    const heroSubtitle = formData.get('heroSubtitle') as string;
    const aboutText = formData.get('aboutText') as string;

    await saveSettings({
      heroTitle,
      heroSubtitle,
      aboutText,
    });

    revalidatePath('/', 'layout');
    return { success: 'Text content updated successfully!' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update text content.' };
  }
}
