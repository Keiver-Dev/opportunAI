# 🚀 OpportunAI - Plataforma de Oportunidades B2B

OpportunAI é uma plataforma inteligente que conecta empresas a oportunidades de editais e parcerias B2B, utilizando IA para análise de compatibilidade e recomendações personalizadas.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Backend](#backend)
- [Contribuindo](#contribuindo)

---

## 🎯 Sobre o Projeto

OpportunAI ajuda empresas a:
- 🔍 Descobrir editais e oportunidades relevantes
- 🤝 Encontrar parceiros B2B compatíveis
- 📊 Analisar compatibilidade com IA
- 💬 Interagir com ChatBot inteligente
- 📈 Gerenciar oportunidades em um dashboard

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Login e registro de usuários
- Perfil de empresa completo (CNPJ, setor, localização)
- Sessões seguras com JWT

### 📊 Dashboard
- Visualização de editais e empresas
- Filtros avançados:
  - Por localização
  - Por valor
  - Por compatibilidade
  - Por status
- Busca em tempo real
- Contador de resultados
- Estados vazios informativos

### 🤖 ChatBot Inteligente
- Respostas com botões interativos
- Navegação por números
- Busca de oportunidades
- Informações detalhadas
- Menu sempre acessível

### 🎨 Interface Moderna
- Design responsivo
- Dark mode
- Animações suaves
- Componentes shadcn/ui
- Tailwind CSS

---

## 🛠️ Tecnologias

### Frontend
- **React 18+** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router** - Navegação
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes
- **Lucide React** - Ícones
- **Axios** - HTTP client

### Backend (Recomendado)
- **Node.js** - Runtime
- **Express** - Framework
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas

---

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ e npm
- Git

### Passos

```bash
# 1. Clonar o repositório
git clone <URL_DO_REPOSITORIO>

# 2. Navegar para o diretório
cd OpportunAI_Inova25

# 3. Instalar dependências
npm install

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

---

## 🚀 Uso

### Desenvolvimento

```bash
# Iniciar servidor dev
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 📁 Estrutura do Projeto

```
OpportunAI_Inova25/
├── src/
│   ├── assets/          # Imagens, ícones
│   ├── components/      # Componentes React
│   │   ├── ui/         # Componentes shadcn/ui
│   │   └── ChatBot/    # ChatBot components
│   ├── data/           # Dados mock
│   ├── pages/          # Páginas da aplicação
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── services/       # Serviços API
│   │   ├── api.ts
│   │   └── authService.ts
│   └── lib/            # Utilitários
├── database/           # Schema PostgreSQL
│   ├── schema.sql
│   ├── queries.sql
│   └── README.md
├── public/             # Arquivos estáticos
└── docs/              # Documentação
```

---

## 🗄️ Backend

### Configuração do Banco de Dados

```bash
# 1. Criar banco de dados PostgreSQL
createdb opportunai

# 2. Executar schema
psql -d opportunai -f database/schema.sql
```

### Tabelas Principais

- **users** - Informações de autenticação
- **companies** - Dados das empresas
- **refresh_tokens** - Tokens JWT
- **user_sessions** - Histórico de sessões

Veja `database/README.md` para mais detalhes.

### Endpoints da API

```
POST /api/auth/register  - Registrar usuário
POST /api/auth/login     - Login
POST /api/auth/logout    - Logout
GET  /api/user/profile   - Obter perfil
```

Veja `BACKEND_INTEGRATION.md` para documentação completa.

---

## 📚 Documentação

- **CHATBOT_GUIDE.md** - Guia do ChatBot
- **FILTERS_GUIDE.md** - Guia de filtros
- **BACKEND_INTEGRATION.md** - Integração backend
- **MOCK_DATA_SUMMARY.md** - Dados de teste
- **database/README.md** - Banco de dados

---

## 🎨 Componentes Principais

### Login (`src/pages/Login.tsx`)
- Autenticação de usuários
- Validação de email e senha
- Opção "Lembrar-me"
- Mensagens de erro

### Register (`src/pages/Register.tsx`)
- Cadastro de usuários
- Dados pessoais e da empresa
- Layout 2 colunas
- Validação completa

### Dashboard (`src/pages/Dashboard.tsx`)
- Listagem de oportunidades
- Filtros avançados
- Busca em tempo real
- Tabs (Editais/Empresas)

### ChatBot (`src/components/ChatBot/`)
- Botões de resposta rápida
- Navegação intuitiva
- Busca inteligente
- Informações detalhadas

---

## 🧪 Dados de Teste

O projeto inclui dados mock para desenvolvimento:

- **12 Editais** - Diversos setores e valores
- **15 Empresas** - Diferentes tamanhos e localizações

Veja `src/data/mockData.ts` e `MOCK_DATA_SUMMARY.md`

---

## 🔐 Segurança

- Senhas hasheadas com bcrypt
- Tokens JWT para autenticação
- Validação client-side e server-side
- HTTPS recomendado em produção
- Proteção contra SQL injection
- Rate limiting recomendado

---

## 🌐 Deploy

### Netlify / Vercel

```bash
# Build
npm run build

# Deploy pasta dist/
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Autores

- **Equipe OpportunAI** - Desenvolvimento inicial

---

## 🙏 Agradecimentos

- shadcn/ui pelos componentes
- Lucide pelos ícones
- Comunidade React
- Todos os contribuidores

---

## 📞 Contato

- Website: [opportunai.com](https://opportunai.com)
- Email: contato@opportunai.com
- GitHub: [@opportunai](https://github.com/opportunai)

---

## 🗺️ Roadmap

- [ ] Integração com APIs de editais reais
- [ ] Sistema de notificações
- [ ] Análise de compatibilidade com IA
- [ ] Aplicativo mobile
- [ ] Relatórios e analytics
- [ ] Integração com CRM
- [ ] API pública

---

**Desenvolvido com ❤️ pela equipe OpportunAI**
