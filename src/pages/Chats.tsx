
import { useIsMobile } from "@/hooks/use-mobile";
import ChatThread from "@/components/ChatThread";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { chatList } from "@/components/chat/types";
import { ChatList } from "@/components/chat/ChatList";
import { ProgressDialog } from "@/components/chat/ProgressDialog";

const Chats = () => {
  const isMobile = useIsMobile();
  const [currentView, setCurrentView] = useState<"list" | "chat">(isMobile ? "list" : "chat");
  const [currentProject, setCurrentProject] = useState("main");
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const handleBack = () => {
    if (currentView === "chat") {
      setCurrentView("list");
    }
  };

  const handleProjectSelect = (projectId: string) => {
    setCurrentProject(projectId);
    if (isMobile) {
      setCurrentView("chat");
    }
  };

  const handleProgressClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setSelectedProject(projectId);
    setIsProgressDialogOpen(true);
  };

  const handleProgressChange = (value: number[]) => {
    if (selectedProject && chatList[selectedProject]) {
      chatList[selectedProject].progress = value[0];
    }
  };

  const toggleProjectExpand = (projectId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  if (isMobile) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
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
            <div className="flex-1 pt-16 pb-0 flex flex-col">
              <ChatThread projectId={currentProject} />
            </div>
          </>
        ) : (
          <ChatList
            onProjectSelect={handleProjectSelect}
            onProgressClick={handleProgressClick}
            expandedProjects={expandedProjects}
            onProjectExpand={toggleProjectExpand}
          />
        )}

        <ProgressDialog
          isOpen={isProgressDialogOpen}
          onOpenChange={setIsProgressDialogOpen}
          selectedProject={selectedProject}
          onProgressChange={handleProgressChange}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-80 border-r bg-white shadow-lg">
        <ChatList
          onProjectSelect={handleProjectSelect}
          onProgressClick={handleProgressClick}
          expandedProjects={expandedProjects}
          onProjectExpand={toggleProjectExpand}
        />
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

      <ProgressDialog
        isOpen={isProgressDialogOpen}
        onOpenChange={setIsProgressDialogOpen}
        selectedProject={selectedProject}
        onProgressChange={handleProgressChange}
      />
    </div>
  );
};

export default Chats;
