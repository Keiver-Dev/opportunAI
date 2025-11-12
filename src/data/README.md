# 📊 Mock Data - OpportunAI

Este directorio contiene los datos mock (simulados) utilizados por la aplicación OpportunAI.

## 📁 Archivos

### `mockData.ts`

Contiene los datos simulados de:
- **Editais** (Licitaciones públicas)
- **Empresas** (Oportunidades B2B)

## 🤖 Integración con ChatBot

El ChatBot utiliza estos datos para responder preguntas sobre oportunidades disponibles.

### Comandos disponibles:

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `editais` | Lista los mejores editais | "Muéstrame los editais" |
| `empresas` | Lista las mejores empresas | "Quiero ver empresas" |
| `buscar [palabra]` | Busca por palabra clave | "Buscar segurança" |
| `quantas` | Muestra totales | "Cuántas oportunidades hay?" |
| `ajuda` | Muestra ayuda | "ajuda" |

### Funciones Helper:

```typescript
// Buscar editais por palabra clave
searchEditais(query: string): Edital[]

// Buscar empresas por palabra clave
searchEmpresas(query: string): Empresa[]

// Obtener top editais por compatibilidad
getTopEditais(limit: number): Edital[]

// Obtener top empresas por compatibilidad
getTopEmpresas(limit: number): Empresa[]

// Obtener edital por ID
getEditalById(id: number): Edital | undefined

// Obtener empresa por ID
getEmpresaById(id: number): Empresa | undefined
```

## 🔄 Uso en componentes

### Dashboard
```typescript
import { mockEditais, mockEmpresas } from "@/data/mockData";

// Usar directamente los arrays
mockEditais.map(edital => ...)
mockEmpresas.map(empresa => ...)
```

### ChatBot
```typescript
import { 
  searchEditais, 
  searchEmpresas, 
  getTopEditais 
} from "@/data/mockData";

// Buscar oportunidades
const results = searchEditais("segurança");

// Obtener mejores oportunidades
const top = getTopEditais(3);
```

## 📝 Estructura de Datos

### Edital
```typescript
interface Edital {
  id: number;
  title: string;
  organ: string;
  value: string;
  deadline: string;
  location: string;
  compatibility: number;
  status: string;
  description?: string;
}
```

### Empresa
```typescript
interface Empresa {
  id: number;
  name: string;
  sector: string;
  location: string;
  compatibility: number;
  potential: string;
  employees: string;
  description?: string;
}
```

## 🚀 Próximos pasos

Cuando conectes con el backend real:

1. Reemplaza las importaciones de `mockData` con llamadas a tu API
2. Mantén las mismas interfaces para compatibilidad
3. Actualiza las funciones helper para usar el backend
4. El ChatBot seguirá funcionando sin cambios mayores

## 💡 Tips

- Los datos mock incluyen descripciones para búsquedas más ricas
- La compatibilidad está en porcentaje (0-100)
- Las funciones de búsqueda son case-insensitive
- Puedes agregar más datos mock siguiendo el mismo formato
