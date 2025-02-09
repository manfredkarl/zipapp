
import { useState, useEffect, useRef } from "react";
import { ImageIcon, SendIcon } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { Input } from "./ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "./ui/scroll-area";

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  isSent?: boolean;
  projectId: string;
}

const projectMessages: Record<string, ChatMessage[]> = {
  main: [
    {
      id: "1",
      content: "Started work on the foundation today.",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 3600000),
      projectId: "main"
    },
    {
      id: "2",
      content: "Here's the progress photo",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 3500000),
      imageUrl: "/placeholder.svg",
      projectId: "main"
    },
    {
      id: "3",
      content: "Looks good! Keep up the great work.",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 1800000),
      isSent: true,
      projectId: "main"
    }
  ],
  "1": [
    {
      id: "4", 
      content: "Foundation work is progressing well.",
      sender: "Team Lead",
      timestamp: new Date(Date.now() - 7200000),
      projectId: "1"
    }
  ],
  "2": [
    {
      id: "5",
      content: "Landscaping designs are ready for review.",
      sender: "Design Team", 
      timestamp: new Date(Date.now() - 7200000),
      projectId: "2"
    }
  ],
  "3": [
    {
      id: "6",
      content: "Fountain installation scheduled for next month.",
      sender: "Project Coordinator",
      timestamp: new Date(Date.now() - 7200000),
      projectId: "3" 
    }
  ]
};

interface ChatThreadProps {
  projectId?: string;
}

const ChatThread = ({ projectId = "main" }: ChatThreadProps) => {
  const isMobile = useIsMobile();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(projectMessages[projectId] || []);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages(projectMessages[projectId] || []);
  }, [projectId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "Project Manager",
      timestamp: new Date(),
      isSent: true,
      projectId
    };

    setMessages([...messages, newMessage]);
    projectMessages[projectId] = [...(projectMessages[projectId] || []), newMessage];
    setMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: "Uploaded a new image",
      sender: "Project Manager",
      timestamp: new Date(),
      imageUrl,
      isSent: true,
      projectId
    };

    setMessages([...messages, newMessage]);
    projectMessages[projectId] = [...(projectMessages[projectId] || []), newMessage];
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea 
        ref={scrollAreaRef} 
        className="flex-1 p-4 overflow-y-auto"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              sender={msg.sender}
              timestamp={msg.timestamp}
              imageUrl={msg.imageUrl}
              isSent={msg.isSent}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="sticky bottom-0 border-t p-4 bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ImageIcon className="h-5 w-5 text-gray-500" />
          </button>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isMobile ? "Message..." : "Type a message..."}
            className="flex-1 rounded-full bg-gray-100 text-sm md:text-base"
          />
          <button
            type="submit"
            className="rounded-full bg-primary p-2 text-white hover:bg-primary/90 transition-colors"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatThread;
