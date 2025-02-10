
import { useIsMobile } from "@/hooks/use-mobile";
import ChatThread from "@/components/ChatThread";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface MainProject {
  name: string;
  type: 'main';
  subProjects: string[];
}

interface SubProject {
  name: string;
  type: 'sub';
  parentId: string;
}

type Project = MainProject | SubProject;

// Mock data structure for chats
const chatList: Record<string, Project> = {
  main: {
    name: "Downtown Plaza Renovation",
    type: "main",
    subProjects: ["1", "2", "3"]
  } as MainProject,
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

  const renderChatList = () => {
    const mainProjects = Object.entries(chatList).filter(([_, chat]) => chat.type === "main") as [string, MainProject][];
    
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 bg-primary text-white shadow-md">
          <h1 className="text-xl font-semibold">Chats</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mainProjects.map(([mainId, mainChat]) => (
            <div key={mainId} className="border-b">
              <button
                onClick={() => handleProjectSelect(mainId)}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">{mainChat.name}</div>
                <div className="text-sm text-gray-500">
                  Main project chat
                </div>
              </button>
              {mainChat.subProjects?.map((subId) => (
                <button
                  key={subId}
                  onClick={() => handleProjectSelect(subId)}
                  className="w-full text-left p-4 pl-8 hover:bg-gray-50 transition-colors border-t bg-gray-50/50"
                >
                  <div className="font-medium">{chatList[subId].name}</div>
                  <div className="text-sm text-gray-500">
                    Sub-project chat
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="h-screen bg-gray-50">
        {currentView === "chat" ? (
          <>
            <div className="fixed top-0 left-0 right-0 z-10 bg-primary text-white shadow-md">
              <div className="flex items-center p-4">
                <button 
                  onClick={handleBack} 
                  className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <span className="ml-2 font-medium truncate">
                  {chatList[currentProject]?.name}
                </span>
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
      <div className="w-80 border-r bg-white shadow-lg">
        {renderChatList()}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 shadow-md flex items-center">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <span className="ml-3 font-medium text-lg truncate">
            {chatList[currentProject]?.name}
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatThread projectId={currentProject} />
        </div>
      </div>
    </div>
  );
};

export default Chats;
