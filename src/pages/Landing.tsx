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
      <header className="bg-black/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src={logo} alt="OpportunAI" className="h-8 w-auto brightness-0 invert" />
            <span className="text-2xl font-bold text-white">OpportunAI</span>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#quem-somos"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('quem-somos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Quem Somos
            </a>
            <a 
              href="#o-que-e"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('o-que-e')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              O que é a OpportunAI
            </a>
            <a 
              href="#por-que-usar"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('por-que-usar')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Por que usar
            </a>
            <a 
              href="#depoimentos"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('depoimentos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Depoimentos
            </a>
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
              className="uppercase tracking-wide bg-white text-black hover:bg-white/90 border-0 font-medium"
            >
              Login
            </Button>
          </nav>
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
              variant="outline"
              onClick={() => {
                document.getElementById('quem-somos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-6 text-lg border-2"
            >
              Saiba mais
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

      {/* O que é OpportunAI */}
      <section id="o-que-e" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                O que é a <span className="text-cyan">OpportunAI</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Uma plataforma inteligente que revoluciona a forma como empresas encontram e conquistam oportunidades de negócio
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-cyan/10 to-cyan/5 p-8 rounded-2xl border border-cyan/20">
                <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Inteligência Artificial Avançada</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nossa IA analisa milhares de fontes diariamente - portais de licitação, sites governamentais, bases públicas e privadas - para identificar oportunidades que combinam perfeitamente com o perfil da sua empresa.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange/10 to-orange/5 p-8 rounded-2xl border border-orange/20">
                <div className="w-16 h-16 rounded-full bg-orange/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Automação Completa</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Esqueça a busca manual. A OpportunAI trabalha 24/7 monitorando editais, licitações e empresas em potencial, enviando alertas em tempo real sobre as melhores oportunidades para o seu negócio.
                </p>
              </div>

              <div className="bg-gradient-to-br from-coral/10 to-coral/5 p-8 rounded-2xl border border-coral/20">
                <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Insights Estratégicos</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receba análises detalhadas sobre cada oportunidade, incluindo histórico do cliente, valor estimado, concorrência e probabilidade de sucesso, tudo em um dashboard intuitivo.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan/10 to-orange/5 p-8 rounded-2xl border border-cyan/20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan/20 to-orange/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Economia de Tempo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reduza em até 90% o tempo gasto em prospecção. Sua equipe comercial pode focar no que realmente importa: fechar negócios e construir relacionamentos com clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que usar */}
      <section id="por-que-usar" className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Por que usar nossa <span className="text-orange">plataforma</span>?
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
                    href="#o-que-e" 
                    className="hover:text-cyan transition-colors inline-flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('o-que-e')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    O que é a OpportunAI
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