import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Login = () => {
  const [step, setStep] = useState<"sector" | "auth">("sector");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    email: "",
    password: "",
  });

  const handleSectorSelect = () => {
    setStep("auth");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de autenticação
    if (isLogin) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });
    } else {
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo à OpportunAI.",
      });
    }
    
    // Redirecionar para dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  if (step === "sector") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md shadow-elegant border-border">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={logo} alt="OpportunAI" className="h-12 w-auto" />
            </div>
            <CardTitle className="text-2xl">Bem-vindo à OpportunAI</CardTitle>
            <CardDescription className="text-base">
              Em qual setor você trabalha?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleSectorSelect}
              className="w-full h-16 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
            >
              Segurança da Indústria
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md shadow-elegant border-border">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="OpportunAI" className="h-10 w-auto" />
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? "Entrar na plataforma" : "Criar sua conta"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Acesse sua conta para continuar" 
              : "Preencha os dados para começar"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome da empresa</Label>
                  <Input
                    id="companyName"
                    placeholder="Digite o nome da empresa"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Site da empresa</Label>
                  <Input
                    id="companyWebsite"
                    type="url"
                    placeholder="https://exemplo.com.br"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                    required
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail do colaborador</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow">
              {isLogin ? "Entrar" : "Criar conta"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-cyan transition-colors"
              >
                {isLogin 
                  ? "Não tem uma conta? Cadastre-se" 
                  : "Já tem uma conta? Faça login"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;