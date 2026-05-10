'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markAsRead(id: number) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true }
    });
    revalidatePath('/admin/messages');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to mark as read' };
  }
}

export async function deleteMessage(id: number) {
  try {
    await prisma.contactMessage.delete({
      where: { id }
    });
    revalidatePath('/admin/messages');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete message' };
  }
}
