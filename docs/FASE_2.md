Resumen de Entregables de la Fase 2
Servicios de Backend (NestJS - apps/api):

Entidades de Base de Datos (TypeORM): Creadas las entidades ProyectoTesis (
proyecto.entity.ts
), Asesoria (
asesoria.entity.ts
) y Usuario (
usuario.entity.ts
).
Flujos Académicos (ProyectosService): Implementado en 
proyectos.service.ts
, controlando la progresión de estados (borrador ➔ en_revision ➔ aprobado ➔ conformidad_asesor) e impidiendo la conformidad si el estudiante no tiene al menos 6 asesorías registradas.
Generación de Constancia PDF (PdfService): Implementado en 
pdf.service.ts
 usando pdfkit con un flujo de escritura en stream.
Integración de TypeORM: Configurada la conexión a PostgreSQL con auto-sincronización en 
app.module.ts
.
Frontend Web (Next.js - apps/web):

Wizard de Inscripción: Implementado en 
WizardInscripcion.tsx
, el cual orquesta la carga secuencial de pasos.
Páginas del Wizard: Creados 
FormularioDatosBasicos.tsx
 (Título y Línea de Investigación), 
SeleccionAsesor.tsx
 (Selección de Asesor asignado) y 
ResumenConfirmacion.tsx
 (Resumen y envío).
Frontend Móvil (React Native/Expo - apps/movil):

Cliente API Móvil: Creado el cliente 
cliente.ts
 con soporte para la lectura de tokens seguros en móvil.
Registro de Asesorías: Creado 
RegistroAsesoria.tsx
 que envía el registro de notas académicas al backend.
Tipado de Clases Tailwind: Agregado 
declarations.d.ts
 para permitir clases de Tailwind (className) en los componentes nativos sin arrojar advertencias del compilador.
Verificación:

Compilación exitosa de todos los proyectos en el monorepo y las pruebas unitarias pasan limpiamente.