Resumen de Entregables de la Fase 1
Servicios de Backend (NestJS - apps/api):

Validación del Dominio: Implementado en el 
RegistroDto
 con expresiones regulares estrictas restringidas a @unitru.edu.pe.
Servicios de Autenticación: En 
AuthService
 usando encriptación por hash bcrypt y JWT de acceso y de refresco.
Gestión de Roles (RBAC): 
RolesGuard
 y decorador para restringir el acceso a nivel de endpoints.
Infraestructura Complementaria: Un UsuariosService (temporal en memoria) para almacenar registros y un JwtAuthGuard a la medida para decodificar los JWT e inyectar el usuario en Express.
Frontend Web (Next.js - apps/web):

Cliente API Axios: En 
cliente.ts
 con interceptores para inyectar cabeceras Bearer automáticamente y manejar respuestas 401 intentando renovar el token antes de forzar el redireccionamiento al login.
Contexto Global: En 
AuthContext.tsx
 para mantener y persistir el estado del usuario.
Frontend Móvil (React Native/Expo - apps/movil):

Almacenamiento Seguro: En 
almacenamiento.ts
 usando expo-secure-store.
Navegador y Skeletons: 
AppNavegador.tsx
 junto a vistas preliminares de carga y rutas públicas/autenticadas para verificar el funcionamiento de las transiciones.
Pruebas Unitarias (Jest):

Creado y ejecutado 
auth.service.spec.ts
, verificando que:
El registro de estudiante funcione de forma exitosa y devuelva los tokens.
Falle con BadRequestException en caso de intentar registrar un correo duplicado.
Resultado: Todas las pruebas pasaron (3 passed, 3 total).