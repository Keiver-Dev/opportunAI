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
  LogOut,
  ExternalLink,
  DollarSign,
  Users,
  Briefcase
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/logo.png";
import { ChatBot } from "@/components/ChatBot";
import { mockEditais, mockEmpresas, Edital, Empresa } from "@/data/mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"editais" | "empresas">("editais");

  // Estados para filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [valueFilter, setValueFilter] = useState<string>("all");
  const [compatibilityFilter, setCompatibilityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Estados para modal
  const [selectedEdital, setSelectedEdital] = useState<Edital | null>(null);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [isEditalModalOpen, setIsEditalModalOpen] = useState(false);
  const [isEmpresaModalOpen, setIsEmpresaModalOpen] = useState(false);

  // Funciones para abrir modales
  const handleEditalClick = (edital: Edital) => {
    setSelectedEdital(edital);
    setIsEditalModalOpen(true);
  };

  const handleEmpresaClick = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setIsEmpresaModalOpen(true);
  };

  // Función para filtrar editais
  const filteredEditais = mockEditais.filter((edital) => {
    // Filtro de búsqueda
    const matchesSearch = searchQuery === "" ||
      edital.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      edital.organ.toLowerCase().includes(searchQuery.toLowerCase()) ||
      edital.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro de localización
    const matchesLocation = locationFilter === "all" ||
      edital.location.toLowerCase().includes(locationFilter.toLowerCase());

    // Filtro de valor
    let matchesValue = true;
    if (valueFilter === "low") {
      const value = parseFloat(edital.value.replace(/[^\d,]/g, '').replace(',', '.'));
      matchesValue = value <= 100000;
    } else if (valueFilter === "mid") {
      const value = parseFloat(edital.value.replace(/[^\d,]/g, '').replace(',', '.'));
      matchesValue = value > 100000 && value <= 500000;
    } else if (valueFilter === "high") {
      const value = parseFloat(edital.value.replace(/[^\d,]/g, '').replace(',', '.'));
      matchesValue = value > 500000;
    }

    // Filtro de compatibilidad
    let matchesCompatibility = true;
    if (compatibilityFilter === "high") {
      matchesCompatibility = edital.compatibility >= 80;
    } else if (compatibilityFilter === "mid") {
      matchesCompatibility = edital.compatibility >= 60 && edital.compatibility < 80;
    } else if (compatibilityFilter === "low") {
      matchesCompatibility = edital.compatibility < 60;
    }

    // Filtro de status
    const matchesStatus = statusFilter === "all" ||
      edital.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesLocation && matchesValue && matchesCompatibility && matchesStatus;
  });

  // Función para filtrar empresas
  const filteredEmpresas = mockEmpresas.filter((empresa) => {
    // Filtro de búsqueda
    const matchesSearch = searchQuery === "" ||
      empresa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      empresa.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      empresa.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro de localización
    const matchesLocation = locationFilter === "all" ||
      empresa.location.toLowerCase().includes(locationFilter.toLowerCase());

    // Filtro de compatibilidad
    let matchesCompatibility = true;
    if (compatibilityFilter === "high") {
      matchesCompatibility = empresa.compatibility >= 80;
    } else if (compatibilityFilter === "mid") {
      matchesCompatibility = empresa.compatibility >= 60 && empresa.compatibility < 80;
    } else if (compatibilityFilter === "low") {
      matchesCompatibility = empresa.compatibility < 60;
    }

    return matchesSearch && matchesLocation && matchesCompatibility;
  });

  return (
    <div className="min-h-screen bg-background overflow-scroll">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="OpportunAI" className="h-8 w-auto brightness-0 invert" />
            <span className="text-2xl font-bold text-white">OpportunAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/perfil")} className="hover:bg-primary hover:text-primary-foreground">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-primary hover:text-primary-foreground">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 z-10">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "editais" ? "default" : "outline"}
            onClick={() => setActiveTab("editais")}
            className={`flex items-center gap-2 ${activeTab === "editais" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-white text-white hover:bg-white hover:text-black"}`}
          >
            <FileText className="h-4 w-4" />
            Meus Editais
          </Button>
          <Button
            variant={activeTab === "empresas" ? "default" : "outline"}
            onClick={() => setActiveTab("empresas")}
            className={`flex items-center gap-2 ${activeTab === "empresas" ? "bg-white text-black hover:bg-white/90" : "border-white text-white hover:bg-white hover:text-black"}`}
          >
            <Building2 className="h-4 w-4" />
            Minhas Empresas
          </Button>
        </div>

        {/* Filtros */}
        <Card className="mb-8 shadow-elegant border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Filter className="h-5 w-5" />
              Filtros de Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Localização</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="são paulo">São Paulo</SelectItem>
                    <SelectItem value="rio de janeiro">Rio de Janeiro</SelectItem>
                    <SelectItem value="minas gerais">Minas Gerais</SelectItem>
                    <SelectItem value="santos">Santos</SelectItem>
                    <SelectItem value="belo horizonte">Belo Horizonte</SelectItem>
                    <SelectItem value="recife">Recife</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Valor</label>
                <Select value={valueFilter} onValueChange={setValueFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="low">Até R$ 100k</SelectItem>
                    <SelectItem value="mid">R$ 100k - R$ 500k</SelectItem>
                    <SelectItem value="high">Acima de R$ 500k</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Compatibilidade</label>
                <Select value={compatibilityFilter} onValueChange={setCompatibilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="high">Alta (80%+)</SelectItem>
                    <SelectItem value="mid">Média (60-80%)</SelectItem>
                    <SelectItem value="low">Baixa (&lt;60%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="aberto">Aberto</SelectItem>
                    <SelectItem value="encerrando">Encerrando</SelectItem>
                    <SelectItem value="encerrado">Encerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por palavra-chave..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Botón para limpiar filtros */}
            {(searchQuery || locationFilter !== "all" || valueFilter !== "all" || compatibilityFilter !== "all" || statusFilter !== "all") && (
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setLocationFilter("all");
                    setValueFilter("all");
                    setCompatibilityFilter("all");
                    setStatusFilter("all");
                  }}
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resultados - Editais */}
        {activeTab === "editais" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-white">Oportunidades</span> em Editais
              <span className="text-sm text-muted-foreground ml-2">({filteredEditais.length} resultados)</span>
            </h2>
            {filteredEditais.length === 0 ? (
              <Card className="border-border bg-card">
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum edital encontrado</h3>
                  <p className="text-muted-foreground">Tente ajustar os filtros para ver mais resultados.</p>
                </CardContent>
              </Card>
            ) : (
              filteredEditais.map((edital) => (
                <Card
                  key={edital.id}
                  className="hover-lift shadow-elegant cursor-pointer border-border bg-card"
                  onClick={() => handleEditalClick(edital)}
                >
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary hover:text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditalClick(edital);
                          }}
                        >
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Resultados - Empresas */}
        {activeTab === "empresas" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-cyan">Empresas</span> Potenciais B2B
              <span className="text-sm text-muted-foreground ml-2">({filteredEmpresas.length} resultados)</span>
            </h2>
            {filteredEmpresas.length === 0 ? (
              <Card className="border-border bg-card">
                <CardContent className="p-12 text-center">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma empresa encontrada</h3>
                  <p className="text-muted-foreground">Tente ajustar os filtros para ver mais resultados.</p>
                </CardContent>
              </Card>
            ) : (
              filteredEmpresas.map((empresa) => (
                <Card
                  key={empresa.id}
                  className="hover-lift shadow-elegant cursor-pointer border-border bg-card"
                  onClick={() => handleEmpresaClick(empresa)}
                >
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
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary hover:text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmpresaClick(empresa);
                          }}
                        >
                          Ver perfil
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      {/* ChatBot Component */}
      <ChatBot />

      {/* Modal de Detalhes do Edital */}
      <Dialog open={isEditalModalOpen} onOpenChange={setIsEditalModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEdital && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {selectedEdital.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedEdital.organ}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Badges de Status e Compatibilidade */}
                <div className="flex gap-3 flex-wrap">
                  <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
                    {selectedEdital.compatibility}% Compatível
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2">
                    {selectedEdital.status}
                  </Badge>
                </div>

                {/* Informações Principais */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-5 w-5" />
                      <span className="font-semibold">Valor Estimado</span>
                    </div>
                    <p className="text-xl font-bold text-green-500">{selectedEdital.value}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span className="font-semibold">Prazo Final</span>
                    </div>
                    <p className="text-xl font-bold">{selectedEdital.deadline}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span className="font-semibold">Localização</span>
                    </div>
                    <p className="text-lg">{selectedEdital.location}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-5 w-5" />
                      <span className="font-semibold">Órgão</span>
                    </div>
                    <p className="text-lg">{selectedEdital.organ}</p>
                  </div>
                </div>

                {/* Descrição */}
                {selectedEdital.description && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-5 w-5" />
                      <span className="font-semibold">Descrição</span>
                    </div>
                    <p className="text-base leading-relaxed">{selectedEdital.description}</p>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Acessar Edital
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Target className="h-4 w-4 mr-2" />
                    Candidatar-se
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes da Empresa */}
      <Dialog open={isEmpresaModalOpen} onOpenChange={setIsEmpresaModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedEmpresa && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  {selectedEmpresa.name}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedEmpresa.sector}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Badges de Compatibilidade e Potencial */}
                <div className="flex gap-3 flex-wrap">
                  <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
                    {selectedEmpresa.compatibility}% Compatível
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2">
                    Potencial: {selectedEmpresa.potential}
                  </Badge>
                </div>

                {/* Informações Principais */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-5 w-5" />
                      <span className="font-semibold">Setor</span>
                    </div>
                    <p className="text-lg">{selectedEmpresa.sector}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span className="font-semibold">Localização</span>
                    </div>
                    <p className="text-lg">{selectedEmpresa.location}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-5 w-5" />
                      <span className="font-semibold">Funcionários</span>
                    </div>
                    <p className="text-lg">{selectedEmpresa.employees}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-semibold">Momento</span>
                    </div>
                    <p className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      Em expansão
                    </p>
                  </div>
                </div>

                {/* Descrição */}
                {selectedEmpresa.description && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-5 w-5" />
                      <span className="font-semibold">Sobre a Empresa</span>
                    </div>
                    <p className="text-base leading-relaxed">{selectedEmpresa.description}</p>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Perfil Completo
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Target className="h-4 w-4 mr-2" />
                    Iniciar Contato
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;