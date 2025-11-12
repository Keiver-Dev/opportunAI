# 🔌 Guía de Integración con Backend - OpportunAI

## 📋 Estructura de Datos para Registro

El componente **Register** ahora captura todos los datos necesarios para el perfil del usuario y está listo para conectarse con el backend.

---

## 🎯 Datos Capturados en el Registro

### Información Personal
```typescript
{
  name: string;           // Nombre completo del usuario
  email: string;          // Email (validado con regex)
  password: string;       // Contraseña (mínimo 8 caracteres)
  confirmPassword: string; // Confirmación de contraseña
}
```

### Información de la Empresa
```typescript
{
  companyName: string;    // Nombre de la empresa
  cnpj: string;          // CNPJ (14 dígitos)
  sector: string;        // Sector/industria
  phone: string;         // Teléfono de contacto
  city: string;          // Ciudad
  state: string;         // Estado (2 letras, ej: SP, RJ)
}
```

---

## 📡 Endpoint de Registro

### Request
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "password": "senha123",
  "confirmPassword": "senha123",
  "companyName": "Tech Solutions Ltda",
  "cnpj": "12.345.678/0001-99",
  "sector": "Tecnologia",
  "phone": "(11) 98765-4321",
  "city": "São Paulo",
  "state": "SP"
}
```

### Response Esperada
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "João Silva",
    "email": "joao@empresa.com",
    "companyName": "Tech Solutions Ltda",
    "cnpj": "12.345.678/0001-99",
    "sector": "Tecnologia",
    "phone": "(11) 98765-4321",
    "city": "São Paulo",
    "state": "SP"
  }
}
```

---

## ✅ Validaciones Client-Side

### Email
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Ejemplo válido: usuario@dominio.com
```

### Password
- Mínimo 8 caracteres
- Debe coincidir con confirmPassword

### CNPJ
- Debe tener exactamente 14 dígitos (sin formateo)
- Formato visual: `00.000.000/0000-00`

### State
- Máximo 2 caracteres
- Ejemplos: SP, RJ, MG, RS

### Campos Requeridos
Todos los campos son obligatorios:
- ✅ name
- ✅ email
- ✅ password
- ✅ confirmPassword
- ✅ companyName
- ✅ cnpj
- ✅ sector
- ✅ phone
- ✅ city
- ✅ state
- ✅ acceptTerms (checkbox)

---

## 🔐 Endpoint de Login

### Request
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@empresa.com",
  "password": "senha123",
  "rememberMe": true
}
```

### Response Esperada
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "João Silva",
    "email": "joao@empresa.com",
    "companyName": "Tech Solutions Ltda",
    "cnpj": "12.345.678/0001-99",
    "sector": "Tecnologia",
    "phone": "(11) 98765-4321",
    "city": "São Paulo",
    "state": "SP"
  }
}
```

---

## 💾 Almacenamiento Local

### Token Storage
```typescript
// Si rememberMe = true
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));

// Si rememberMe = false
sessionStorage.setItem("token", token);
sessionStorage.setItem("user", JSON.stringify(user));
```

### Recuperar Usuario Actual
```typescript
const user = authService.getCurrentUser();
// Retorna: User | null
```

### Verificar Autenticación
```typescript
const isAuth = authService.isAuthenticated();
// Retorna: boolean
```

---

## 🗄️ Modelo de Base de Datos Sugerido

### Tabla: users
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabla: companies
```sql
CREATE TABLE companies (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18) UNIQUE NOT NULL,
  sector VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  city VARCHAR(100),
  state VARCHAR(2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔄 Flujo de Registro

```
1. Usuario completa formulario
   ↓
2. Validación client-side
   ↓
3. POST /auth/register
   ↓
4. Backend valida datos
   ↓
5. Backend crea usuario + empresa
   ↓
6. Backend genera JWT token
   ↓
7. Backend retorna token + user
   ↓
8. Frontend guarda en storage
   ↓
9. Redirect a /login
```

---

## 🔄 Flujo de Login

```
1. Usuario ingresa credenciales
   ↓
2. Validación client-side
   ↓
3. POST /auth/login
   ↓
4. Backend valida credenciales
   ↓
5. Backend genera JWT token
   ↓
6. Backend retorna token + user (con datos de empresa)
   ↓
7. Frontend guarda en storage
   ↓
8. Redirect a /dashboard
```

---

## 🛡️ Seguridad

### Password Hashing (Backend)
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Al registrar
const passwordHash = await bcrypt.hash(password, saltRounds);

// Al hacer login
const isValid = await bcrypt.compare(password, user.passwordHash);
```

### JWT Token (Backend)
```javascript
const jwt = require('jsonwebtoken');

// Generar token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verificar token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

## 📝 Mensajes de Error

### Errores Comunes
```typescript
// Email ya existe
{
  "message": "Email already registered"
}

// CNPJ ya existe
{
  "message": "CNPJ already registered"
}

// Credenciales inválidas
{
  "message": "Invalid credentials"
}

// Token inválido/expirado
{
  "message": "Invalid or expired token"
}

// Error de servidor
{
  "message": "Internal server error"
}
```

---

## 🔧 Configuración del API Service

### Base URL
```typescript
// src/services/api.ts
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Interceptor para Token
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🧪 Ejemplo de Implementación Backend (Node.js/Express)

### Register Endpoint
```javascript
router.post('/register', async (req, res) => {
  try {
    const {
      name, email, password, confirmPassword,
      companyName, cnpj, sector, phone, city, state
    } = req.body;

    // Validaciones
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Verificar si email existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Verificar si CNPJ existe
    const existingCompany = await Company.findOne({ cnpj });
    if (existingCompany) {
      return res.status(400).json({ message: 'CNPJ already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      name,
      email,
      passwordHash
    });

    // Crear empresa
    const company = await Company.create({
      userId: user.id,
      companyName,
      cnpj,
      sector,
      phone,
      city,
      state
    });

    // Generar token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Respuesta
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        companyName: company.companyName,
        cnpj: company.cnpj,
        sector: company.sector,
        phone: company.phone,
        city: company.city,
        state: company.state
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

### Login Endpoint
```javascript
router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verificar password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Buscar empresa
    const company = await Company.findOne({ userId: user.id });

    // Generar token
    const expiresIn = rememberMe ? '30d' : '7d';
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    // Respuesta
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        companyName: company?.companyName,
        cnpj: company?.cnpj,
        sector: company?.sector,
        phone: company?.phone,
        city: company?.city,
        state: company?.state
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

---

## ✅ Checklist de Integración

### Frontend ✅
- [x] Formulario de registro completo
- [x] Validaciones client-side
- [x] authService actualizado
- [x] Interfaces TypeScript definidas
- [x] Manejo de errores
- [x] Storage de token y usuario

### Backend (Por Implementar)
- [ ] Endpoint POST /auth/register
- [ ] Endpoint POST /auth/login
- [ ] Endpoint POST /auth/logout
- [ ] Validación de datos
- [ ] Hash de contraseñas
- [ ] Generación de JWT
- [ ] Modelo de base de datos
- [ ] Middleware de autenticación
- [ ] Manejo de errores

---

## 🚀 Próximos Pasos

1. **Implementar Backend**: Crear endpoints según ejemplos
2. **Configurar Base de Datos**: Crear tablas users y companies
3. **Variables de Entorno**: Configurar JWT_SECRET y DATABASE_URL
4. **Testing**: Probar registro y login end-to-end
5. **Perfil de Usuario**: Crear página de perfil con datos capturados

---

**¡El frontend está listo para conectarse con el backend!** 🎉
