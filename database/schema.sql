-- ============================================
-- OpportunAI - PostgreSQL Database Schema
-- ============================================

-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Tabla: users
-- Almacena información de autenticación del usuario
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false
);

-- Índices para users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================
-- Tabla: companies
-- Almacena información de la empresa del usuario
-- ============================================
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    sector VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Índices para companies
CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_companies_cnpj ON companies(cnpj);
CREATE INDEX idx_companies_sector ON companies(sector);
CREATE INDEX idx_companies_state ON companies(state);

-- ============================================
-- Tabla: refresh_tokens (Opcional)
-- Para manejo de refresh tokens JWT
-- ============================================
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    revoked BOOLEAN DEFAULT false,
    CONSTRAINT fk_user_token
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Índices para refresh_tokens
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

-- ============================================
-- Función: update_updated_at_column
-- Actualiza automáticamente el campo updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- Triggers para updated_at
-- ============================================
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at 
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Tabla: user_sessions (Opcional)
-- Para tracking de sesiones de usuario
-- ============================================
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    ip_address INET,
    user_agent TEXT,
    login_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    logout_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_user_session
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Índices para user_sessions
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_login_at ON user_sessions(login_at);

-- ============================================
-- Comentarios en las tablas
-- ============================================
COMMENT ON TABLE users IS 'Tabla principal de usuarios con información de autenticación';
COMMENT ON TABLE companies IS 'Información de empresas asociadas a usuarios';
COMMENT ON TABLE refresh_tokens IS 'Tokens de refresco para autenticación JWT';
COMMENT ON TABLE user_sessions IS 'Historial de sesiones de usuario';

COMMENT ON COLUMN users.password_hash IS 'Hash bcrypt de la contraseña del usuario';
COMMENT ON COLUMN users.email_verified IS 'Indica si el email ha sido verificado';
COMMENT ON COLUMN companies.cnpj IS 'CNPJ de la empresa (formato: 00.000.000/0000-00)';
COMMENT ON COLUMN companies.state IS 'Código de estado de Brasil (2 letras: SP, RJ, etc.)';

-- ============================================
-- Datos de ejemplo (Opcional - Solo para desarrollo)
-- ============================================
-- Descomenta para insertar datos de prueba

/*
-- Usuario de prueba (password: "password123")
INSERT INTO users (name, email, password_hash, email_verified) VALUES
('João Silva', 'joao@test.com', '$2b$10$YourHashedPasswordHere', true);

-- Empresa de prueba
INSERT INTO companies (user_id, company_name, cnpj, sector, phone, city, state) VALUES
((SELECT id FROM users WHERE email = 'joao@test.com'), 
 'Tech Solutions Ltda', 
 '12.345.678/0001-99', 
 'Tecnologia', 
 '(11) 98765-4321', 
 'São Paulo', 
 'SP');
*/

-- ============================================
-- Vista: users_with_companies
-- Vista combinada de usuarios con sus empresas
-- ============================================
CREATE OR REPLACE VIEW users_with_companies AS
SELECT 
    u.id as user_id,
    u.name,
    u.email,
    u.created_at as user_created_at,
    u.last_login,
    u.is_active,
    u.email_verified,
    c.id as company_id,
    c.company_name,
    c.cnpj,
    c.sector,
    c.phone,
    c.city,
    c.state,
    c.created_at as company_created_at
FROM users u
LEFT JOIN companies c ON u.id = c.user_id;

-- ============================================
-- Función: get_user_profile
-- Obtiene el perfil completo del usuario
-- ============================================
CREATE OR REPLACE FUNCTION get_user_profile(user_email VARCHAR)
RETURNS TABLE (
    user_id UUID,
    name VARCHAR,
    email VARCHAR,
    company_name VARCHAR,
    cnpj VARCHAR,
    sector VARCHAR,
    phone VARCHAR,
    city VARCHAR,
    state VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.name,
        u.email,
        c.company_name,
        c.cnpj,
        c.sector,
        c.phone,
        c.city,
        c.state
    FROM users u
    LEFT JOIN companies c ON u.id = c.user_id
    WHERE u.email = user_email AND u.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Verificación de integridad
-- ============================================
-- Verifica que un usuario no pueda tener múltiples empresas
ALTER TABLE companies ADD CONSTRAINT unique_user_company UNIQUE (user_id);

-- Verifica formato de email básico
ALTER TABLE users ADD CONSTRAINT check_email_format 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Verifica longitud de CNPJ (con o sin formateo)
ALTER TABLE companies ADD CONSTRAINT check_cnpj_length 
    CHECK (LENGTH(REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', '')) = 14);

-- Verifica código de estado (2 letras mayúsculas)
ALTER TABLE companies ADD CONSTRAINT check_state_format 
    CHECK (state ~* '^[A-Z]{2}$');

-- ============================================
-- Permisos (Ajustar según tu configuración)
-- ============================================
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO your_app_user;
-- GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO your_app_user;
