-- Extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Función para actualizar el campo actualizado_en automáticamente
CREATE OR REPLACE FUNCTION funcion_actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tabla Usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    correo_institucional VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    roles JSONB NOT NULL DEFAULT '["estudiante"]',
    orcid_id VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    creado_por UUID,
    actualizado_por UUID
);

-- Tabla Proyectos de Tesis
CREATE TABLE proyectos_tesis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo TEXT NOT NULL,
    resumen TEXT,
    estudiante_id UUID NOT NULL REFERENCES usuarios(id),
    asesor_id UUID REFERENCES usuarios(id),
    estado VARCHAR(50) DEFAULT 'borrador', -- borrador, revision, observado, aprobado
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_estado_proyecto CHECK (estado IN ('borrador', 'revision', 'observado', 'aprobado'))
);

-- Trigger de auditoría para la tabla usuarios
CREATE TRIGGER trg_actualizar_usuarios
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION funcion_actualizar_timestamp();

-- Seed Data Inicial
INSERT INTO usuarios (correo_institucional, password_hash, nombre_completo, roles)
VALUES 
('admin@unitru.edu.pe', '$2b$10$ExampleHash', 'Administrador Central UNT', '["admin", "coordinador"]');
