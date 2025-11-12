# 🗄️ Database - OpportunAI PostgreSQL

## 📋 Contenido

- `schema.sql` - Esquema completo de la base de datos
- `queries.sql` - Queries útiles y ejemplos
- Este README con instrucciones

---

## 🚀 Instalación Rápida

### 1. Crear la Base de Datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE opportunai;

# Conectar a la base de datos
\c opportunai

# Ejecutar el schema
\i database/schema.sql
```

### 2. Verificar Instalación

```sql
-- Ver todas las tablas
\dt

-- Ver estructura de users
\d users

-- Ver estructura de companies
\d companies
```

---

## 📊 Estructura de Tablas

### Tabla: `users`
Almacena información de autenticación del usuario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Primary key (auto-generado) |
| `name` | VARCHAR(255) | Nombre completo |
| `email` | VARCHAR(255) | Email único |
| `password_hash` | VARCHAR(255) | Hash bcrypt de la contraseña |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |
| `last_login` | TIMESTAMP | Último login |
| `is_active` | BOOLEAN | Usuario activo (default: true) |
| `email_verified` | BOOLEAN | Email verificado (default: false) |

### Tabla: `companies`
Almacena información de la empresa del usuario.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Primary key (auto-generado) |
| `user_id` | UUID | Foreign key a users (UNIQUE) |
| `company_name` | VARCHAR(255) | Nombre de la empresa |
| `cnpj` | VARCHAR(18) | CNPJ único (formato: 00.000.000/0000-00) |
| `sector` | VARCHAR(100) | Sector/industria |
| `phone` | VARCHAR(20) | Teléfono |
| `city` | VARCHAR(100) | Ciudad |
| `state` | VARCHAR(2) | Estado (SP, RJ, etc.) |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Última actualización |

### Tabla: `refresh_tokens` (Opcional)
Para manejo de refresh tokens JWT.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key a users |
| `token` | VARCHAR(500) | Refresh token |
| `expires_at` | TIMESTAMP | Fecha de expiración |
| `created_at` | TIMESTAMP | Fecha de creación |
| `revoked` | BOOLEAN | Token revocado |

### Tabla: `user_sessions` (Opcional)
Para tracking de sesiones.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key a users |
| `ip_address` | INET | Dirección IP |
| `user_agent` | TEXT | User agent del navegador |
| `login_at` | TIMESTAMP | Fecha de login |
| `logout_at` | TIMESTAMP | Fecha de logout |

---

## 🔑 Relaciones

```
users (1) ←→ (1) companies
  ↓
  └─→ (1:N) refresh_tokens
  └─→ (1:N) user_sessions
```

- Un usuario tiene **exactamente una** empresa
- Un usuario puede tener **múltiples** refresh tokens
- Un usuario puede tener **múltiples** sesiones

---

## 🛡️ Constraints y Validaciones

### Users
- ✅ Email único
- ✅ Formato de email válido (regex)
- ✅ Password hash requerido

### Companies
- ✅ Un usuario = una empresa (UNIQUE user_id)
- ✅ CNPJ único
- ✅ CNPJ debe tener 14 dígitos
- ✅ State debe ser 2 letras mayúsculas

### Cascading Deletes
- Al eliminar un usuario, se eliminan automáticamente:
  - Su empresa
  - Sus refresh tokens
  - Sus sesiones

---

## 📝 Queries Comunes

### Registro de Usuario

```sql
-- Paso 1: Insertar usuario
INSERT INTO users (name, email, password_hash)
VALUES ('João Silva', 'joao@empresa.com', '$2b$10$hashedpassword')
RETURNING id;

-- Paso 2: Insertar empresa
INSERT INTO companies (user_id, company_name, cnpj, sector, phone, city, state)
VALUES (
    'user_id_retornado',
    'Tech Solutions Ltda',
    '12.345.678/0001-99',
    'Tecnologia',
    '(11) 98765-4321',
    'São Paulo',
    'SP'
);
```

### Login

```sql
SELECT 
    u.id,
    u.name,
    u.email,
    u.password_hash,
    c.company_name,
    c.cnpj,
    c.sector,
    c.phone,
    c.city,
    c.state
FROM users u
LEFT JOIN companies c ON u.id = c.user_id
WHERE u.email = 'joao@empresa.com' AND u.is_active = true;
```

### Obtener Perfil

```sql
-- Opción 1: Query directa
SELECT * FROM users_with_companies WHERE user_id = 'user_id_aqui';

-- Opción 2: Función helper
SELECT * FROM get_user_profile('joao@empresa.com');
```

---

## 🔧 Funciones Útiles

### `update_updated_at_column()`
Actualiza automáticamente el campo `updated_at` en cada UPDATE.

### `get_user_profile(user_email)`
Retorna el perfil completo del usuario con información de la empresa.

```sql
SELECT * FROM get_user_profile('joao@empresa.com');
```

---

## 📊 Vistas

### `users_with_companies`
Vista combinada de usuarios con sus empresas.

```sql
SELECT * FROM users_with_companies;
```

Campos disponibles:
- `user_id`, `name`, `email`
- `company_id`, `company_name`, `cnpj`, `sector`
- `phone`, `city`, `state`
- Timestamps

---

## 🔐 Seguridad

### Password Hashing
```javascript
// Backend (Node.js)
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hash password
const hash = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(password, hash);
```

### JWT Tokens
```javascript
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
);
```

---

## 📈 Índices

### Índices Creados

**users:**
- `idx_users_email` - Búsqueda por email (login)
- `idx_users_created_at` - Ordenar por fecha de registro

**companies:**
- `idx_companies_user_id` - Join con users
- `idx_companies_cnpj` - Validación de CNPJ único
- `idx_companies_sector` - Filtrar por sector
- `idx_companies_state` - Filtrar por estado

**refresh_tokens:**
- `idx_refresh_tokens_user_id` - Tokens por usuario
- `idx_refresh_tokens_token` - Validar token
- `idx_refresh_tokens_expires_at` - Limpiar tokens expirados

**user_sessions:**
- `idx_user_sessions_user_id` - Sesiones por usuario
- `idx_user_sessions_login_at` - Ordenar por fecha

---

## 🧪 Testing

### Insertar Datos de Prueba

```sql
-- Usuario de prueba
INSERT INTO users (name, email, password_hash, email_verified) VALUES
('Test User', 'test@opportunai.com', '$2b$10$test', true)
RETURNING id;

-- Empresa de prueba
INSERT INTO companies (user_id, company_name, cnpj, sector, phone, city, state)
VALUES (
    'user_id_retornado',
    'Test Company',
    '11.111.111/0001-11',
    'Test Sector',
    '(11) 11111-1111',
    'Test City',
    'SP'
);
```

### Limpiar Datos de Prueba

```sql
DELETE FROM users WHERE email LIKE '%test%';
```

---

## 🔄 Migraciones

### Agregar Nueva Columna

```sql
-- Agregar columna a users
ALTER TABLE users ADD COLUMN new_field VARCHAR(100);

-- Agregar índice
CREATE INDEX idx_users_new_field ON users(new_field);
```

### Modificar Columna

```sql
-- Cambiar tipo de dato
ALTER TABLE users ALTER COLUMN name TYPE TEXT;

-- Agregar constraint
ALTER TABLE users ADD CONSTRAINT check_name_length 
    CHECK (LENGTH(name) >= 3);
```

---

## 📦 Backup y Restore

### Backup

```bash
# Backup completo
pg_dump -U postgres opportunai > backup.sql

# Backup solo schema
pg_dump -U postgres -s opportunai > schema_backup.sql

# Backup solo datos
pg_dump -U postgres -a opportunai > data_backup.sql
```

### Restore

```bash
# Restore completo
psql -U postgres opportunai < backup.sql

# Restore desde archivo comprimido
pg_restore -U postgres -d opportunai backup.dump
```

---

## 🐛 Troubleshooting

### Error: "relation does not exist"
```sql
-- Verificar que las tablas existen
\dt

-- Re-ejecutar schema.sql si es necesario
\i database/schema.sql
```

### Error: "duplicate key value"
```sql
-- Email ya existe
SELECT * FROM users WHERE email = 'email@example.com';

-- CNPJ ya existe
SELECT * FROM companies WHERE cnpj = '12.345.678/0001-99';
```

### Performance Lento
```sql
-- Analizar tabla
ANALYZE users;
ANALYZE companies;

-- Reindexar
REINDEX TABLE users;
REINDEX TABLE companies;

-- Ver queries lentas
SELECT * FROM pg_stat_activity WHERE state = 'active';
```

---

## 📚 Recursos

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [UUID Extension](https://www.postgresql.org/docs/current/uuid-ossp.html)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

## ✅ Checklist de Instalación

- [ ] PostgreSQL instalado
- [ ] Base de datos `opportunai` creada
- [ ] Extension `uuid-ossp` habilitada
- [ ] Schema ejecutado (`schema.sql`)
- [ ] Tablas verificadas (`\dt`)
- [ ] Índices verificados
- [ ] Funciones verificadas
- [ ] Datos de prueba insertados (opcional)
- [ ] Backup configurado

---

**¡Base de datos lista para OpportunAI!** 🚀
