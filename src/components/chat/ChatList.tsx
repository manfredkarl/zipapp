
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-primary text-white shadow-md">
        <h1 className="text-xl font-semibold">Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {mainProjects.map(([mainId, mainChat]) => (
          <Collapsible
            key={mainId}
            open={expandedProjects[mainId]}
            onOpenChange={() => onProjectExpand(mainId)}
            className="border-b"
          >
            <CollapsibleTrigger className="w-full">
              <button
                onClick={() => onProjectSelect(mainId)}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
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
                      onClick={(e) => onProgressClick(e, mainId)}
                    />
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      expandedProjects[mainId] ? "transform rotate-180" : ""
                    )}
                  />
                </div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {mainChat.subProjects?.map((subId) => {
                const subProject = chatList[subId] as SubProject;
                return (
                  <button
                    key={subId}
                    onClick={() => onProjectSelect(subId)}
                    className="w-full text-left p-4 pl-8 hover:bg-gray-50 transition-colors border-t bg-gray-50/50"
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
                          onClick={(e) => onProgressClick(e, subProject.parentId)}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};
