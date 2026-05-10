'use server';

import fs from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';
import { saveSettings } from '@/lib/settings';
import { revalidatePath } from 'next/cache';
import { uploadFile } from '@/lib/upload';

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

      finalImageUrl = await uploadFile(imageFile);
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

export async function updateStaticImages(prevState: any, formData: FormData) {
  try {
    const heroImage = formData.get('heroImage') as File | null;
    const aboutImage = formData.get('aboutImage') as File | null;
    const logoImage = formData.get('logoImage') as File | null;

    const updates: any = {};

    if (heroImage && heroImage.size > 0) {
      updates.heroImageUrl = await uploadFile(heroImage);
    }

    if (aboutImage && aboutImage.size > 0) {
      updates.aboutImageUrl = await uploadFile(aboutImage);
    }

    if (logoImage && logoImage.size > 0) {
      updates.logoUrl = await uploadFile(logoImage);
    }

    if (Object.keys(updates).length > 0) {
      await saveSettings(updates);
      revalidatePath('/', 'layout');
      return { success: 'Images updated successfully!' };
    }

    return { error: 'No images uploaded.' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to upload images.' };
  }
}

export async function addCustomSection(prevState: any, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;

    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFile(imageFile);
    }

    await prisma.customSection.create({
      data: { title, content, imageUrl }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/admin/content');
    return { success: 'Custom section added!' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to add section.' };
  }
}

export async function updateCustomSection(id: number, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFile = formData.get('image') as File | null;

    const existing = await prisma.customSection.findUnique({ where: { id } });
    let imageUrl = existing?.imageUrl || '';

    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFile(imageFile);
    }

    await prisma.customSection.update({
      where: { id },
      data: { title, content, imageUrl }
    });

    revalidatePath('/', 'layout');
    revalidatePath('/admin/content');
    return { success: 'Section updated!' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update section.' };
  }
}

export async function deleteCustomSection(id: number) {
  try {
    await prisma.customSection.delete({ where: { id } });
    revalidatePath('/', 'layout');
    revalidatePath('/admin/content');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete section.' };
  }
}


