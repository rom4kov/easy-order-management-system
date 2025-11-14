import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class UploadService {
  async saveFile(file: Express.Multer.File): Promise<{ message: string }> {
    const uploadPath = `/home/romkov/Documents/Coding/easy-order-management-system/server/uploads/${file.originalname}`;
    try {
      await writeFile(uploadPath, file.buffer);
      return { message: `File uploaded successfully! Path: ${uploadPath}` };
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return { message: `File upload failed! Path: ${uploadPath}` };
  }
}
