import fs from 'fs/promises';
import path from 'path';

export async function uploadFile(file: File): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadDir, { recursive: true });
  
  // Generate a unique filename to avoid caching issues
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = path.join(uploadDir, filename);
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  await fs.writeFile(filePath, buffer);
  
  return `/uploads/${filename}`;
}
