# Arquitectura del Sistema - Gestión de Tesis UNT

Este documento contiene los diagramas arquitectónicos y el modelo de datos de la plataforma.

## 1. Diagrama de Arquitectura de Alto Nivel

El sistema utiliza un enfoque de **Microservicios Modulares** para permitir un crecimiento orgánico. La comunicación entre el frontend y el backend se centraliza en un API Gateway con seguridad unificada.

```mermaid
graph TD
    subgraph Cliente_Capa ["Capa de Cliente"]
        Web["Web: React / Next.js"]
        Mobile["Mobile: React Native / Expo"]
    end

    subgraph Puerta_de_Enlace ["Puerta de Enlace (Gateway)"]
        AGW["API Gateway / NestJS"]
        Auth["Auth: JWT & OAuth2 / RBAC"]
    end

    subgraph Capa_de_Servicios ["Capa de Servicios"]
        MS_Usuarios["Servicio Usuarios/Roles"]
        MS_Tesis["Servicio Gestión de Tesis"]
        MS_Documentos["Servicio Versionado/Storage"]
        MS_Notificaciones["Servicio Mensajería"]
        MS_Workflow["Motor de Flujos Académicos"]
    end

    subgraph Capa_de_Datos ["Capa de Datos"]
        DB[("PostgreSQL")]
        Cache[("Redis - Sesiones/KPIs")]
    end

    subgraph Servicios_Externos ["Servicios Externos"]
        ORCID["API ORCID"]
        Plagio["Turnitin Mock API"]
        Firma["Firma Digital RENIEC/UNT"]
        Email["Servicio SMTP/SendGrid"]
    end

    Cliente_Capa --> AGW
    AGW --> Auth
    Auth --> Capa_de_Servicios
    Capa_de_Servicios --> Capa_de_Datos
    MS_Usuarios -.-> ORCID
    MS_Tesis -.-> Firma
    MS_Documentos -.-> Plagio
    MS_Notificaciones -.-> Email
```

---

## 2. Modelo de Datos Relacional (ERD)

Diseño de base de datos normalizado con soporte para auditoría completa y campos flexibles mediante JSONB en PostgreSQL.

```mermaid
erDiagram
    USUARIOS ||--o| ESTUDIANTES : "es"
    USUARIOS ||--o| ASESORES : "es"
    USUARIOS ||--o| JURADOS : "es"
    
    ESTUDIANTES ||--o{ PROYECTOS_TESIS : "registra"
    ASESORES ||--o{ PROYECTOS_TESIS : "asesora"
    
    PROYECTOS_TESIS ||--o{ ASESORIAS : "tiene"
    PROYECTOS_TESIS ||--o{ INFORMES_TESIS : "evoluciona_a"
    
    INFORMES_TESIS ||--o{ SUSTENTACIONES : "se_evalua_en"
    INFORMES_TESIS ||--o{ VERSIONES_DOCUMENTO : "contiene"
    
    SUSTENTACIONES ||--o{ JURADOS_SUSTENTACION : "integran"
    JURADOS ||--o{ JURADOS_SUSTENTACION : "participa"
    
    USUARIOS {
        uuid id PK
        string correo_institucional UK
        string password_hash
        string nombre_completo
        jsonb roles
        string orcid_id
        boolean activo
        timestamp creado_en
    }

    PROYECTOS_TESIS {
        uuid id PK
        string titulo
        text resumen
        uuid estudiante_id FK
        uuid asesor_id FK
        string estado "Borrador/En Revision/Aprobado"
        timestamp fecha_aprobacion
    }

    VERSIONES_DOCUMENTO {
        uuid id PK
        uuid documento_id FK
        string version_label "v1.0"
        string url_almacenamiento
        decimal porcentaje_similitud
        uuid subido_por FK
        timestamp creado_en
    }

    ASESORIAS {
        uuid id PK
        uuid proyecto_id FK
        timestamp fecha_hora
        text bitacora_notas
        boolean conformidad_asesor
    }
    
    SUSTENTACIONES {
        uuid id PK
        uuid informe_id FK
        timestamp fecha_programada
        string lugar_o_link
        integer nota_final
        string estado_acta "Pendiente/Aprobada"
    }
```
