/**
 * Mock data for OpportunAI
 * Contains sample data for editais (public tenders) and empresas (companies)
 */

export interface Edital {
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

export interface Empresa {
  id: number;
  name: string;
  sector: string;
  location: string;
  compatibility: number;
  potential: string;
  employees: string;
  description?: string;
}

export const mockEditais: Edital[] = [
  {
    id: 1,
    title: "Fornecimento de Equipamentos de Segurança",
    organ: "Petrobrás - Unidade Santos",
    value: "R$ 450.000,00",
    deadline: "15/12/2024",
    location: "Santos, SP",
    compatibility: 95,
    status: "Aberto",
    description: "Licitação para fornecimento de equipamentos de proteção individual e coletiva para operações offshore."
  },
  {
    id: 2,
    title: "Contratação de Serviços de Monitoramento",
    organ: "Vale S.A. - Minas Gerais",
    value: "R$ 680.000,00",
    deadline: "20/12/2024",
    location: "Belo Horizonte, MG",
    compatibility: 88,
    status: "Aberto",
    description: "Serviços de monitoramento ambiental e segurança para operações de mineração."
  },
  {
    id: 3,
    title: "Aquisição de Sistemas de Controle de Acesso",
    organ: "Governo do Estado de São Paulo",
    value: "R$ 320.000,00",
    deadline: "10/01/2025",
    location: "São Paulo, SP",
    compatibility: 82,
    status: "Aberto",
    description: "Sistema integrado de controle de acesso e segurança para prédios públicos."
  },
  {
    id: 4,
    title: "Implementação de Sistema de Gestão Ambiental",
    organ: "Prefeitura Municipal do Rio de Janeiro",
    value: "R$ 890.000,00",
    deadline: "05/01/2025",
    location: "Rio de Janeiro, RJ",
    compatibility: 91,
    status: "Aberto",
    description: "Desenvolvimento e implementação de sistema de gestão ambiental integrado para monitoramento de áreas de preservação."
  },
  {
    id: 5,
    title: "Fornecimento de Equipamentos de Combate a Incêndio",
    organ: "Corpo de Bombeiros - São Paulo",
    value: "R$ 275.000,00",
    deadline: "28/12/2024",
    location: "São Paulo, SP",
    compatibility: 78,
    status: "Aberto",
    description: "Aquisição de equipamentos modernos de combate a incêndio e resgate para unidades da capital."
  },
  {
    id: 6,
    title: "Serviços de Consultoria em Segurança Industrial",
    organ: "Braskem S.A.",
    value: "R$ 520.000,00",
    deadline: "18/01/2025",
    location: "São Paulo, SP",
    compatibility: 93,
    status: "Aberto",
    description: "Consultoria especializada em segurança industrial e prevenção de acidentes para plantas químicas."
  },
  {
    id: 7,
    title: "Instalação de Câmeras de Segurança",
    organ: "Prefeitura de Belo Horizonte",
    value: "R$ 180.000,00",
    deadline: "22/12/2024",
    location: "Belo Horizonte, MG",
    compatibility: 85,
    status: "Aberto",
    description: "Instalação de sistema de videomonitoramento em áreas públicas da cidade."
  },
  {
    id: 8,
    title: "Modernização de Sistema de Alarmes",
    organ: "Banco Central do Brasil",
    value: "R$ 650.000,00",
    deadline: "30/01/2025",
    location: "Brasília, DF",
    compatibility: 72,
    status: "Aberto",
    description: "Atualização completa do sistema de alarmes e detecção de intrusão nas sedes regionais."
  },
  {
    id: 9,
    title: "Treinamento em Segurança do Trabalho",
    organ: "Embraer S.A.",
    value: "R$ 95.000,00",
    deadline: "12/12/2024",
    location: "São José dos Campos, SP",
    compatibility: 68,
    status: "Encerrando",
    description: "Programa de treinamento e capacitação em segurança do trabalho para equipes de produção."
  },
  {
    id: 10,
    title: "Sistema de Controle de Acesso Biométrico",
    organ: "Tribunal de Justiça de São Paulo",
    value: "R$ 420.000,00",
    deadline: "25/01/2025",
    location: "São Paulo, SP",
    compatibility: 89,
    status: "Aberto",
    description: "Implementação de sistema de controle de acesso biométrico em fóruns da capital e região metropolitana."
  },
  {
    id: 11,
    title: "Auditoria de Segurança Cibernética",
    organ: "Caixa Econômica Federal",
    value: "R$ 780.000,00",
    deadline: "15/02/2025",
    location: "Brasília, DF",
    compatibility: 76,
    status: "Aberto",
    description: "Auditoria completa de segurança cibernética e testes de penetração em sistemas críticos."
  },
  {
    id: 12,
    title: "Fornecimento de EPIs para Construção Civil",
    organ: "Construtora Andrade Gutierrez",
    value: "R$ 340.000,00",
    deadline: "08/01/2025",
    location: "Belo Horizonte, MG",
    compatibility: 81,
    status: "Aberto",
    description: "Fornecimento contínuo de equipamentos de proteção individual para obras em andamento."
  }
];

export const mockEmpresas: Empresa[] = [
  {
    id: 1,
    name: "Indústria Química Braskem",
    sector: "Química e Petroquímica",
    location: "São Paulo, SP",
    compatibility: 92,
    potential: "Alto",
    employees: "5000+",
    description: "Líder em produção de resinas termoplásticas e produtos químicos básicos."
  },
  {
    id: 2,
    name: "Mineradora Brasil S.A.",
    sector: "Mineração",
    location: "Minas Gerais",
    compatibility: 87,
    potential: "Médio-Alto",
    employees: "2000-5000",
    description: "Empresa de mineração com foco em extração de minério de ferro e metais preciosos."
  },
  {
    id: 3,
    name: "Usina Energética do Nordeste",
    sector: "Energia",
    location: "Recife, PE",
    compatibility: 79,
    potential: "Médio",
    employees: "1000-2000",
    description: "Geração e distribuição de energia renovável, com foco em energia eólica e solar."
  },
  {
    id: 4,
    name: "Petroquímica Triunfo",
    sector: "Química e Petroquímica",
    location: "Rio Grande do Sul",
    compatibility: 88,
    potential: "Alto",
    employees: "3000-5000",
    description: "Produção de produtos petroquímicos básicos e intermediários para indústria nacional."
  },
  {
    id: 5,
    name: "Construtora Camargo Corrêa",
    sector: "Construção Civil",
    location: "São Paulo, SP",
    compatibility: 84,
    potential: "Alto",
    employees: "5000+",
    description: "Uma das maiores construtoras do Brasil, atuando em infraestrutura e construção pesada."
  },
  {
    id: 6,
    name: "Siderúrgica Nacional",
    sector: "Metalurgia e Siderurgia",
    location: "Rio de Janeiro, RJ",
    compatibility: 90,
    potential: "Alto",
    employees: "5000+",
    description: "Produção de aço e produtos siderúrgicos para diversos setores industriais."
  },
  {
    id: 7,
    name: "Refinaria Petróleo Sul",
    sector: "Petróleo e Gás",
    location: "Santos, SP",
    compatibility: 95,
    potential: "Alto",
    employees: "2000-5000",
    description: "Refinaria de petróleo com foco em produtos derivados de alta qualidade."
  },
  {
    id: 8,
    name: "Indústria Farmacêutica BioMed",
    sector: "Farmacêutico",
    location: "São Paulo, SP",
    compatibility: 73,
    potential: "Médio",
    employees: "1000-2000",
    description: "Desenvolvimento e produção de medicamentos genéricos e de marca."
  },
  {
    id: 9,
    name: "Celulose Fibra Brasil",
    sector: "Papel e Celulose",
    location: "Minas Gerais",
    compatibility: 81,
    potential: "Médio-Alto",
    employees: "2000-5000",
    description: "Produção de celulose e papel para mercado nacional e exportação."
  },
  {
    id: 10,
    name: "Alimentos Processados Nacional",
    sector: "Alimentos e Bebidas",
    location: "São Paulo, SP",
    compatibility: 69,
    potential: "Médio",
    employees: "3000-5000",
    description: "Processamento e distribuição de alimentos industrializados em larga escala."
  },
  {
    id: 11,
    name: "Tecnologia Industrial Avançada",
    sector: "Tecnologia",
    location: "Campinas, SP",
    compatibility: 86,
    potential: "Alto",
    employees: "500-1000",
    description: "Desenvolvimento de soluções tecnológicas para automação industrial e IoT."
  },
  {
    id: 12,
    name: "Transportadora LogBrasil",
    sector: "Logística e Transporte",
    location: "Rio de Janeiro, RJ",
    compatibility: 77,
    potential: "Médio-Alto",
    employees: "1000-2000",
    description: "Serviços de logística integrada e transporte de cargas pesadas."
  },
  {
    id: 13,
    name: "Mineração Ouro Verde",
    sector: "Mineração",
    location: "Goiás",
    compatibility: 83,
    potential: "Médio-Alto",
    employees: "1000-2000",
    description: "Extração de ouro e minerais preciosos com tecnologia sustentável."
  },
  {
    id: 14,
    name: "Energia Solar Nordeste",
    sector: "Energia",
    location: "Bahia",
    compatibility: 75,
    potential: "Médio",
    employees: "500-1000",
    description: "Geração de energia solar fotovoltaica em parques solares de grande porte."
  },
  {
    id: 15,
    name: "Indústria Têxtil Moderna",
    sector: "Têxtil",
    location: "Santa Catarina",
    compatibility: 71,
    potential: "Médio",
    employees: "2000-5000",
    description: "Produção de tecidos e confecções para mercado nacional e internacional."
  }
];

/**
 * Helper function to search editais by keyword
 */
export const searchEditais = (query: string): Edital[] => {
  const lowerQuery = query.toLowerCase();
  return mockEditais.filter(
    (edital) =>
      edital.title.toLowerCase().includes(lowerQuery) ||
      edital.organ.toLowerCase().includes(lowerQuery) ||
      edital.location.toLowerCase().includes(lowerQuery) ||
      edital.description?.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Helper function to search empresas by keyword
 */
export const searchEmpresas = (query: string): Empresa[] => {
  const lowerQuery = query.toLowerCase();
  return mockEmpresas.filter(
    (empresa) =>
      empresa.name.toLowerCase().includes(lowerQuery) ||
      empresa.sector.toLowerCase().includes(lowerQuery) ||
      empresa.location.toLowerCase().includes(lowerQuery) ||
      empresa.description?.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Helper function to get edital by ID
 */
export const getEditalById = (id: number): Edital | undefined => {
  return mockEditais.find((edital) => edital.id === id);
};

/**
 * Helper function to get empresa by ID
 */
export const getEmpresaById = (id: number): Empresa | undefined => {
  return mockEmpresas.find((empresa) => empresa.id === id);
};

/**
 * Helper function to get top opportunities by compatibility
 */
export const getTopEditais = (limit: number = 3): Edital[] => {
  return [...mockEditais]
    .sort((a, b) => b.compatibility - a.compatibility)
    .slice(0, limit);
};

/**
 * Helper function to get top empresas by compatibility
 */
export const getTopEmpresas = (limit: number = 3): Empresa[] => {
  return [...mockEmpresas]
    .sort((a, b) => b.compatibility - a.compatibility)
    .slice(0, limit);
};
