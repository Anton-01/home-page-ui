-- ============================================
-- ESQUEMA DE BASE DE DATOS POSTGRESQL
-- Sistema de Panel de Comunicación Empresarial
-- ============================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TIPOS ENUMERADOS
-- ============================================

-- Roles de usuario
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'user');

-- Estados de registro
CREATE TYPE record_status AS ENUM ('active', 'inactive', 'pending', 'suspended');

-- Tipos de módulo/item del dashboard
CREATE TYPE module_type AS ENUM ('link', 'modal', 'external');

-- ============================================
-- TABLA: EMPRESAS
-- ============================================
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    tax_id VARCHAR(50), -- RFC en México
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    website VARCHAR(255),
    status record_status DEFAULT 'active',
    max_admins INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,

    CONSTRAINT companies_name_check CHECK (char_length(name) >= 2)
);

-- Índices para empresas
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_deleted_at ON companies(deleted_at);

-- ============================================
-- TABLA: CONFIGURACIÓN DE EMPRESA (BRANDING)
-- ============================================
CREATE TABLE company_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

    -- Configuración de Logo
    logo_url VARCHAR(500),
    logo_width INTEGER DEFAULT 80,
    logo_height INTEGER DEFAULT 80,
    logo_mime_type VARCHAR(100),
    logo_file_size INTEGER,
    logo_original_name VARCHAR(255),

    -- Favicon
    favicon_url VARCHAR(500),

    -- Colores del tema
    primary_color VARCHAR(7) DEFAULT '#c9a227',      -- Color dorado (gold)
    secondary_color VARCHAR(7) DEFAULT '#0a1744',    -- Azul oscuro
    accent_color VARCHAR(7) DEFAULT '#f59e0b',       -- Naranja
    background_color VARCHAR(7) DEFAULT '#0d1b4c',   -- Fondo
    text_color VARCHAR(7) DEFAULT '#ffffff',         -- Texto
    error_color VARCHAR(7) DEFAULT '#ef4444',        -- Error
    success_color VARCHAR(7) DEFAULT '#10b981',      -- Éxito
    warning_color VARCHAR(7) DEFAULT '#f59e0b',      -- Advertencia
    module_bg_color VARCHAR(7) DEFAULT '#1a3a8f',    -- Fondo de módulos
    module_hover_color VARCHAR(7) DEFAULT '#2548a8', -- Hover de módulos

    -- Configuración adicional
    header_title VARCHAR(255),
    footer_text VARCHAR(500),
    show_calendar BOOLEAN DEFAULT true,
    show_news_ticker BOOLEAN DEFAULT true,
    show_contacts BOOLEAN DEFAULT true,

    -- SEO
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT company_configurations_company_unique UNIQUE (company_id)
);

-- Índice para configuración de empresa
CREATE INDEX idx_company_configurations_company_id ON company_configurations(company_id);

-- ============================================
-- TABLA: USUARIOS
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

    -- Datos personales
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hash con bcrypt
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    phone VARCHAR(50),
    avatar_url VARCHAR(500),

    -- Rol y permisos
    role user_role DEFAULT 'user',

    -- Estado
    status record_status DEFAULT 'pending',
    email_verified_at TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,

    -- Tokens
    remember_token VARCHAR(100),
    password_reset_token VARCHAR(255),
    password_reset_expires_at TIMESTAMP WITH TIME ZONE,
    email_verification_token VARCHAR(255),

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,

    -- Restricciones
    CONSTRAINT users_email_company_unique UNIQUE (email, company_id),
    CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Índices para usuarios
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_deleted_at ON users(deleted_at);

-- ============================================
-- TABLA: SESIONES DE USUARIO
-- ============================================
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT user_sessions_token_unique UNIQUE (token)
);

-- Índices para sesiones
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(token);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);

-- ============================================
-- TABLA: MÓDULOS/ITEMS DEL DASHBOARD
-- ============================================
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

    -- Configuración del módulo
    label VARCHAR(255) NOT NULL,
    description TEXT,
    type module_type DEFAULT 'link',
    url VARCHAR(500),
    target VARCHAR(20) DEFAULT '_self', -- _self, _blank
    modal_id VARCHAR(100),

    -- Ícono (SVG o clase de ícono)
    icon TEXT NOT NULL,
    icon_type VARCHAR(20) DEFAULT 'svg', -- svg, class, image

    -- Apariencia
    highlight VARCHAR(7), -- Color de resaltado
    background_color VARCHAR(7),
    is_featured BOOLEAN DEFAULT false,

    -- Orden y organización
    sort_order INTEGER DEFAULT 0,
    group_name VARCHAR(100),

    -- Estado
    status record_status DEFAULT 'active',

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

-- Índices para módulos
CREATE INDEX idx_modules_company_id ON modules(company_id);
CREATE INDEX idx_modules_status ON modules(status);
CREATE INDEX idx_modules_sort_order ON modules(sort_order);
CREATE INDEX idx_modules_deleted_at ON modules(deleted_at);

-- ============================================
-- TABLA: EVENTOS DEL CALENDARIO
-- ============================================
CREATE TABLE calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

    -- Datos del evento
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,

    -- Fecha y hora
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    is_all_day BOOLEAN DEFAULT false,

    -- Recurrencia
    is_recurring BOOLEAN DEFAULT false,
    recurrence_rule VARCHAR(255), -- Formato iCal RRULE

    -- Apariencia
    color VARCHAR(7) DEFAULT '#c9a227',
    icon VARCHAR(100),

    -- Estado
    status record_status DEFAULT 'active',

    -- Metadatos
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

-- Índices para eventos
CREATE INDEX idx_calendar_events_company_id ON calendar_events(company_id);
CREATE INDEX idx_calendar_events_event_date ON calendar_events(event_date);
CREATE INDEX idx_calendar_events_status ON calendar_events(status);
CREATE INDEX idx_calendar_events_deleted_at ON calendar_events(deleted_at);

-- ============================================
-- TABLA: NOTICIAS (CINTILLO)
-- ============================================
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

    -- Contenido
    text TEXT NOT NULL,
    url VARCHAR(500),

    -- Programación
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMP WITH TIME ZONE,

    -- Orden y prioridad
    sort_order INTEGER DEFAULT 0,
    is_priority BOOLEAN DEFAULT false,

    -- Estado
    status record_status DEFAULT 'active',

    -- Metadatos
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

-- Índices para noticias
CREATE INDEX idx_news_company_id ON news(company_id);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_starts_at ON news(starts_at);
CREATE INDEX idx_news_ends_at ON news(ends_at);
CREATE INDEX idx_news_deleted_at ON news(deleted_at);

-- ============================================
-- TABLA: CONTACTOS/DIRECTORIO
-- ============================================
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

    -- Datos del contacto
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    department VARCHAR(255),
    position VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    extension VARCHAR(20),
    mobile VARCHAR(50),

    -- Avatar
    avatar_url VARCHAR(500),

    -- Orden
    sort_order INTEGER DEFAULT 0,

    -- Estado
    status record_status DEFAULT 'active',

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

-- Índices para contactos
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
CREATE INDEX idx_contacts_department ON contacts(department);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_deleted_at ON contacts(deleted_at);

-- ============================================
-- TABLA: IMÁGENES DEL BANNER
-- ============================================
CREATE TABLE banner_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

    -- Archivo
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),

    -- Metadatos de imagen
    original_name VARCHAR(255),
    mime_type VARCHAR(100),
    file_size INTEGER,
    width INTEGER,
    height INTEGER,

    -- Link opcional
    link_url VARCHAR(500),
    link_target VARCHAR(20) DEFAULT '_self',

    -- Orden y estado
    sort_order INTEGER DEFAULT 0,
    status record_status DEFAULT 'active',

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

-- Índices para banner
CREATE INDEX idx_banner_images_company_id ON banner_images(company_id);
CREATE INDEX idx_banner_images_status ON banner_images(status);
CREATE INDEX idx_banner_images_deleted_at ON banner_images(deleted_at);

-- ============================================
-- TABLA: LOG DE ACTIVIDAD
-- ============================================
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    -- Acción
    action VARCHAR(100) NOT NULL, -- login, logout, create, update, delete, etc.
    entity_type VARCHAR(100), -- users, modules, news, etc.
    entity_id UUID,

    -- Detalles
    description TEXT,
    old_values JSONB,
    new_values JSONB,

    -- Contexto
    ip_address VARCHAR(45),
    user_agent TEXT,

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para logs
CREATE INDEX idx_activity_logs_company_id ON activity_logs(company_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_entity_type ON activity_logs(entity_type);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- ============================================
-- TABLA: TOKENS DE PASSWORD RESET
-- ============================================
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para tokens
CREATE INDEX idx_password_reset_tokens_email ON password_reset_tokens(email);
CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);

-- ============================================
-- TABLA: CONFIGURACIÓN DE CACHÉ
-- ============================================
CREATE TABLE cache_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,

    -- Configuración de TTL (en segundos)
    modules_ttl INTEGER DEFAULT 600,      -- 10 minutos
    contacts_ttl INTEGER DEFAULT 600,     -- 10 minutos
    events_ttl INTEGER DEFAULT 600,       -- 10 minutos
    news_ttl INTEGER DEFAULT 60,          -- 1 minuto (más frecuente por cambios)
    banner_ttl INTEGER DEFAULT 600,       -- 10 minutos
    config_ttl INTEGER DEFAULT 3600,      -- 1 hora

    -- Metadatos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT cache_settings_company_unique UNIQUE (company_id)
);

-- ============================================
-- FUNCIONES Y TRIGGERS
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_configurations_updated_at BEFORE UPDATE ON company_configurations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON calendar_events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banner_images_updated_at BEFORE UPDATE ON banner_images
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cache_settings_updated_at BEFORE UPDATE ON cache_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCIÓN: Verificar límite de admins por empresa
-- ============================================
CREATE OR REPLACE FUNCTION check_admin_limit()
RETURNS TRIGGER AS $$
DECLARE
    admin_count INTEGER;
    max_admins INTEGER;
BEGIN
    IF NEW.role IN ('super_admin', 'admin') AND NEW.deleted_at IS NULL THEN
        -- Contar admins actuales
        SELECT COUNT(*) INTO admin_count
        FROM users
        WHERE company_id = NEW.company_id
          AND role IN ('super_admin', 'admin')
          AND deleted_at IS NULL
          AND id != COALESCE(NEW.id, uuid_nil());

        -- Obtener límite
        SELECT c.max_admins INTO max_admins
        FROM companies c
        WHERE c.id = NEW.company_id;

        IF admin_count >= max_admins THEN
            RAISE EXCEPTION 'Se ha alcanzado el límite máximo de administradores (%) para esta empresa', max_admins;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_admin_limit_trigger
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION check_admin_limit();

-- ============================================
-- FUNCIÓN: Verificar que existe un super_admin por empresa
-- ============================================
CREATE OR REPLACE FUNCTION ensure_super_admin()
RETURNS TRIGGER AS $$
DECLARE
    super_admin_count INTEGER;
BEGIN
    IF OLD.role = 'super_admin' AND (NEW.role != 'super_admin' OR NEW.deleted_at IS NOT NULL) THEN
        SELECT COUNT(*) INTO super_admin_count
        FROM users
        WHERE company_id = OLD.company_id
          AND role = 'super_admin'
          AND deleted_at IS NULL
          AND id != OLD.id;

        IF super_admin_count = 0 THEN
            RAISE EXCEPTION 'No se puede eliminar o cambiar el rol del único super administrador de la empresa';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_super_admin_trigger
BEFORE UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION ensure_super_admin();

-- ============================================
-- VISTAS
-- ============================================

-- Vista de usuarios activos con información de empresa
CREATE OR REPLACE VIEW v_active_users AS
SELECT
    u.id,
    u.email,
    u.name,
    u.last_name,
    u.role,
    u.status,
    u.last_login_at,
    c.id as company_id,
    c.name as company_name,
    c.slug as company_slug
FROM users u
INNER JOIN companies c ON u.company_id = c.id
WHERE u.deleted_at IS NULL
  AND u.status = 'active'
  AND c.deleted_at IS NULL;

-- Vista de noticias activas (para el cintillo)
CREATE OR REPLACE VIEW v_active_news AS
SELECT
    n.id,
    n.company_id,
    n.text,
    n.url,
    n.is_priority,
    n.sort_order
FROM news n
WHERE n.deleted_at IS NULL
  AND n.status = 'active'
  AND (n.starts_at IS NULL OR n.starts_at <= CURRENT_TIMESTAMP)
  AND (n.ends_at IS NULL OR n.ends_at >= CURRENT_TIMESTAMP)
ORDER BY n.is_priority DESC, n.sort_order ASC;

-- Vista de eventos del mes actual
CREATE OR REPLACE VIEW v_current_month_events AS
SELECT
    e.id,
    e.company_id,
    e.title,
    e.description,
    e.content,
    e.event_date,
    e.start_time,
    e.end_time,
    e.is_all_day,
    e.color,
    EXTRACT(DAY FROM e.event_date) as day
FROM calendar_events e
WHERE e.deleted_at IS NULL
  AND e.status = 'active'
  AND EXTRACT(MONTH FROM e.event_date) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM e.event_date) = EXTRACT(YEAR FROM CURRENT_DATE);

-- ============================================
-- COMENTARIOS DE DOCUMENTACIÓN
-- ============================================

COMMENT ON TABLE companies IS 'Tabla principal de empresas/organizaciones';
COMMENT ON TABLE company_configurations IS 'Configuración visual y de branding por empresa';
COMMENT ON TABLE users IS 'Usuarios del sistema con roles y permisos';
COMMENT ON TABLE user_sessions IS 'Sesiones activas de usuarios';
COMMENT ON TABLE modules IS 'Módulos/items del dashboard configurables por empresa';
COMMENT ON TABLE calendar_events IS 'Eventos del calendario por empresa';
COMMENT ON TABLE news IS 'Noticias para el cintillo informativo';
COMMENT ON TABLE contacts IS 'Directorio de contactos por empresa';
COMMENT ON TABLE banner_images IS 'Imágenes del banner/slider principal';
COMMENT ON TABLE activity_logs IS 'Log de actividades para auditoría';
COMMENT ON TABLE cache_settings IS 'Configuración de caché por empresa';

COMMENT ON COLUMN users.role IS 'super_admin: único por empresa, admin: hasta 5 por empresa, user: ilimitado';
COMMENT ON COLUMN companies.max_admins IS 'Límite de administradores (super_admin + admin) por empresa, default 5';
COMMENT ON COLUMN news.starts_at IS 'Fecha/hora de inicio de publicación';
COMMENT ON COLUMN news.ends_at IS 'Fecha/hora de fin de publicación (null = indefinido)';
