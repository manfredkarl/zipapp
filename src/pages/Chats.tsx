
import { useIsMobile } from "@/hooks/use-mobile";
import ChatThread from "@/components/ChatThread";
import ProjectHeader from "@/components/ProjectHeader";
import Sidebar from "@/components/Sidebar";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Chats = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [currentProject, setCurrentProject] = useState("main");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-64 flex-shrink-0 transition-all duration-300 ease-in-out",
          isMobile && "fixed inset-y-0 left-0 z-40",
          isMobile && !showSidebar && "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div 
        className={cn(
          "flex-1 flex flex-col overflow-hidden",
          isMobile && showSidebar && "opacity-50"
        )}
      >
        {!isMobile && <ProjectHeader onProjectSelect={(id) => setCurrentProject(id)} />}
        <div className="flex-1 p-4 flex flex-col">
          {!isMobile && <h2 className="text-lg font-medium mb-4">Project Chat</h2>}
          <ChatThread projectId={currentProject} />
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && showSidebar && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default Chats;
