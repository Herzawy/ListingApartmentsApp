import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageUploadService {
  // Set up multer storage configuration
  storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  // File filter to accept only specific types of files
  fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(file.mimetype);
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadDir = path.join(__dirname, '../../uploads'); 
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    const uploadPath = path.join(uploadDir, uniqueFilename);

    // Ensure the directory exists before writing the file
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write the file to disk
    fs.writeFileSync(uploadPath, file.buffer);

    return uniqueFilename;
  }

  // Function to check if a file exists
  async fileExists(filePath: string): Promise<boolean> {
    return fs.existsSync(filePath);
  }

  // Function to send the file in the response
  sendFile(filePath: string, res: Response) {
    res.sendFile(filePath);
  }

  // Multer setup for file upload handling
  upload() {
    return multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
    }).single('file');
  }
}
