# 🤖 Guia de Uso do ChatBot OpportunAI

## ✨ Melhorias Implementadas

O ChatBot agora conta com uma interface **muito mais intuitiva** baseada em botões de resposta rápida, eliminando a necessidade de lembrar comandos de texto.

---

## 🎯 Características Principais

### 1. **Botões de Resposta Rápida**
- Não precisa escrever comandos
- Cada resposta do bot inclui botões clicáveis
- Navegação tipo menu com opções claras

### 2. **Navegação por Números**
- Ver lista de oportunidades (1, 2, 3)
- Clicar em botões numerados para ver detalhes completos
- Informação detalhada de cada edital ou empresa

### 3. **Menu Principal**
- Sempre pode voltar ao menu com o botão "🔙 Menu"
- 4 opções principais:
  - 📋 Ver Editais
  - 🏭 Ver Empresas
  - 🔍 Buscar
  - 📊 Ver Totais

---

## 🚀 Fluxo de Uso

### Início
```
Bot: "Olá! 👋 Sou o OpportunAI Bot..."
Botões: [📋 Ver Editais] [🏭 Ver Empresas] [🔍 Buscar] [📊 Ver Totais]
```

### Ver Editais
```
Usuário: Clica em "📋 Ver Editais"
Bot: Lista os 3 melhores editais com informação resumida
Botões: [1️⃣ Detalhes #1] [2️⃣ Detalhes #2] [3️⃣ Detalhes #3] [🏭 Ver Empresas] [🔙 Menu]
```

### Ver Detalhes
```
Usuário: Clica em "1️⃣ Detalhes #1"
Bot: Mostra informação completa do edital #1
     - Título completo
     - Órgão
     - Valor
     - Localização
     - Prazo
     - Compatibilidade
     - Descrição
Botões: [📋 Ver Todos Editais] [🏭 Ver Empresas] [🔙 Menu]
```

### Buscar
```
Usuário: Clica em "🔍 Buscar"
Bot: "Digite a palavra-chave que deseja buscar..."
Usuário: Escreve "segurança" (ou qualquer palavra-chave)
Bot: Mostra resultados da busca
Botões: [📋 Ver Todos Editais] [🏭 Ver Todas Empresas] [🔙 Menu]
```

---

## 📊 Opções do Menu Principal

| Botão | Ação | Resultado |
|-------|------|-----------|
| 📋 Ver Editais | Lista editais | Mostra top 3 com botões numerados |
| 🏭 Ver Empresas | Lista empresas | Mostra top 3 com botões numerados |
| 🔍 Buscar | Buscar por palavra | Solicita palavra-chave e busca |
| 📊 Ver Totais | Ver estatísticas | Mostra resumo de oportunidades |

---

## 🎨 Características de UX

### Botões Inteligentes
- **Contextuais**: Mudam segundo a conversa
- **Visuais**: Usam emojis para melhor identificação
- **Responsivos**: Efeitos hover e transições suaves

### Navegação Fluida
- Sempre há opções claras para continuar
- Botão "🔙 Menu" disponível o tempo todo
- Não há becos sem saída

### Informação Progressiva
1. **Nível 1**: Lista resumida (3 items)
2. **Nível 2**: Detalhes completos de um item
3. **Nível 3**: Opções para explorar mais

---

## 💡 Palavras-Chave de Busca

O bot reconhece estas palavras-chave automaticamente:
- `segurança`
- `monitoramento`
- `química`
- `mineração`
- `energia`
- `controle`

---

## 🔧 Comandos de Texto (Opcionais)

Embora os botões sejam a forma recomendada, ainda pode escrever:

| Comando | Ação |
|---------|------|
| `editais` | Ver editais |
| `empresas` | Ver empresas |
| `buscar [palavra]` | Buscar |
| `1`, `2`, `3` | Ver detalhes do número |
| `menu` | Voltar ao menu |

---

## 🎯 Vantagens do Novo Sistema

### Antes (Comandos de Texto)
❌ Usuário tinha que lembrar comandos  
❌ Não era claro o que escrever  
❌ Possíveis erros de digitação  
❌ Curva de aprendizagem  

### Agora (Botões de Resposta Rápida)
✅ Tudo é visual e clicável  
✅ Opções sempre visíveis  
✅ Zero erros de digitação  
✅ Uso imediato sem aprendizagem  

---

## 📱 Design Responsivo

Os botões se adaptam automaticamente:
- **Desktop**: Múltiplos botões por linha
- **Mobile**: Se ajustam com flex-wrap
- **Tablet**: Distribuição ótima

---

## 🚀 Próximas Melhorias Sugeridas

1. **Filtros Avançados**: Botões para filtrar por localização, valor, etc.
2. **Favoritos**: Marcar oportunidades como favoritas
3. **Notificações**: Alertas de novas oportunidades
4. **Compartilhar**: Enviar oportunidades por email
5. **Histórico**: Ver conversas anteriores

---

## 🎨 Personalização

### Cores dos Botões
Os botões usam as variáveis de tema do Tailwind:
```css
border-primary/50      /* Borda semi-transparente */
hover:bg-primary       /* Fundo no hover */
hover:text-primary-foreground  /* Texto no hover */
```

### Tamanho e Espaçamento
```css
size="sm"              /* Botão pequeno */
className="text-xs h-8"  /* Texto pequeno, altura 8 */
gap-2                  /* Espaço entre botões */
```

---

## 📚 Estrutura de Dados

### Interface Message
```typescript
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickReplies?: string[];  // ← Novo campo
}
```

### Resposta do Bot
```typescript
{
  text: string;              // Texto de resposta
  quickReplies?: string[];   // Botões opcionais
}
```

---

## 🔄 Fluxo de Dados

```
Usuário Clica Botão
    ↓
handleQuickReply(reply)
    ↓
Adicionar mensagem usuário
    ↓
generateBotResponse(reply)
    ↓
Adicionar mensagem bot + botões
    ↓
Renderizar botões
```

---

## 💻 Código Chave

### Renderizar Botões
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

### Gerar Resposta com Botões
```typescript
return {
  text: "Sua mensagem aqui",
  quickReplies: ["Opção 1", "Opção 2", "Opção 3"]
};
```

---

## 🎓 Dicas de Uso

1. **Explore com Botões**: Use os botões para descobrir funcionalidades
2. **Detalhes Completos**: Clique em números para ver informação completa
3. **Volte ao Menu**: Use "🔙 Menu" se se perder
4. **Busque Específico**: Use a busca para palavras-chave
5. **Texto Também Funciona**: Pode escrever se preferir

---

**Aproveite seu novo ChatBot intuitivo!** 🚀
