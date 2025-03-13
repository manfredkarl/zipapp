
import { useState, useRef } from "react";
import { ImageIcon, SendIcon, VideoIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatInputAreaProps {
  onSendMessage: (content: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChatInputArea = ({ 
  onSendMessage, 
  onImageUpload, 
  onVideoUpload 
}: ChatInputAreaProps) => {
  const [message, setMessage] = useState("");
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="sticky bottom-0 border-t p-4 bg-white shadow-lg">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-3xl mx-auto">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onImageUpload}
        />
        <input
          type="file"
          ref={videoInputRef}
          className="hidden"
          accept="video/*"
          onChange={onVideoUpload}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ImageIcon className="h-5 w-5 text-gray-500" />
        </button>
        <button
          type="button"
          onClick={() => videoInputRef.current?.click()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <VideoIcon className="h-5 w-5 text-gray-500" />
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
  );
};
