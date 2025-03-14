
import { useRef, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import MessageBubble from "../MessageBubble";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageType } from "@/hooks/use-chat-messages";

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  documentName?: string;
  isSent?: boolean;
  projectId: string;
  messageType: MessageType;
  service?: any;
  offer?: any;
  order?: any;
  progress?: any;
  invoice?: any;
  payment?: any;
  closing?: any;
}

interface ChatMessageAreaProps {
  messages: ChatMessage[];
}

export const ChatMessageArea = ({ messages }: ChatMessageAreaProps) => {
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 p-4 overflow-y-auto"
      style={{ 
        height: isMobile 
          ? 'calc(100vh - 180px)' // Reduced height for mobile to account for the input area
          : 'calc(100vh - 180px)' 
      }}
    >
      <div className="space-y-4 max-w-3xl mx-auto pb-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            sender={msg.sender}
            timestamp={msg.timestamp}
            imageUrl={msg.imageUrl}
            videoUrl={msg.videoUrl}
            documentUrl={msg.documentUrl}
            documentName={msg.documentName}
            isSent={msg.isSent}
            messageType={msg.messageType}
            service={msg.service}
            offer={msg.offer}
            order={msg.order}
            progress={msg.progress}
            invoice={msg.invoice}
            payment={msg.payment}
            closing={msg.closing}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
