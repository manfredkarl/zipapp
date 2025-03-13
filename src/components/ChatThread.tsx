
import { useState } from "react";
import { chatList } from "./chat/types";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageArea } from "./chat/ChatMessageArea";
import { ChatInputArea } from "./chat/ChatInputArea";
import { ChatMembersDialog } from "./chat/ChatMembersDialog";
import { UserSettingsDialog } from "./chat/UserSettingsDialog";
import { ChatInfo } from "./chat/ChatInfo";
import { useChatMessages } from "@/hooks/use-chat-messages";

interface ChatThreadProps {
  projectId?: string;
}

const ChatThread = ({ projectId = "main" }: ChatThreadProps) => {
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);
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
        onInfoClick={() => setIsChatInfoOpen(true)}
        onSettingsClick={() => setIsSettingsDialogOpen(true)}
        onMembersClick={() => setIsMembersDialogOpen(true)}
      />
      
      <ChatMessageArea messages={messages} />

      <ChatInputArea 
        onSendMessage={addTextMessage}
        onImageUpload={handleFileUpload}
        onVideoUpload={handleVideoUpload}
      />

      <ChatMembersDialog 
        isOpen={isMembersDialogOpen}
        onOpenChange={setIsMembersDialogOpen}
        chatName={chatList[projectId]?.name || "Chat"}
      />

      <UserSettingsDialog
        isOpen={isSettingsDialogOpen}
        onOpenChange={setIsSettingsDialogOpen}
      />

      <ChatInfo
        isOpen={isChatInfoOpen}
        onOpenChange={setIsChatInfoOpen}
        project={chatList[projectId]}
      />
    </div>
  );
};

export default ChatThread;
