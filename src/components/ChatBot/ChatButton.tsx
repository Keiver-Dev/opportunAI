import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-6 w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-[0_6px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-105 z-[9999]"
      aria-label="Open OpportunAI Bot"
    >
      <Lightbulb className="w-9 h-9 text-primary-foreground" />
    </Button>
  );
};
