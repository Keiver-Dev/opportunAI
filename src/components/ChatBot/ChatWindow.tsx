import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  mockEditais, 
  mockEmpresas, 
  searchEditais, 
  searchEmpresas, 
  getTopEditais, 
  getTopEmpresas 
} from "@/data/mockData";
import Logo from "@/assets/icons/Logo";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickReplies?: string[];
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

export const ChatWindow = ({ isOpen, onClose, onMinimize }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Olá! 👋 Sou o OpportunAI Bot, seu assistente de oportunidades.\n\nAtualmente temos:\n• ${mockEditais.length} editais disponíveis\n• ${mockEmpresas.length} empresas potenciais\n\nO que você gostaria de fazer?`,
      sender: "bot",
      timestamp: new Date(),
      quickReplies: ["📋 Ver Editais", "🏭 Ver Empresas", "🔍 Buscar", "📊 Ver Totais"]
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userText: string): { text: string; quickReplies?: string[] } => {
    const lowerText = userText.toLowerCase();

    // Comandos para listar oportunidades
    if (lowerText.includes("editais") || lowerText.includes("ver editais") || lowerText.includes("📋")) {
      const topEditais = getTopEditais(3);
      let response = "📋 Aqui estão as melhores oportunidades em editais:\n\n";
      topEditais.forEach((edital, index) => {
        response += `${index + 1}. ${edital.title}\n`;
        response += `   🏢 ${edital.organ}\n`;
        response += `   💰 ${edital.value}\n`;
        response += `   ✅ ${edital.compatibility}% compatível\n\n`;
      });
      response += "Digite o número (1-3) para ver mais detalhes ou escolha outra opção:";
      return { 
        text: response, 
        quickReplies: ["1️⃣ Detalhes #1", "2️⃣ Detalhes #2", "3️⃣ Detalhes #3", "🏭 Ver Empresas", "🔙 Menu"]
      };
    }

    // Comandos para listar empresas
    if (lowerText.includes("empresas") || lowerText.includes("ver empresas") || lowerText.includes("🏭")) {
      const topEmpresas = getTopEmpresas(3);
      let response = "🏭 Aqui estão as melhores empresas potenciais:\n\n";
      topEmpresas.forEach((empresa, index) => {
        response += `${index + 1}. ${empresa.name}\n`;
        response += `   🔧 ${empresa.sector}\n`;
        response += `   📍 ${empresa.location}\n`;
        response += `   ✅ ${empresa.compatibility}% compatível\n\n`;
      });
      response += "Digite o número (1-3) para ver mais detalhes ou escolha outra opção:";
      return { 
        text: response, 
        quickReplies: ["1️⃣ Detalhes #1", "2️⃣ Detalhes #2", "3️⃣ Detalhes #3", "📋 Ver Editais", "🔙 Menu"]
      };
    }

    // Detalles de edital específico
    if (lowerText.match(/detalhes #[1-3]/) || lowerText.match(/^[1-3]$/)) {
      const num = parseInt(lowerText.match(/[1-3]/)?.[0] || "1");
      const edital = mockEditais[num - 1];
      const empresa = mockEmpresas[num - 1];
      
      // Determinar si es edital o empresa basado en el contexto
      if (edital && (lowerText.includes("edital") || messages[messages.length - 2]?.text.includes("editais"))) {
        return {
          text: `📋 Detalhes do Edital #${num}:\n\n${edital.title}\n\n🏢 Órgão: ${edital.organ}\n💰 Valor: ${edital.value}\n📍 Local: ${edital.location}\n📅 Prazo: ${edital.deadline}\n✅ Compatibilidade: ${edital.compatibility}%\n📝 Status: ${edital.status}\n\n${edital.description || ""}`,
          quickReplies: ["📋 Ver Todos Editais", "🏭 Ver Empresas", "🔙 Menu"]
        };
      } else if (empresa) {
        return {
          text: `🏭 Detalhes da Empresa #${num}:\n\n${empresa.name}\n\n🔧 Setor: ${empresa.sector}\n📍 Local: ${empresa.location}\n👥 Funcionários: ${empresa.employees}\n💼 Potencial: ${empresa.potential}\n✅ Compatibilidade: ${empresa.compatibility}%\n\n${empresa.description || ""}`,
          quickReplies: ["🏭 Ver Todas Empresas", "📋 Ver Editais", "🔙 Menu"]
        };
      }
    }

    // Buscar
    if (lowerText.includes("buscar") || lowerText.includes("🔍")) {
      return {
        text: "🔍 Digite a palavra-chave que deseja buscar:\n\nExemplos:\n• segurança\n• monitoramento\n• química\n• mineração",
        quickReplies: ["🔙 Menu"]
      };
    }

    // Realizar búsqueda si hay palabras clave específicas
    const keywords = ["segurança", "monitoramento", "química", "mineração", "energia", "controle"];
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      const editaisResults = searchEditais(userText);
      const empresasResults = searchEmpresas(userText);
      
      if (editaisResults.length === 0 && empresasResults.length === 0) {
        return {
          text: "🔍 Não encontrei oportunidades com esses termos.\n\nTente outras palavras-chave ou escolha uma opção:",
          quickReplies: ["📋 Ver Editais", "🏭 Ver Empresas", "🔙 Menu"]
        };
      }

      let response = "🔍 Resultados da busca:\n\n";
      
      if (editaisResults.length > 0) {
        response += "📋 Editais encontrados:\n";
        editaisResults.forEach((edital, index) => {
          response += `${index + 1}. ${edital.title} (${edital.compatibility}% compatível)\n`;
        });
        response += "\n";
      }

      if (empresasResults.length > 0) {
        response += "🏭 Empresas encontradas:\n";
        empresasResults.forEach((empresa, index) => {
          response += `${index + 1}. ${empresa.name} (${empresa.compatibility}% compatível)\n`;
        });
      }

      return {
        text: response,
        quickReplies: ["📋 Ver Todos Editais", "🏭 Ver Todas Empresas", "🔙 Menu"]
      };
    }

    // Ver totais
    if (lowerText.includes("totais") || lowerText.includes("📊")) {
      return {
        text: `📊 Resumo de Oportunidades:\n\n• ${mockEditais.length} editais disponíveis\n• ${mockEmpresas.length} empresas potenciais\n• ${mockEditais.filter(e => e.compatibility >= 90).length} oportunidades de alta compatibilidade\n\nO que você gostaria de explorar?`,
        quickReplies: ["📋 Ver Editais", "🏭 Ver Empresas", "🔍 Buscar"]
      };
    }

    // Menu / Voltar
    if (lowerText.includes("menu") || lowerText.includes("voltar") || lowerText.includes("🔙")) {
      return {
        text: "🏠 Menu Principal\n\nEscolha uma opção:",
        quickReplies: ["📋 Ver Editais", "🏭 Ver Empresas", "🔍 Buscar", "📊 Ver Totais"]
      };
    }

    // Respuesta por defecto con opciones
    return {
      text: `Entendi! 😊\n\nEscolha uma das opções abaixo:`,
      quickReplies: ["📋 Ver Editais", "🏭 Ver Empresas", "🔍 Buscar", "📊 Ver Totais"]
    };
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate API call with intelligent response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    // Trigger send automatically
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(reply);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 w-[380px] h-[450px] bg-card border-2 border-border rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden z-[9998] transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      {/* Header - Fixed at top */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-card border-b-2 border-border flex-shrink-0">
        <div className="flex items-center gap-1">
          <Logo className="text-white h-6 w-6" />
          <span className="font-bold text-foreground">OpportunAI Bot</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Chat Body - All messages scroll here */}
      <div
        ref={chatBodyRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scroll-smooth min-h-0"
      >
        {messages.map((message, index) => (
          <div key={message.id}>
            <div
              className={cn(
                "flex gap-2 items-start",
                message.sender === "user" && "flex-row-reverse"
              )}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className={cn(
                  message.sender === "bot" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                )}>
                  {message.sender === "bot" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "border-2 border-border rounded-2xl px-3.5 py-2.5 max-w-[75%] text-sm leading-relaxed break-words whitespace-pre-wrap",
                  message.sender === "bot"
                    ? "bg-card text-card-foreground"
                    : "bg-primary text-primary-foreground"
                )}
              >
                {message.text}
              </div>
            </div>
            
            {/* Quick Reply Buttons - Only show for last bot message */}
            {message.sender === "bot" && 
             message.quickReplies && 
             index === messages.length - 1 && 
             !isLoading && (
              <div className="flex flex-wrap gap-2 mt-2 ml-10">
                {message.quickReplies.map((reply, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 border-primary/50 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 items-start">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="border-2 border-border rounded-2xl px-3.5 py-2.5 max-w-[75%] text-sm bg-card text-card-foreground">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex border-t-2 border-border flex-shrink-0 bg-card">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          className="flex-1 border-0 rounded-none px-4 py-3.5 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 bg-card"
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()}
          className="rounded-none border-l-2 border-border bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3.5 font-semibold"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
