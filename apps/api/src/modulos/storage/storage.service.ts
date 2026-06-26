import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: process.env.S3_ENDPOINT, // Permite usar MinIO local o AWS S3
      accessKeyId: process.env.AWS_ACCESS_KEY || 'minioadmin',
      secretAccessKey: process.env.AWS_SECRET_KEY || 'minioadmin',
      s3ForcePathStyle: true,
    });
  }

  async subirArchivo(buffer: Buffer, mimetype: string, estudianteId: string): Promise<string> {
    const nombreArchivo = `informes/${estudianteId}/${uuidv4()}.pdf`;
    const bucket = process.env.S3_BUCKET_NAME || 'tesis-bucket';
    
    try {
      await this.s3.putObject({
        Bucket: bucket,
        Key: nombreArchivo,
        Body: buffer,
        ContentType: mimetype,
      }).promise();

      return `https://${bucket}.s3.amazonaws.com/${nombreArchivo}`;
    } catch (error) {
      throw new InternalServerErrorException('Error al subir el documento al repositorio');
    }
  }
}
