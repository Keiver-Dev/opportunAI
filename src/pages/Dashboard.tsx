import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Search, 
  Filter, 
  Building2, 
  FileText, 
  MapPin, 
  Calendar,
  TrendingUp,
  User,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"editais" | "empresas">("editais");

  // Dados mock de editais
  const mockEditais = [
    {
      id: 1,
      title: "Fornecimento de Equipamentos de Segurança",
      organ: "Petrobrás - Unidade Santos",
      value: "R$ 450.000,00",
      deadline: "15/12/2024",
      location: "Santos, SP",
      compatibility: 95,
      status: "Aberto"
    },
    {
      id: 2,
      title: "Contratação de Serviços de Monitoramento",
      organ: "Vale S.A. - Minas Gerais",
      value: "R$ 680.000,00",
      deadline: "20/12/2024",
      location: "Belo Horizonte, MG",
      compatibility: 88,
      status: "Aberto"
    },
    {
      id: 3,
      title: "Aquisição de Sistemas de Controle de Acesso",
      organ: "Governo do Estado de São Paulo",
      value: "R$ 320.000,00",
      deadline: "10/01/2025",
      location: "São Paulo, SP",
      compatibility: 82,
      status: "Aberto"
    }
  ];

  // Dados mock de empresas
  const mockEmpresas = [
    {
      id: 1,
      name: "Indústria Química Braskem",
      sector: "Química e Petroquímica",
      location: "São Paulo, SP",
      compatibility: 92,
      potential: "Alto",
      employees: "5000+"
    },
    {
      id: 2,
      name: "Mineradora Brasil S.A.",
      sector: "Mineração",
      location: "Minas Gerais",
      compatibility: 87,
      potential: "Médio-Alto",
      employees: "2000-5000"
    },
    {
      id: 3,
      name: "Usina Energética do Nordeste",
      sector: "Energia",
      location: "Recife, PE",
      compatibility: 79,
      potential: "Médio",
      employees: "1000-2000"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="OpportunAI" className="h-8 w-auto" />
            <span className="text-2xl font-bold">OpportunAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/perfil")} className="hover:bg-secondary">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-secondary">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "editais" ? "default" : "outline"}
            onClick={() => setActiveTab("editais")}
            className={`flex items-center gap-2 ${activeTab === "editais" ? "bg-primary text-primary-foreground shadow-glow" : ""}`}
          >
            <FileText className="h-4 w-4" />
            Meus Editais
          </Button>
          <Button
            variant={activeTab === "empresas" ? "default" : "outline"}
            onClick={() => setActiveTab("empresas")}
            className={`flex items-center gap-2 ${activeTab === "empresas" ? "bg-primary text-primary-foreground shadow-glow" : ""}`}
          >
            <Building2 className="h-4 w-4" />
            Minhas Empresas
          </Button>
        </div>

        {/* Filtros */}
        <Card className="mb-8 shadow-elegant border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan">
              <Filter className="h-5 w-5" />
              Filtros de Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Localização</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Valor</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Até R$ 100k</SelectItem>
                    <SelectItem value="mid">R$ 100k - R$ 500k</SelectItem>
                    <SelectItem value="high">Acima de R$ 500k</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Compatibilidade</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Alta (80%+)</SelectItem>
                    <SelectItem value="mid">Média (60-80%)</SelectItem>
                    <SelectItem value="low">Baixa (&lt;60%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Aberto</SelectItem>
                    <SelectItem value="closing">Encerrando</SelectItem>
                    <SelectItem value="closed">Encerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Pesquisar por palavra-chave..." className="pl-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados - Editais */}
        {activeTab === "editais" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-orange">Oportunidades</span> em Editais
            </h2>
            {mockEditais.map((edital) => (
              <Card key={edital.id} className="hover-lift shadow-elegant cursor-pointer border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{edital.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {edital.organ}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {edital.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-primary text-primary-foreground mb-2">
                        {edital.compatibility}% compatível
                      </Badge>
                      <div className="text-sm text-muted-foreground">{edital.status}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                      <div className="text-sm text-muted-foreground">Valor estimado</div>
                      <div className="font-semibold text-green">{edital.value}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Prazo final</div>
                      <div className="font-semibold flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edital.deadline}
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Resultados - Empresas */}
        {activeTab === "empresas" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-orange">Empresas</span> Potenciais B2B
            </h2>
            {mockEmpresas.map((empresa) => (
              <Card key={empresa.id} className="hover-lift shadow-elegant cursor-pointer border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{empresa.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {empresa.sector}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {empresa.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-primary text-primary-foreground mb-2">
                        {empresa.compatibility}% compatível
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Potencial: {empresa.potential}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div>
                      <div className="text-sm text-muted-foreground">Funcionários</div>
                      <div className="font-semibold">{empresa.employees}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Momento</div>
                      <div className="font-semibold flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green" />
                        Em expansão
                      </div>
                    </div>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;