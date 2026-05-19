import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(file: File): Promise<string> {
  // If running on Vercel or in production, convert to Base64 directly.
  // This completely resolves the EROFS (Read-only file system) error on Vercel Serverless!
  if (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production') {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    return `data:${mimeType};base64,${base64}`;
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate a unique filename to avoid caching issues
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    return `/uploads/${filename}`;
  } catch (error: any) {
    // Graceful fallback to Base64 if writing fails due to read-only filesystem
    if (error.code === 'EROFS' || error.message?.includes('read-only')) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64 = buffer.toString('base64');
      const mimeType = file.type || 'image/jpeg';
      return `data:${mimeType};base64,${base64}`;
    }
    throw error;
  }
}
