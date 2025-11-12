# 🔍 Guía de Filtros y Búsqueda - Dashboard OpportunAI

## ✅ Funcionalidades Implementadas

El Dashboard ahora cuenta con un **sistema completo de filtros y búsqueda** totalmente funcional.

---

## 🎯 Características Principales

### 1. **Barra de Búsqueda**
- Busca en tiempo real mientras escribes
- Busca en múltiples campos:
  - **Editais**: Título, órgano, ubicación
  - **Empresas**: Nombre, sector, ubicación
- Case-insensitive (no distingue mayúsculas/minúsculas)

### 2. **Filtros por Categoría**

#### 📍 Localización
- Todas (sin filtro)
- São Paulo
- Rio de Janeiro
- Minas Gerais
- Santos
- Belo Horizonte
- Recife

#### 💰 Valor (Solo Editais)
- Todos (sin filtro)
- Hasta R$ 100k
- R$ 100k - R$ 500k
- Más de R$ 500k

#### ✅ Compatibilidad
- Todas (sin filtro)
- Alta (80%+)
- Media (60-80%)
- Baja (<60%)

#### 📝 Status (Solo Editais)
- Todos (sin filtro)
- Aberto
- Encerrando
- Encerrado

### 3. **Contador de Resultados**
- Muestra el número de resultados filtrados
- Se actualiza en tiempo real
- Formato: `(X resultados)`

### 4. **Estado Vacío**
- Mensaje amigable cuando no hay resultados
- Ícono visual
- Sugerencia para ajustar filtros

### 5. **Botón Limpiar Filtros**
- Aparece solo cuando hay filtros activos
- Limpia todos los filtros con un click
- Restaura vista completa

---

## 🚀 Cómo Usar

### Búsqueda Simple
```
1. Escribe en la barra de búsqueda
2. Los resultados se filtran automáticamente
3. Busca por: título, órgano, ubicación, sector, etc.
```

### Filtros Combinados
```
1. Selecciona ubicación: "São Paulo"
2. Selecciona compatibilidad: "Alta (80%+)"
3. Los filtros se aplican juntos (AND logic)
4. Solo verás oportunidades que cumplan TODOS los criterios
```

### Limpiar Filtros
```
1. Click en "Limpar Filtros"
2. Todos los filtros vuelven a "Todas/Todos"
3. Barra de búsqueda se limpia
4. Vista completa restaurada
```

---

## 💻 Lógica de Filtrado

### Editais
```typescript
filteredEditais = editais.filter(edital => {
  ✅ Coincide con búsqueda (título, órgano, ubicación)
  ✅ Coincide con ubicación seleccionada
  ✅ Valor está en el rango seleccionado
  ✅ Compatibilidad está en el rango seleccionado
  ✅ Status coincide con el seleccionado
});
```

### Empresas
```typescript
filteredEmpresas = empresas.filter(empresa => {
  ✅ Coincide con búsqueda (nombre, sector, ubicación)
  ✅ Coincide con ubicación seleccionada
  ✅ Compatibilidad está en el rango seleccionado
});
```

---

## 🎨 Estados de UI

### Con Resultados
```
📋 Oportunidades em Editais (3 resultados)

[Card 1]
[Card 2]
[Card 3]
```

### Sin Resultados
```
📋 Oportunidades em Editais (0 resultados)

┌─────────────────────────────┐
│     📄 Ícono Grande         │
│  Nenhum edital encontrado   │
│ Tente ajustar os filtros... │
└─────────────────────────────┘
```

### Con Filtros Activos
```
[Filtros aplicados]

[Botón: Limpar Filtros]  ← Aparece aquí
```

---

## 📊 Ejemplos de Uso

### Ejemplo 1: Buscar por Palabra Clave
```
Búsqueda: "segurança"
Resultado: Muestra "Fornecimento de Equipamentos de Segurança"
```

### Ejemplo 2: Filtrar por Ubicación
```
Ubicación: "Santos"
Resultado: Solo oportunidades en Santos, SP
```

### Ejemplo 3: Filtrar por Valor Alto
```
Valor: "Acima de R$ 500k"
Resultado: Solo editais con valor > R$ 500.000
```

### Ejemplo 4: Alta Compatibilidad
```
Compatibilidad: "Alta (80%+)"
Resultado: Solo oportunidades con 80% o más de compatibilidad
```

### Ejemplo 5: Combinación
```
Búsqueda: "monitoramento"
Ubicación: "Minas Gerais"
Compatibilidad: "Alta (80%+)"
Resultado: Editais de monitoramento en MG con alta compatibilidad
```

---

## 🔧 Detalles Técnicos

### Estados de React
```typescript
const [searchQuery, setSearchQuery] = useState("");
const [locationFilter, setLocationFilter] = useState<string>("all");
const [valueFilter, setValueFilter] = useState<string>("all");
const [compatibilityFilter, setCompatibilityFilter] = useState<string>("all");
const [statusFilter, setStatusFilter] = useState<string>("all");
```

### Filtrado en Tiempo Real
- Los filtros se aplican inmediatamente
- No hay botón "Aplicar" necesario
- Reactivo a cambios en cualquier filtro

### Parsing de Valores
```typescript
// Extrae números de strings como "R$ 450.000,00"
const value = parseFloat(edital.value.replace(/[^\d,]/g, '').replace(',', '.'));
```

### Búsqueda Case-Insensitive
```typescript
edital.title.toLowerCase().includes(searchQuery.toLowerCase())
```

---

## 🎯 Ventajas del Sistema

| Característica | Beneficio |
|----------------|-----------|
| **Tiempo Real** | Resultados instantáneos |
| **Multi-campo** | Busca en varios campos a la vez |
| **Combinable** | Múltiples filtros simultáneos |
| **Visual** | Contador y estados claros |
| **Reversible** | Botón para limpiar todo |
| **Responsive** | Funciona en móvil y desktop |

---

## 📱 Responsive Design

### Desktop
```
[Localización] [Valor] [Compatibilidad] [Status]
[        Barra de Búsqueda Completa        ]
```

### Mobile
```
[Localización]
[Valor]
[Compatibilidad]
[Status]
[Búsqueda]
```

---

## 🚀 Mejoras Futuras Sugeridas

1. **Filtros Avanzados**
   - Rango de fechas
   - Múltiple selección de ubicaciones
   - Ordenar por (fecha, valor, compatibilidad)

2. **Guardar Filtros**
   - Guardar combinaciones favoritas
   - Filtros predefinidos ("Más relevantes", "Urgentes", etc.)

3. **Exportar Resultados**
   - Exportar a CSV/PDF
   - Compartir filtros por URL

4. **Historial de Búsquedas**
   - Ver búsquedas recientes
   - Sugerencias basadas en historial

5. **Filtros Inteligentes**
   - Auto-sugerencias mientras escribes
   - Corrección de typos
   - Sinónimos

---

## 💡 Tips de Uso

1. **Empieza Amplio**: Usa primero la búsqueda general
2. **Refina Gradualmente**: Agrega filtros uno por uno
3. **Limpia y Reinicia**: Si no encuentras nada, limpia filtros
4. **Combina Sabiamente**: Muchos filtros = menos resultados
5. **Usa Compatibilidad**: Para ver las mejores oportunidades primero

---

## 🐛 Troubleshooting

### No veo resultados
- ✅ Verifica que los filtros no sean muy restrictivos
- ✅ Click en "Limpar Filtros"
- ✅ Intenta búsqueda más general

### El filtro no funciona
- ✅ Verifica que seleccionaste una opción válida
- ✅ Recarga la página
- ✅ Verifica que hay datos que coincidan

### Búsqueda no encuentra
- ✅ Revisa la ortografía
- ✅ Usa palabras clave más simples
- ✅ Prueba sin acentos

---

**¡Sistema de filtros completamente funcional!** 🎉
