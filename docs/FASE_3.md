Walkthrough: Fase 3 - Seguimiento de Elaboración de Informe de Tesis Completado
Hemos integrado el módulo de elaboración y versionado de informes de tesis. Esto abarca persistencia relacional adicional, almacenamiento seguro de PDFs en la nube (MinIO/S3), carga de archivos e historial de revisiones en la interfaz web, y el panel móvil de seguimiento.

🛠️ Cambios Realizados en la Fase 3
1. Backend (apps/api)
Entidades de Base de Datos (TypeORM):
informe.entity.ts
: Define la estructura para la tabla informes_tesis.
version.entity.ts
: Define la estructura para la tabla versiones_documento, enlazada con relación ManyToOne hacia InformeTesis.
Servicio de Almacenamiento S3/MinIO (StorageService): 
storage.service.ts
 encapsula las subidas de archivos en stream hacia S3 o un servidor MinIO local usando aws-sdk.
Motor de Versionado de Informes (InformesService): 
informes.service.ts
 implementa la regla de negocio para iniciar informes tras la conformidad del asesor, autoincrementar las etiquetas de versión (v1.0, v2.0), limitar a máximo 3 revisiones y simular el plagio de Turnitin.
Ampliación en Proyectos: Modificado 
proyectos.service.ts
 agregando el método de consulta obtenerPorId utilizado por informes.
Configuración local de Docker: Modificado 
docker-compose.yml
 para proveer un contenedor local de MinIO que simula la subida de archivos en S3.
2. Frontend Web (apps/web)
Historial de Versiones: 
HistorialVersiones.tsx
 provee la vista para revisar las versiones enviadas, el nivel de coincidencia de Turnitin y un botón interactivo (con react-icons) para subir nuevas versiones en formato PDF por Axios.
3. Frontend Móvil (apps/movil)
Panel de Estado: 
DetalleInforme.tsx
 implementa el panel móvil de seguimiento del informe usando react-query para consultar datos y Linking nativo para visualizar los documentos PDF subidos en MinIO/S3.
4. Documentación
README: Actualizado 
README.md
 agregando las credenciales de MinIO y las variables de entorno de almacenamiento local.
⚡ Verificación Funcional y Pruebas Unitarias
1. Pruebas Unitarias del Backend (Jest)
Todas las pruebas de la API siguen pasando con éxito:

bash

npm run test --workspace=apps/api
Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Ran all test suites.
2. Compilación General
Compilamos todo el monorepo y verificamos la ausencia de errores en las dependencias agregadas:

bash

npm run build
> api@0.0.1 build
> nest build
> web@0.1.0 build
> next build
▲ Next.js 16.2.9 (Turbopack)
✓ Compiled successfully in 1.9s
> @gestion-tesis/componentes-ui@1.0.0 build
> tsc
> @gestion-tesis/tipos-compartidos@1.0.0 build
> tsc
El monorepo completo compila sin errores y cumple con las especificaciones de la Fase 3.