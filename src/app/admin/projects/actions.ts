'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteProject(id: number) {
  try {
    await prisma.project.delete({
      where: { id }
    });
    revalidatePath('/admin/projects');
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

    await prisma.project.create({
      data: { name, category, client, status }
    });
    
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to add project' };
  }
}
