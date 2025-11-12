-- ============================================
-- OpportunAI - Queries Útiles PostgreSQL
-- ============================================

-- ============================================
-- REGISTRO DE USUARIO
-- ============================================

-- 1. Insertar nuevo usuario y empresa (Transacción)
BEGIN;

-- Insertar usuario
INSERT INTO users (name, email, password_hash)
VALUES ('João Silva', 'joao@empresa.com', '$2b$10$hashedpassword')
RETURNING id;

-- Insertar empresa (usar el id retornado arriba)
INSERT INTO companies (user_id, company_name, cnpj, sector, phone, city, state)
VALUES (
    'user_id_aqui', -- Reemplazar con el UUID retornado
    'Tech Solutions Ltda',
    '12.345.678/0001-99',
    'Tecnologia',
    '(11) 98765-4321',
    'São Paulo',
    'SP'
);

COMMIT;

-- ============================================
-- LOGIN
-- ============================================

-- 2. Buscar usuario por email (para login)
SELECT 
    u.id,
    u.name,
    u.email,
    u.password_hash,
    u.is_active,
    u.email_verified,
    c.company_name,
    c.cnpj,
    c.sector,
    c.phone,
    c.city,
    c.state
FROM users u
LEFT JOIN companies c ON u.id = c.user_id
WHERE u.email = 'joao@empresa.com' AND u.is_active = true;

-- 3. Actualizar last_login después de login exitoso
UPDATE users 
SET last_login = CURRENT_TIMESTAMP 
WHERE id = 'user_id_aqui';

-- ============================================
-- PERFIL DE USUARIO
-- ============================================

-- 4. Obtener perfil completo del usuario
SELECT 
    u.id,
    u.name,
    u.email,
    u.created_at,
    u.last_login,
    c.company_name,
    c.cnpj,
    c.sector,
    c.phone,
    c.city,
    c.state
FROM users u
LEFT JOIN companies c ON u.id = c.user_id
WHERE u.id = 'user_id_aqui';

-- 5. Usar la función helper
SELECT * FROM get_user_profile('joao@empresa.com');

-- ============================================
-- ACTUALIZAR PERFIL
-- ============================================

-- 6. Actualizar información del usuario
UPDATE users 
SET name = 'João Pedro Silva'
WHERE id = 'user_id_aqui';

-- 7. Actualizar información de la empresa
UPDATE companies 
SET 
    company_name = 'Tech Solutions S.A.',
    phone = '(11) 99999-8888',
    city = 'Campinas',
    state = 'SP'
WHERE user_id = 'user_id_aqui';

-- ============================================
-- VALIDACIONES
-- ============================================

-- 8. Verificar si email ya existe
SELECT EXISTS(
    SELECT 1 FROM users WHERE email = 'joao@empresa.com'
) as email_exists;

-- 9. Verificar si CNPJ ya existe
SELECT EXISTS(
    SELECT 1 FROM companies WHERE cnpj = '12.345.678/0001-99'
) as cnpj_exists;

-- 10. Verificar si usuario está activo
SELECT is_active FROM users WHERE id = 'user_id_aqui';

-- ============================================
-- GESTIÓN DE TOKENS
-- ============================================

-- 11. Guardar refresh token
INSERT INTO refresh_tokens (user_id, token, expires_at)
VALUES (
    'user_id_aqui',
    'refresh_token_jwt_aqui',
    CURRENT_TIMESTAMP + INTERVAL '30 days'
);

-- 12. Verificar si refresh token es válido
SELECT * FROM refresh_tokens
WHERE token = 'refresh_token_jwt_aqui'
    AND expires_at > CURRENT_TIMESTAMP
    AND revoked = false;

-- 13. Revocar refresh token (logout)
UPDATE refresh_tokens
SET revoked = true
WHERE user_id = 'user_id_aqui' AND revoked = false;

-- 14. Limpiar tokens expirados (ejecutar periódicamente)
DELETE FROM refresh_tokens
WHERE expires_at < CURRENT_TIMESTAMP OR revoked = true;

-- ============================================
-- SESIONES DE USUARIO
-- ============================================

-- 15. Registrar nueva sesión
INSERT INTO user_sessions (user_id, ip_address, user_agent)
VALUES (
    'user_id_aqui',
    '192.168.1.1'::INET,
    'Mozilla/5.0...'
);

-- 16. Cerrar sesión
UPDATE user_sessions
SET logout_at = CURRENT_TIMESTAMP
WHERE id = 'session_id_aqui';

-- 17. Ver sesiones activas del usuario
SELECT 
    id,
    ip_address,
    user_agent,
    login_at,
    logout_at
FROM user_sessions
WHERE user_id = 'user_id_aqui'
    AND logout_at IS NULL
ORDER BY login_at DESC;

-- ============================================
-- ESTADÍSTICAS Y REPORTES
-- ============================================

-- 18. Contar usuarios por sector
SELECT 
    c.sector,
    COUNT(*) as total_users
FROM companies c
JOIN users u ON c.user_id = u.id
WHERE u.is_active = true
GROUP BY c.sector
ORDER BY total_users DESC;

-- 19. Contar usuarios por estado
SELECT 
    c.state,
    COUNT(*) as total_users
FROM companies c
JOIN users u ON c.user_id = u.id
WHERE u.is_active = true
GROUP BY c.state
ORDER BY total_users DESC;

-- 20. Usuarios registrados por mes
SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as new_users
FROM users
GROUP BY month
ORDER BY month DESC;

-- 21. Últimos usuarios registrados
SELECT 
    u.name,
    u.email,
    c.company_name,
    u.created_at
FROM users u
LEFT JOIN companies c ON u.id = c.user_id
ORDER BY u.created_at DESC
LIMIT 10;

-- 22. Usuarios más activos (por last_login)
SELECT 
    u.name,
    u.email,
    c.company_name,
    u.last_login
FROM users u
LEFT JOIN companies c ON u.id = c.user_id
WHERE u.last_login IS NOT NULL
ORDER BY u.last_login DESC
LIMIT 10;

-- ============================================
-- BÚSQUEDAS
-- ============================================

-- 23. Buscar usuarios por nombre o email
SELECT 
    u.id,
    u.name,
    u.email,
    c.company_name
FROM users u
LEFT JOIN companies c ON u.id = c.user_id
WHERE u.name ILIKE '%silva%' 
    OR u.email ILIKE '%silva%'
    OR c.company_name ILIKE '%silva%';

-- 24. Buscar empresas por sector
SELECT 
    u.name,
    u.email,
    c.company_name,
    c.sector,
    c.city,
    c.state
FROM companies c
JOIN users u ON c.user_id = u.id
WHERE c.sector ILIKE '%tecnologia%'
    AND u.is_active = true;

-- 25. Buscar empresas por ubicación
SELECT 
    u.name,
    u.email,
    c.company_name,
    c.city,
    c.state
FROM companies c
JOIN users u ON c.user_id = u.id
WHERE c.state = 'SP' AND c.city ILIKE '%são paulo%'
    AND u.is_active = true;

-- ============================================
-- MANTENIMIENTO
-- ============================================

-- 26. Desactivar usuario (soft delete)
UPDATE users 
SET is_active = false 
WHERE id = 'user_id_aqui';

-- 27. Reactivar usuario
UPDATE users 
SET is_active = true 
WHERE id = 'user_id_aqui';

-- 28. Eliminar usuario permanentemente (con CASCADE)
DELETE FROM users WHERE id = 'user_id_aqui';

-- 29. Limpiar sesiones antiguas (más de 90 días)
DELETE FROM user_sessions
WHERE login_at < CURRENT_TIMESTAMP - INTERVAL '90 days';

-- 30. Ver tamaño de las tablas
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================
-- BACKUP Y RESTORE
-- ============================================

-- 31. Exportar usuarios a CSV (desde psql)
-- \copy (SELECT * FROM users_with_companies) TO '/path/to/users_backup.csv' CSV HEADER;

-- 32. Importar usuarios desde CSV (desde psql)
-- \copy users(name, email, password_hash) FROM '/path/to/users.csv' CSV HEADER;

-- ============================================
-- ÍNDICES Y PERFORMANCE
-- ============================================

-- 33. Ver índices de una tabla
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'users';

-- 34. Analizar uso de índices
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- 35. Ver queries lentas (requiere pg_stat_statements)
-- SELECT 
--     query,
--     calls,
--     total_time,
--     mean_time,
--     max_time
-- FROM pg_stat_statements
-- ORDER BY mean_time DESC
-- LIMIT 10;
