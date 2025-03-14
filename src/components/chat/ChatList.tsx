
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatList, MainProject, SubProject } from "./types";
import { ProgressChart } from "./ProgressChart";

interface ChatListProps {
  onProjectSelect: (projectId: string) => void;
  onProgressClick: (e: React.MouseEvent, projectId: string) => void;
  expandedProjects: Record<string, boolean>;
  onProjectExpand: (projectId: string) => void;
}

export const ChatList = ({ 
  onProjectSelect, 
  onProgressClick, 
  expandedProjects, 
  onProjectExpand 
}: ChatListProps) => {
  const mainProjects = Object.entries(chatList).filter(([_, chat]) => chat.type === "main") as [string, MainProject][];

  // Helper function to handle project expansion
  const handleProjectClick = (e: React.MouseEvent, projectId: string) => {
    onProjectSelect(projectId);
    onProjectExpand(projectId);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-primary text-white shadow-md">
        <h1 className="text-xl font-semibold">Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {mainProjects.map(([mainId, mainChat]) => (
          <div key={mainId} className="border-b">
            <div
              onClick={(e) => handleProjectClick(e, mainId)}
              className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
            >
              <div>
                <div className="font-medium">{mainChat.name}</div>
                <div className="text-sm text-gray-500">
                  Main project chat
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                  <ProgressChart
                    project={mainChat}
                    size={48}
                    onClick={(e) => {
                      e.stopPropagation();
                      onProgressClick(e, mainId);
                    }}
                  />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onProjectExpand(mainId);
                  }}
                  className="focus:outline-none"
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      expandedProjects[mainId] ? "transform rotate-180" : ""
                    )}
                  />
                </button>
              </div>
            </div>
            
            {expandedProjects[mainId] && mainChat.subProjects?.map((subId) => {
              const subProject = chatList[subId] as SubProject;
              return (
                <div
                  key={subId}
                  onClick={() => onProjectSelect(subId)}
                  className="w-full text-left p-4 pl-8 hover:bg-gray-50 transition-colors border-t bg-gray-50/50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{subProject.name}</div>
                      <div className="text-sm text-gray-500">
                        Sub-project chat
                      </div>
                    </div>
                    <div className="relative w-12 h-12">
                      <ProgressChart
                        project={subProject}
                        size={48}
                        onClick={(e) => {
                          e.stopPropagation();
                          onProgressClick(e, subProject.parentId);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
