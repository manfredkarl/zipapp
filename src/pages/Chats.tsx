
import { useIsMobile } from "@/hooks/use-mobile";
import ChatThread from "@/components/ChatThread";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MainProject {
  name: string;
  type: 'main';
  subProjects: string[];
  progress: number;
}

interface SubProject {
  name: string;
  type: 'sub';
  parentId: string;
  progress: number;
}

type Project = MainProject | SubProject;

// Mock data structure for chats
const chatList: Record<string, Project> = {
  main: {
    name: "Downtown Plaza Renovation",
    type: "main",
    subProjects: ["1", "2", "3"],
    progress: 35
  } as MainProject,
  "1": {
    name: "Plaza Foundation Renovation",
    type: "sub",
    parentId: "main",
    progress: 65
  } as SubProject,
  "2": {
    name: "Landscaping & Gardens",
    type: "sub",
    parentId: "main",
    progress: 25
  } as SubProject,
  "3": {
    name: "Fountain Installation",
    type: "sub",
    parentId: "main",
    progress: 10
  } as SubProject
};

const COLORS = ['#0088FE', '#E7E7E7'];

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
    setCurrentView("chat");
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

  const renderProgressChart = (project: Project, size: number) => {
    const data = [
      { value: project.progress },
      { value: 100 - project.progress }
    ];

    return (
      <div 
        className="cursor-pointer" 
        onClick={(e) => handleProgressClick(e, project.type === 'sub' ? project.parentId : 'main')}
      >
        <PieChart width={size} height={size}>
          <Pie
            data={data}
            innerRadius={size * 0.35}
            outerRadius={size * 0.45}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2" 
          style={{ 
            left: '50%', 
            top: '50%',
            fontSize: size * 0.25
          }}
        >
          {project.progress}%
        </div>
      </div>
    );
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
            <Collapsible
              key={mainId}
              open={expandedProjects[mainId]}
              onOpenChange={() => toggleProjectExpand(mainId)}
              className="border-b"
            >
              <CollapsibleTrigger className="w-full">
                <button
                  onClick={() => handleProjectSelect(mainId)}
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
                      {renderProgressChart(mainChat, 48)}
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
                      onClick={() => handleProjectSelect(subId)}
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
                          {renderProgressChart(subProject, 48)}
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

        <Dialog open={isProgressDialogOpen} onOpenChange={setIsProgressDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Progress</DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="py-4">
                <Slider
                  defaultValue={[(chatList[selectedProject] as SubProject).progress]}
                  max={100}
                  step={1}
                  onValueChange={handleProgressChange}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
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

      <Dialog open={isProgressDialogOpen} onOpenChange={setIsProgressDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Progress (%)</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="py-4">
              <Slider
                defaultValue={[chatList[selectedProject].progress]}
                max={100}
                step={1}
                onValueChange={handleProgressChange}
              />
              <div className="mt-2 text-center text-sm text-gray-600">
                {chatList[selectedProject].progress}%
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chats;
