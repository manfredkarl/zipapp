
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
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="sticky bottom-0 border-t p-4 bg-white shadow-lg w-full z-10">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-3xl mx-auto">
        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onFileUpload}
        />
        <input
          type="file"
          ref={imageInputRef}
          className="hidden"
          accept="image/*"
          onChange={onFileUpload}
        />
        <input
          type="file"
          ref={videoInputRef}
          className="hidden"
          accept="video/*"
          onChange={onFileUpload}
        />
        
        {/* Always show image and video buttons */}
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          aria-label="Add image"
        >
          <ImageIcon className="h-5 w-5" />
        </button>
        
        <button
          type="button"
          onClick={() => videoInputRef.current?.click()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          aria-label="Add video"
        >
          <VideoIcon className="h-5 w-5" />
        </button>
        
        {/* On desktop, add more buttons */}
        {!isMobile && (
          <>
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
          </>
        )}
        
        {/* Always show attachment button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          aria-label="Attach files"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isMobile ? "Message..." : "Type a message..."}
          className="flex-1 rounded-full bg-gray-100 text-sm md:text-base"
        />
        
        {!message.trim() ? (
          <button
            type="button"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            aria-label="Voice message"
          >
            <Mic className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="submit"
            className="rounded-full bg-primary p-2 text-white hover:bg-primary/90 transition-colors"
            aria-label="Send message"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        )}
      </form>
    </div>
  );
};
