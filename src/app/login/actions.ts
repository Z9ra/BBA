'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function login(prevState: { error?: string } | null, formData: FormData) {
  const password = formData.get('password') as string;

  if (!password) {
    return { error: 'Password tidak boleh kosong.' };
  }

  // Fetch admin user from database
  const admin = await prisma.adminUser.findUnique({
    where: { username: 'admin' }
  });

  if (!admin) {
    return { error: 'Admin tidak ditemukan.' };
  }

  // Verify password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return { error: 'Password salah. Silakan coba lagi.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('admin_auth', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  redirect('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  redirect('/login');
}
