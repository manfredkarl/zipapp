
import { useIsMobile } from "@/hooks/use-mobile";
import ChatThread from "@/components/ChatThread";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock data structure for chats
const chatList = {
  main: {
    name: "Downtown Plaza Renovation",
    type: "main",
    subProjects: ["1", "2", "3"]
  },
  "1": {
    name: "Plaza Foundation Renovation",
    type: "sub",
    parentId: "main"
  },
  "2": {
    name: "Landscaping & Gardens",
    type: "sub",
    parentId: "main"
  },
  "3": {
    name: "Fountain Installation",
    type: "sub",
    parentId: "main"
  }
};

const Chats = () => {
  const isMobile = useIsMobile();
  const [currentView, setCurrentView] = useState<"list" | "chat">(isMobile ? "list" : "chat");
  const [currentProject, setCurrentProject] = useState("main");

  const handleBack = () => {
    if (currentView === "chat") {
      setCurrentView("list");
    }
  };

  const handleProjectSelect = (projectId: string) => {
    setCurrentProject(projectId);
    setCurrentView("chat");
  };

  const renderChatList = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-primary text-white shadow-md">
        <h1 className="text-xl font-semibold">Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {Object.entries(chatList).map(([id, chat]) => (
          <button
            key={id}
            onClick={() => handleProjectSelect(id)}
            className={cn(
              "w-full text-left p-4 hover:bg-gray-50 transition-colors border-b",
              chat.type === "sub" && "pl-8 bg-gray-50"
            )}
          >
            <div className="font-medium">{chat.name}</div>
            <div className="text-sm text-gray-500">
              Last message from project team
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="h-screen bg-gray-50">
        {currentView === "chat" ? (
          <>
            <div className="fixed top-0 left-0 right-0 z-10 bg-primary text-white shadow-md">
              <div className="flex items-center p-4">
                <button onClick={handleBack} className="p-1 -ml-2">
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <span className="ml-2 font-medium">{chatList[currentProject]?.name}</span>
              </div>
            </div>
            <div className="h-full pt-16 pb-0">
              <ChatThread projectId={currentProject} />
            </div>
          </>
        ) : (
          renderChatList()
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-80 border-r bg-white">
        {renderChatList()}
      </div>
      <div className="flex-1">
        <ChatThread projectId={currentProject} />
      </div>
    </div>
  );
};

export default Chats;
