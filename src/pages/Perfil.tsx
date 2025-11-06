import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Building2, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

interface Product {
  id: number;
  name: string;
  description: string;
  keywords: string;
}

const Perfil = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [companyData, setCompanyData] = useState({
    name: "Empresa Exemplo Ltda",
    cnpj: "12.345.678/0001-99",
    sector: "Segurança da Indústria",
    email: "contato@empresa.com.br",
    website: "https://empresa.com.br",
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Sistema de Monitoramento 24h",
      description: "Sistema completo de CFTV com monitoramento remoto e alarmes inteligentes",
      keywords: "segurança, monitoramento, câmeras, vigilância"
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    keywords: ""
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e descrição do produto.",
        variant: "destructive"
      });
      return;
    }

    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ name: "", description: "", keywords: "" });
    
    toast({
      title: "Produto adicionado!",
      description: "A IA já está buscando oportunidades relacionadas.",
    });
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Produto removido",
      description: "O produto foi removido da lista.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-1.5">
              <img src={logo} alt="OpportunAI" className="h-8 w-auto" />
              <span className="text-2xl font-bold">Perfil da Empresa</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Dados da Empresa */}
        <Card className="mb-8 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Informações da Empresa
            </CardTitle>
            <CardDescription>
              Dados cadastrais e informações de contato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input 
                  value={companyData.name}
                  onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input 
                  value={companyData.cnpj}
                  onChange={(e) => setCompanyData({...companyData, cnpj: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Setor de Atuação</Label>
                <Input 
                  value={companyData.sector}
                  onChange={(e) => setCompanyData({...companyData, sector: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input 
                  type="email"
                  value={companyData.email}
                  onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Site</Label>
                <Input 
                  type="url"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                />
              </div>
            </div>
            <Button className="bg-accent hover:bg-accent/90">
              Salvar alterações
            </Button>
          </CardContent>
        </Card>

        {/* Produtos Cadastrados */}
        <Card className="mb-8 shadow-elegant">
          <CardHeader>
            <CardTitle>Produtos da Minha Empresa</CardTitle>
            <CardDescription>
              Produtos e serviços oferecidos pela sua empresa. A IA usa essas informações para encontrar oportunidades.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Lista de produtos */}
            {products.map((product) => (
              <div key={product.id} className="p-4 border rounded-lg bg-secondary/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                {product.keywords && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Palavras-chave:</strong> {product.keywords}
                  </div>
                )}
              </div>
            ))}

            {/* Formulário de novo produto */}
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Adicionar Novo Produto
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome do Produto/Serviço *</Label>
                  <Input
                    placeholder="Ex: Sistema de Monitoramento 24h"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descrição Detalhada *</Label>
                  <Textarea
                    placeholder="Descreva o produto ou serviço, suas funcionalidades e diferenciais..."
                    rows={4}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Palavras-chave (opcional)</Label>
                  <Input
                    placeholder="Ex: segurança, monitoramento, CFTV, alarmes"
                    value={newProduct.keywords}
                    onChange={(e) => setNewProduct({...newProduct, keywords: e.target.value})}
                  />
                </div>
                <Button 
                  onClick={handleAddProduct}
                  className="bg-accent hover:bg-accent/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Perfil;