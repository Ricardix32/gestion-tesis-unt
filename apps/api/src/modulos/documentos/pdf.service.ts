import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Writable } from 'stream';

@Injectable()
export class PdfService {
  async generarCartaConformidad(datos: any, stream: Writable): Promise<void> {
    const doc = new PDFDocument();
    doc.pipe(stream);
    
    doc.fontSize(16).text('UNIVERSIDAD NACIONAL DE TRUJILLO', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('CARTA DE CONFORMIDAD DE PROYECTO DE TESIS', { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(12).text(`Por la presente, yo, ${datos.asesorNombre}, declaro haber asesorado el proyecto titulado "${datos.tituloProyecto}" elaborado por el estudiante ${datos.estudianteNombre}.`);
    doc.moveDown();
    doc.text(`Habiendo cumplido con las ${datos.totalAsesorias} asesorías reglamentarias, otorgo mi CONFORMIDAD para que proceda a la fase de informe de tesis.`);
    
    doc.end();
  }
}
