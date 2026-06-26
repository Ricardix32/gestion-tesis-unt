# Sistema de Gestión de Tesis - Universidad Nacional de Trujillo (UNT)

Este es el repositorio principal para el **Sistema de Gestión de Tesis de la Universidad Nacional de Trujillo**. El proyecto está estructurado como un **Monorepo** administrado con NPM Workspaces para facilitar la reutilización de código, tipos y componentes de UI comunes entre la aplicación Web, Móvil y la API.

---

## 🚀 Arquitectura del Proyecto

El sistema adopta un diseño de **Microservicios Modulares** estructurado en capas. La comunicación entre clientes y servicios está centralizada mediante una puerta de enlace (API Gateway) con autenticación basada en JSON Web Tokens (JWT) y Control de Acceso Basado en Roles (RBAC).

Para ver a detalle los diagramas y el modelo relacional de la Base de Datos, consulte la [Documentación de Arquitectura](docs/arquitectura.md).

---

## 📁 Estructura del Monorepo

La distribución de archivos en el monorepo se detalla a continuación:

```plaintext
/gestion-tesis-unt
├── apps/
│   ├── web/               # Next.js Dashboard App (Frontend Web)
│   ├── api/               # NestJS API Server (Backend)
│   └── movil/             # React Native (Expo) Client App (Frontend Mobile)
├── paquetes/
│   ├── tipos-compartidos/ # Interfaces TypeScript compartidas (DTOs y Modelos)
│   ├── componentes-ui/    # Biblioteca de componentes visuales (React, Tailwind)
│   └── config-comun/      # Configuraciones de compilación compartidas (TSConfig, ESLint)
├── infra/
│   ├── docker/            # Docker Compose para base de datos y caché local
│   ├── k8s/               # Manifiestos de Kubernetes para despliegue
│   └── scripts/           # Scripts de inicialización SQL y automatización de backups
└── README.md              # Esta guía general
```

---

## 🛠️ Requisitos Previos

Asegúrate de contar con las siguientes herramientas instaladas en tu equipo de desarrollo:

- **Node.js**: v22.x o superior
- **NPM**: v11.x o superior
- **Docker & Docker Compose**: Para correr los servicios de PostgreSQL, Redis y MinIO locales.

---

## ⚡ Comienzo Rápido (Quick Start)

Sigue estos pasos para levantar el entorno local:

### 1. Clonar el repositorio e instalar dependencias
Ejecuta la instalación desde la carpeta raíz. NPM Workspaces se encargará de instalar y enlazar todos los paquetes y aplicaciones simultáneamente:
```bash
npm install
```

### 2. Levantar Servicios locales (PostgreSQL, Redis & MinIO)
Navega a la carpeta de infraestructura docker y levanta los servicios. El contenedor de PostgreSQL cargará de forma automática el script `schema.sql` y MinIO estará disponible en `http://localhost:9000` (API) y `http://localhost:9001` (Consola):
```bash
cd infra/docker
docker compose up -d
```

### 3. Configurar Variables de Entorno (Storage / S3)
Para el correcto funcionamiento del almacenamiento de documentos de tesis, define las siguientes variables en tu entorno o en el archivo `.env` de la API (`apps/api/.env`):
```env
S3_ENDPOINT=http://localhost:9000
AWS_ACCESS_KEY=minioadmin
AWS_SECRET_KEY=minioadmin
S3_BUCKET_NAME=tesis-bucket
```

### 4. Compilar los paquetes compartidos
Antes de iniciar los frontends o el backend, compila las librerías TypeScript comunes:
```bash
npm run build
```

### 5. Ejecutar el entorno de desarrollo
Inicia todos los proyectos en modo de desarrollo simultáneamente:
```bash
npm run dev
```

---

## 📦 Detalle de los Proyectos

### Aplicaciones (`apps/`)
- **[Next.js Dashboard (web)](file:///c:/ReactProyects/gestion-tesis-unt/apps/web)**: Aplicación administrativa para coordinadores, estudiantes, asesores y jurados.
- **[NestJS API (api)](file:///c:/ReactProyects/gestion-tesis-unt/apps/api)**: Backend robusto modular con NestJS, JWT, Guards para RBAC, y TypeORM/Prisma (por definir) conectado a PostgreSQL.
- **[Expo App (movil)](file:///c:/ReactProyects/gestion-tesis-unt/apps/movil)**: Cliente nativo liviano para seguimiento de estados, alertas y conformidades rápidas.

### Paquetes (`paquetes/`)
- **[tipos-compartidos](file:///c:/ReactProyects/gestion-tesis-unt/paquetes/tipos-compartidos)**: Centraliza DTOs, Enums y modelos de datos para evitar discrepancias de tipos entre backend y frontends.
- **[componentes-ui](file:///c:/ReactProyects/gestion-tesis-unt/paquetes/componentes-ui)**: Componentes visuales reutilizables.
- **[config-comun](file:///c:/ReactProyects/gestion-tesis-unt/paquetes/config-comun)**: Configuración unificada de herramientas del desarrollador.

---

## ✅ Definition of Done (DoD)

Para marcar cualquier tarea o historia de usuario (HU) como completada:
1. **Funcionalidad**: Cumpimiento al 100% de la HU asignada.
2. **Calidad**: Pasa linting (`npm run lint`) y no contiene vulnerabilidades críticas.
3. **Pruebas**: Cobertura de pruebas unitarias superior al **70%** (usando Jest/Vitest).
4. **Documentación**: Los endpoints de la API deben estar expuestos en Swagger/OpenAPI.
5. **Revisión**: Pull Request aprobado por el Arquitecto de Software.
