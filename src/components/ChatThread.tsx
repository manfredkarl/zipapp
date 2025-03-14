
import { chatList } from "./chat/types";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageArea } from "./chat/ChatMessageArea";
import { ChatInputArea } from "./chat/ChatInputArea";
import { useChatMessages } from "@/hooks/use-chat-messages";

interface ChatThreadProps {
  projectId?: string;
}

const ChatThread = ({ projectId = "main" }: ChatThreadProps) => {
  const { messages, addTextMessage, addImageMessage, addVideoMessage, addDocumentMessage } = useChatMessages(projectId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fileType = file.type.split('/')[0];
    if (fileType === 'image') {
      addImageMessage(file);
    } else if (fileType === 'video') {
      addVideoMessage(file);
    } else {
      addDocumentMessage(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader projectId={projectId} />
      
      <ChatMessageArea messages={messages} />

      <ChatInputArea 
        onSendMessage={addTextMessage}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default ChatThread;
