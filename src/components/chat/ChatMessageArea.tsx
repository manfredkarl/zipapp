
import { useRef, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import MessageBubble from "../MessageBubble";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  videoUrl?: string;
  isSent?: boolean;
  projectId: string;
}

interface ChatMessageAreaProps {
  messages: ChatMessage[];
}

export const ChatMessageArea = ({ messages }: ChatMessageAreaProps) => {
  const isMobile = useIsMobile();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className="flex-1 p-4"
      style={{ height: isMobile ? 'calc(100vh - 130px)' : 'calc(100vh - 180px)' }}
    >
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            sender={msg.sender}
            timestamp={msg.timestamp}
            imageUrl={msg.imageUrl}
            videoUrl={msg.videoUrl}
            isSent={msg.isSent}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
