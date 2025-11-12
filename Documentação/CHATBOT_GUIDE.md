# 🤖 Guía de Uso del ChatBot OpportunAI

## ✨ Mejoras Implementadas

El ChatBot ahora cuenta con una interfaz **mucho más intuitiva** basada en botones de respuesta rápida, eliminando la necesidad de recordar comandos de texto.

---

## 🎯 Características Principales

### 1. **Botones de Respuesta Rápida**
- Ya no necesitas escribir comandos
- Cada respuesta del bot incluye botones clickeables
- Navegación tipo menú con opciones claras

### 2. **Navegación por Números**
- Ver lista de oportunidades (1, 2, 3)
- Click en botones numerados para ver detalles completos
- Información detallada de cada edital o empresa

### 3. **Menú Principal**
- Siempre puedes volver al menú con el botón "🔙 Menu"
- 4 opciones principales:
  - 📋 Ver Editais
  - 🏭 Ver Empresas
  - 🔍 Buscar
  - 📊 Ver Totais

---

## 🚀 Flujo de Uso

### Inicio
```
Bot: "Olá! 👋 Sou o OpportunAI Bot..."
Botones: [📋 Ver Editais] [🏭 Ver Empresas] [🔍 Buscar] [📊 Ver Totais]
```

### Ver Editais
```
Usuario: Click en "📋 Ver Editais"
Bot: Lista los 3 mejores editais con información resumida
Botones: [1️⃣ Detalhes #1] [2️⃣ Detalhes #2] [3️⃣ Detalhes #3] [🏭 Ver Empresas] [🔙 Menu]
```

### Ver Detalles
```
Usuario: Click en "1️⃣ Detalhes #1"
Bot: Muestra información completa del edital #1
     - Título completo
     - Órgano
     - Valor
     - Ubicación
     - Plazo
     - Compatibilidad
     - Descripción
Botones: [📋 Ver Todos Editais] [🏭 Ver Empresas] [🔙 Menu]
```

### Buscar
```
Usuario: Click en "🔍 Buscar"
Bot: "Digite a palavra-chave que deseja buscar..."
Usuario: Escribe "segurança" (o cualquier palabra clave)
Bot: Muestra resultados de búsqueda
Botones: [📋 Ver Todos Editais] [🏭 Ver Todas Empresas] [🔙 Menu]
```

---

## 📊 Opciones del Menú Principal

| Botón | Acción | Resultado |
|-------|--------|-----------|
| 📋 Ver Editais | Lista editais | Muestra top 3 con botones numerados |
| 🏭 Ver Empresas | Lista empresas | Muestra top 3 con botones numerados |
| 🔍 Buscar | Buscar por palabra | Solicita palabra clave y busca |
| 📊 Ver Totais | Ver estadísticas | Muestra resumen de oportunidades |

---

## 🎨 Características de UX

### Botones Inteligentes
- **Contextuales**: Cambian según la conversación
- **Visuales**: Usan emojis para mejor identificación
- **Responsivos**: Hover effects y transiciones suaves

### Navegación Fluida
- Siempre hay opciones claras para continuar
- Botón "🔙 Menu" disponible en todo momento
- No hay callejones sin salida

### Información Progresiva
1. **Nivel 1**: Lista resumida (3 items)
2. **Nivel 2**: Detalles completos de un item
3. **Nivel 3**: Opciones para explorar más

---

## 💡 Palabras Clave de Búsqueda

El bot reconoce estas palabras clave automáticamente:
- `segurança` / `seguridad`
- `monitoramento` / `monitoreo`
- `química`
- `mineração` / `minería`
- `energia`
- `controle` / `control`

---

## 🔧 Comandos de Texto (Opcionales)

Aunque los botones son la forma recomendada, aún puedes escribir:

| Comando | Acción |
|---------|--------|
| `editais` | Ver editais |
| `empresas` | Ver empresas |
| `buscar [palabra]` | Buscar |
| `1`, `2`, `3` | Ver detalles del número |
| `menu` | Volver al menú |

---

## 🎯 Ventajas del Nuevo Sistema

### Antes (Comandos de Texto)
❌ Usuario tenía que recordar comandos  
❌ No era claro qué escribir  
❌ Posibles errores de tipeo  
❌ Curva de aprendizaje  

### Ahora (Botones de Respuesta Rápida)
✅ Todo es visual y clickeable  
✅ Opciones siempre visibles  
✅ Cero errores de tipeo  
✅ Uso inmediato sin aprendizaje  

---

## 📱 Responsive Design

Los botones se adaptan automáticamente:
- **Desktop**: Múltiples botones por fila
- **Mobile**: Se ajustan con flex-wrap
- **Tablet**: Distribución óptima

---

## 🚀 Próximas Mejoras Sugeridas

1. **Filtros Avanzados**: Botones para filtrar por ubicación, valor, etc.
2. **Favoritos**: Marcar oportunidades como favoritas
3. **Notificaciones**: Alertas de nuevas oportunidades
4. **Compartir**: Enviar oportunidades por email
5. **Historial**: Ver conversaciones anteriores

---

## 🎨 Personalización

### Colores de Botones
Los botones usan las variables de tema de Tailwind:
```css
border-primary/50      /* Borde semi-transparente */
hover:bg-primary       /* Fondo en hover */
hover:text-primary-foreground  /* Texto en hover */
```

### Tamaño y Espaciado
```css
size="sm"              /* Botón pequeño */
className="text-xs h-8"  /* Texto pequeño, altura 8 */
gap-2                  /* Espacio entre botones */
```

---

## 📚 Estructura de Datos

### Message Interface
```typescript
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickReplies?: string[];  // ← Nuevo campo
}
```

### Bot Response
```typescript
{
  text: string;              // Texto de respuesta
  quickReplies?: string[];   // Botones opcionales
}
```

---

## 🔄 Flujo de Datos

```
Usuario Click Botón
    ↓
handleQuickReply(reply)
    ↓
Agregar mensaje usuario
    ↓
generateBotResponse(reply)
    ↓
Agregar mensaje bot + botones
    ↓
Renderizar botones
```

---

## 💻 Código Clave

### Renderizar Botones
```tsx
{message.quickReplies?.map((reply, idx) => (
  <Button
    key={idx}
    onClick={() => handleQuickReply(reply)}
    variant="outline"
    size="sm"
  >
    {reply}
  </Button>
))}
```

### Generar Respuesta con Botones
```typescript
return {
  text: "Tu mensaje aquí",
  quickReplies: ["Opción 1", "Opción 2", "Opción 3"]
};
```

---

## 🎓 Tips de Uso

1. **Explora con Botones**: Usa los botones para descubrir funcionalidades
2. **Detalles Completos**: Click en números para ver información completa
3. **Vuelve al Menu**: Usa "🔙 Menu" si te pierdes
4. **Busca Específico**: Usa la búsqueda para palabras clave
5. **Texto También Funciona**: Puedes escribir si prefieres

---

**¡Disfruta de tu nuevo ChatBot intuitivo!** 🚀
