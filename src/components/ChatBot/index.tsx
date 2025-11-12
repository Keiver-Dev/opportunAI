import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatButton onClick={handleOpen} />
      <ChatWindow isOpen={isOpen} onClose={handleClose} onMinimize={handleMinimize} />
    </>
  );
};
