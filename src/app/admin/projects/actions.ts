'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { uploadFile } from '@/lib/upload';

export async function deleteProject(id: number) {
  try {
    await prisma.project.delete({
      where: { id }
    });
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete project' };
  }
}

export async function updateProjectStatus(id: number, status: string) {
  try {
    await prisma.project.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update project status' };
  }
}

export async function addProject(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const client = formData.get('client') as string;
    const status = formData.get('status') as string;
    const imageFile = formData.get('image') as File | null;

    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFile(imageFile);
    }

    await prisma.project.create({
      data: { name, category, client, status, imageUrl }
    });

    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to add project' };
  }
}

export async function updateProject(id: number, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const client = formData.get('client') as string;
    const status = formData.get('status') as string;
    const imageFile = formData.get('image') as File | null;

    const existing = await prisma.project.findUnique({ where: { id } });
    let imageUrl = existing?.imageUrl || '';

    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadFile(imageFile);
    }

    await prisma.project.update({
      where: { id },
      data: { name, category, client, status, imageUrl }
    });

    revalidatePath('/admin/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update project' };
  }
}
