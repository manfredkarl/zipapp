
import { useState } from "react";
import { ImageIcon, SendIcon } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { Input } from "./ui/input";

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  isSent?: boolean;
}

const ChatThread = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Started work on the foundation today.",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      content: "Here's the progress photo",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 3500000),
      imageUrl: "/placeholder.svg",
    },
    {
      id: "3",
      content: "Looks good! Keep up the great work.",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 1800000),
      isSent: true,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "Project Manager",
      timestamp: new Date(),
      isSent: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you'd upload the file to a server here
    const imageUrl = URL.createObjectURL(file);
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: "Uploaded a new image",
      sender: "Project Manager",
      timestamp: new Date(),
      imageUrl,
      isSent: true,
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm animate-fadeIn">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <ImageIcon className="h-5 w-5 text-gray-500 hover:text-gray-600 transition-colors" />
          </label>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-gray-100"
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
