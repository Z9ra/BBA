'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitContact(prevState: { error?: string; success?: string } | null, formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !message) {
    return { error: 'Nama, Email, dan Pesan wajib diisi.' };
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Format email tidak valid.' };
  }

  try {
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, message },
    });

    revalidatePath('/admin');
    revalidatePath('/admin/messages');

    return { success: 'Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.' };
  } catch (error) {
    console.error('Failed to save contact message:', error);
    return { error: 'Terjadi kesalahan. Silakan coba lagi.' };
  }
}
