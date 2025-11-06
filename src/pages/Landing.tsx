import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import aiIcon from "@/assets/ai-icon.png";
import searchIcon from "@/assets/search-icon.png";
import organizeIcon from "@/assets/organize-icon.png";
import analyticsIcon from "@/assets/analytics-icon.png";
import logo from "@/assets/logo.png";
import member1 from "@/assets/team/member-1.jpg";
import member2 from "@/assets/team/member-2.jpg";
import member3 from "@/assets/team/member-3.jpg";
import member4 from "@/assets/team/member-4.jpg";
import teamPhoto from "@/assets/team/team-photo.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Landing = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { image: member1, name: "Carlos Silva", role: "CEO & Co-Founder" },
    { image: member2, name: "Ana Costa", role: "CTO" },
    { image: member3, name: "Pedro Santos", role: "Head of AI" },
    { image: member4, name: "Maria Oliveira", role: "Head of Product" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="OpportunAI" className="h-8 w-auto brightness-0 invert" />
            <span className="text-2xl font-bold text-foreground">OpportunAI</span>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-4">
            <a 
              href="#quem-somos"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('quem-somos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Quem Somos
            </a>
            <a 
              href="#por-que-usar"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('por-que-usar')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Por que usar
            </a>
            <a 
              href="#depoimentos"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('depoimentos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Depoimentos
            </a>
          </nav>

          <Button 
            variant="light" 
            onClick={() => navigate("/login")}
            className="uppercase tracking-wide ml-4"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-cyan">Potencialize</span>{" "}
              <span className="text-orange">seu</span>{" "}
              <span className="text-coral">negócio</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              Encontre oportunidades reais de negócio com o poder da IA. 
              Automatize sua prospecção comercial e conecte-se com editais, 
              licitações e empresas que realmente importam.
            </p>
            <Button 
              size="lg" 
              variant="light"
              onClick={() => navigate("/login")}
              className="px-8 py-6 text-lg shadow-glow hover-lift"
            >
              Explorar plataforma
            </Button>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section id="quem-somos" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Quem <span className="text-cyan">Somos</span></h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Somos uma equipe movida pelo propósito de revolucionar a forma como empresas identificam e conquistam oportunidades de negócio.
                  Unimos inteligência artificial, análise de dados e experiência em vendas B2B para oferecer uma plataforma que vai além da automação, compreendendo o mercado, antecipando tendências e conectando sua empresa às oportunidades ideais.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Acreditamos que a tecnologia deve ser uma aliada estratégica. Por isso, desenvolvemos uma solução que simplifica a prospecção, otimiza o tempo das equipes comerciais e entrega resultados com precisão, velocidade e inteligência.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan mt-2"></div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Nossa Missão</h3>
                      <p className="text-muted-foreground">Democratizar o acesso a oportunidades comerciais, tornando a tecnologia um motor de crescimento para empresas de todos os portes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange mt-2"></div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Nossa Visão</h3>
                      <p className="text-muted-foreground">Ser reconhecida como a principal plataforma de prospecção B2B do Brasil, referência em inovação, inteligência e geração de valor real para nossos clientes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-coral mt-2"></div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Nossos Valores</h3>
                      <p className="text-muted-foreground">Inovação como essência, transparência em cada relação e resultados concretos que impulsionam negócios e constroem parcerias duradouras.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-elegant">
                  <img 
                    src={teamPhoto} 
                    alt="Equipe OpportunAI" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que usar */}
      <section id="por-que-usar" className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Por que usar nossa <span className="text-orange">plataforma?</span>
          </h2>
          <p className="text-center text-foreground/80 mb-20 max-w-2xl mx-auto text-lg">
            Inteligência artificial que entende seu negócio e encontra oportunidades reais
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm p-10 rounded-2xl shadow-elegant hover-lift border border-border/50 transition-all">
              <h3 className="text-xl font-bold mb-4 text-white">IA que trabalha por você</h3>
              <p className="text-white/90 leading-relaxed">
                Deixe a Inteligência Artificial analisar o mercado, interpretar o que sua empresa oferece e entregar as oportunidades mais relevantes para o seu negócio.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-10 rounded-2xl shadow-elegant hover-lift border border-border/50 transition-all">
              <h3 className="text-xl font-bold mb-4 text-white">Busca inteligente e contínua</h3>
              <p className="text-white/90 leading-relaxed">
                Enquanto você foca em vender, a plataforma realiza uma varredura automática em bases públicas e privadas, identificando potenciais clientes e licitações compatíveis.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-10 rounded-2xl shadow-elegant hover-lift border border-border/50 transition-all">
              <h3 className="text-xl font-bold mb-4 text-white">Produtividade sem complexidade</h3>
              <p className="text-white/90 leading-relaxed">
                Com uma interface moderna e intuitiva, você gerencia tudo em poucos cliques, sem planilhas, sem burocracia, sem perda de tempo.
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-10 rounded-2xl shadow-elegant hover-lift border border-border/50 transition-all">
              <h3 className="text-xl font-bold mb-4 text-white">Resultados que impulsionam crescimento</h3>
              <p className="text-white/90 leading-relaxed">
                Aproveite dados transformados em insights reais e aumente a eficiência comercial com decisões guiadas por IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos de Clientes */}
      <section id="depoimentos" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              O que nossos <span className="text-coral">clientes</span> dizem
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Empresas que transformaram sua prospecção com OpportunAI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-elegant border border-border/50 hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan to-orange flex items-center justify-center text-white font-bold text-xl">
                  RC
                </div>
                <div>
                  <p className="font-bold text-foreground">Roberto Costa</p>
                  <p className="text-sm text-muted-foreground">CEO - SecureIndustry</p>
                </div>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                "A OpportunAI revolucionou nossa forma de prospectar. Em 3 meses aumentamos nossa carteira de licitações em 240%. A IA realmente entende nosso negócio."
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-orange text-xl">★</span>
                ))}
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-elegant border border-border/50 hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange to-coral flex items-center justify-center text-white font-bold text-xl">
                  MF
                </div>
                <div>
                  <p className="font-bold text-foreground">Mariana Ferreira</p>
                  <p className="text-sm text-muted-foreground">Diretora Comercial - SafeTech</p>
                </div>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                "Economizamos 15 horas semanais na busca por oportunidades. A plataforma é intuitiva e os resultados aparecem de forma precisa e rápida."
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-orange text-xl">★</span>
                ))}
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-elegant border border-border/50 hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral to-cyan flex items-center justify-center text-white font-bold text-xl">
                  TA
                </div>
                <div>
                  <p className="font-bold text-foreground">Thiago Almeida</p>
                  <p className="text-sm text-muted-foreground">Gerente de Vendas - ProSeg</p>
                </div>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                "Finalmente uma ferramenta que entrega valor real. Nossa taxa de conversão dobrou e o time comercial ficou muito mais produtivo e focado."
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-orange text-xl">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para <span className="text-cyan">transformar</span> sua prospecção?
          </h2>
          <p className="text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
            Junte-se às empresas que já automatizaram sua busca por oportunidades comerciais.
          </p>
          <Button 
            size="lg"
            variant="light"
            onClick={() => navigate("/login")}
            className="px-8 py-6 text-lg shadow-glow hover-lift"
          >
            Começar agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand & Description */}
            <div>
              <div className="flex items-center gap-1.5 mb-4">
                <img src={logo} alt="OpportunAI" className="h-8 w-auto brightness-0 invert" />
                <span className="text-xl font-bold text-foreground">OpportunAI</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Prospecção comercial inteligente com IA. Encontre oportunidades reais de negócio de forma automatizada.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold mb-6 text-lg">Navegação</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a 
                    href="#quem-somos" 
                    className="hover:text-cyan transition-colors inline-flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('quem-somos')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Quem Somos
                  </a>
                </li>
                <li>
                  <a 
                    href="#por-que-usar" 
                    className="hover:text-cyan transition-colors inline-flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('por-que-usar')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Por que usar
                  </a>
                </li>
                <li>
                  <a 
                    href="#depoimentos" 
                    className="hover:text-cyan transition-colors inline-flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('depoimentos')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Depoimentos
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/login')}
                    className="hover:text-cyan transition-colors"
                  >
                    Entrar na plataforma
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-6 text-lg">Contato</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:contato@opportunai.com.br" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-cyan transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center group-hover:bg-cyan/20 group-hover:border-cyan transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>contato@opportunai.com.br</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Instituto Caldeira</p>
                      <p className="text-sm">Porto Alegre - RS</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 OpportunAI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;