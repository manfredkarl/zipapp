import { useState } from "react";
import { chatList } from "./chat/types";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageArea } from "./chat/ChatMessageArea";
import { ChatInputArea } from "./chat/ChatInputArea";
import { useChatMessages } from "@/hooks/use-chat-messages";

interface ChatThreadProps {
  projectId?: string;
}

const ChatThread = ({ projectId = "main" }: ChatThreadProps) => {
  const handleInfoClick = () => {};
  const handleSettingsClick = () => {};
  const handleMembersClick = () => {};
  
  const { messages, addTextMessage, addImageMessage, addVideoMessage } = useChatMessages(projectId);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    addImageMessage(file);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    addVideoMessage(file);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader 
        projectId={projectId}
        onInfoClick={handleInfoClick}
        onSettingsClick={handleSettingsClick}
        onMembersClick={handleMembersClick}
      />
      
      <ChatMessageArea messages={messages} />

      <ChatInputArea 
        onSendMessage={addTextMessage}
        onImageUpload={handleFileUpload}
        onVideoUpload={handleVideoUpload}
      />
    </div>
  );
};

export default ChatThread;
