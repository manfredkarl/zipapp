
import Sidebar from "@/components/Sidebar";
import ProjectHeader from "@/components/ProjectHeader";
import ChatThread from "@/components/ChatThread";
import ReceiptForm from "@/components/ReceiptForm";
import FileList from "@/components/FileList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock team members data
const teamMembers = [
  { id: 1, name: "John Smith", role: "Project Manager", avatar: "/placeholder.svg" },
  { id: 2, name: "Sarah Johnson", role: "Architect", avatar: "/placeholder.svg" },
  { id: 3, name: "Mike Davis", role: "Construction Lead", avatar: "/placeholder.svg" },
  { id: 4, name: "Lisa Chen", role: "Designer", avatar: "/placeholder.svg" },
];

const Index = () => {
  const isMobile = useIsMobile();
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {!isMobile && (
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader onTeamClick={() => setIsTeamDialogOpen(true)} />
        <ScrollArea className="flex-1">
          <div className="flex flex-col lg:flex-row p-4 min-h-full gap-4">
            <div className="flex-1 flex flex-col gap-4 lg:mr-4">
              <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-medium mb-4">Project Chat</h2>
                <div className="flex-1 min-h-[300px]">
                  <ChatThread />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-medium mb-4">Project Files</h2>
                <FileList />
              </div>
            </div>
            <div className="w-full lg:w-96 bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium mb-4">New Receipt</h2>
              <ReceiptForm />
            </div>
          </div>
        </ScrollArea>
      </div>

      <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Team Members</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
