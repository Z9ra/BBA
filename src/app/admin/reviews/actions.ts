'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteReview(id: number) {
  try {
    await prisma.review.delete({
      where: { id }
    });
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete review' };
  }
}

export async function updateReviewStatus(id: number, status: string) {
  try {
    await prisma.review.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update review status' };
  }
}
