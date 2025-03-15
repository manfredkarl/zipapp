
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState("chat");
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {!isMobile && (
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader onTeamClick={() => setIsTeamDialogOpen(true)} />
        
        {isMobile ? (
          <>
            <Tabs 
              defaultValue="chat" 
              className="w-full flex-1 flex flex-col"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-3 mb-2 w-full">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="receipt">Receipt</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="flex-1 flex flex-col h-[calc(100vh-110px)]">
                <ChatThread />
              </TabsContent>
              
              <TabsContent value="files" className="p-4">
                <h2 className="text-lg font-medium mb-4">Project Files</h2>
                <FileList />
              </TabsContent>
              
              <TabsContent value="receipt" className="p-4">
                <h2 className="text-lg font-medium mb-4">New Receipt</h2>
                <ReceiptForm />
              </TabsContent>
            </Tabs>
          </>
        ) : (
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
        )}
      </div>

      <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
        <DialogContent className={isMobile ? "w-[calc(100%-2rem)] max-w-md p-4" : ""}>
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
