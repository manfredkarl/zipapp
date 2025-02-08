
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  isSent?: boolean;
}

const MessageBubble = ({ content, sender, timestamp, imageUrl, isSent = false }: MessageBubbleProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={cn(
        "flex w-full max-w-xs md:max-w-md lg:max-w-lg animate-slideIn",
        isSent ? "ml-auto" : "mr-auto"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-full break-words",
          isSent ? "bg-chat-sent" : "bg-chat-bubble"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{sender}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm">{content}</p>
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
      </div>
    </div>
  );
};

export default MessageBubble;
