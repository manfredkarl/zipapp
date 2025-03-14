
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { File } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  documentName?: string;
  isSent?: boolean;
}

const MessageBubble = ({ 
  content, 
  sender, 
  timestamp, 
  imageUrl, 
  videoUrl, 
  documentUrl,
  documentName,
  isSent = false 
}: MessageBubbleProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "flex w-full animate-slideIn",
        isMobile ? "max-w-[85%]" : "max-w-xs md:max-w-md lg:max-w-lg",
        isSent ? "ml-auto" : "mr-auto"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-full break-words",
          isSent ? "bg-primary/10" : "bg-gray-100"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-xs md:text-sm">{sender}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm md:text-base">{content}</p>
        
        {imageUrl && (
          <div className="mt-2 relative">
            <img
              src={imageUrl}
              alt="Message attachment"
              className={cn(
                "rounded-md max-w-full transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
            )}
          </div>
        )}
        
        {videoUrl && (
          <div className="mt-2">
            <video
              src={videoUrl}
              controls
              className={cn(
                "rounded-md max-w-full transition-opacity duration-300",
                videoLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoadedData={() => setVideoLoaded(true)}
            />
          </div>
        )}
        
        {documentUrl && documentName && (
          <div className="mt-2">
            <a 
              href={documentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-2 bg-white rounded-md border hover:bg-gray-50 transition-colors"
            >
              <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                <File className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[200px]">{documentName}</span>
                <span className="text-xs text-gray-500">Document</span>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
