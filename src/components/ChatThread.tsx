
import { useState } from "react";
import { ImageIcon, SendIcon } from "lucide-react";
import MessageBubble from "./MessageBubble";

const ChatThread = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm animate-fadeIn">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageBubble
          content="Started work on the foundation today."
          sender="John Doe"
          timestamp={new Date(Date.now() - 3600000)}
        />
        <MessageBubble
          content="Here's the progress photo"
          sender="John Doe"
          timestamp={new Date(Date.now() - 3500000)}
          imageUrl="/placeholder.svg"
        />
        <MessageBubble
          content="Looks good! Keep up the great work."
          sender="Project Manager"
          timestamp={new Date(Date.now() - 1800000)}
          isSent
        />
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-600 transition-colors"
          >
            <ImageIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
