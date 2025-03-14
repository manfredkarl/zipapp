
import { useState, useRef } from "react";
import { ImageIcon, SendIcon, VideoIcon, Paperclip, Mic, Smile } from "lucide-react";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ChatInputAreaProps {
  onSendMessage: (content: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChatInputArea = ({ 
  onSendMessage, 
  onFileUpload
}: ChatInputAreaProps) => {
  const [message, setMessage] = useState("");
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          accept="image/*,video/*,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onFileUpload}
        />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Smile className="h-5 w-5 text-gray-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Emoji</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Paperclip className="h-5 w-5 text-gray-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Attach files</TooltipContent>
        </Tooltip>
        
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isMobile ? "Message..." : "Type a message..."}
          className="flex-1 rounded-full bg-gray-100 text-sm md:text-base"
        />
        
        {!message.trim() ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Mic className="h-5 w-5 text-gray-500" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Voice message</TooltipContent>
          </Tooltip>
        ) : (
          <button
            type="submit"
            className="rounded-full bg-primary p-2 text-white hover:bg-primary/90 transition-colors"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        )}
      </form>
    </div>
  );
};
