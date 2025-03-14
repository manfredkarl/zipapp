
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageIcon, Phone, Video, Users } from "lucide-react";
import { chatList } from "./types";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ChatHeaderProps {
  projectId: string;
}

export const ChatHeader = ({ projectId }: ChatHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const project = chatList[projectId];
  
  // Mock data for members and media
  const members = [
    { id: "1", name: "John Smith", role: "Project Manager", avatar: "/placeholder.svg", online: true },
    { id: "2", name: "Sarah Johnson", role: "Architect", avatar: "/placeholder.svg", online: false },
    { id: "3", name: "Mike Davis", role: "Construction Lead", avatar: "/placeholder.svg", online: true },
  ];
  
  const media = [
    { id: "1", type: "image", url: "/placeholder.svg", timestamp: new Date(Date.now() - 86400000) },
    { id: "2", type: "image", url: "/placeholder.svg", timestamp: new Date(Date.now() - 172800000) },
    { id: "3", type: "doc", name: "Project_Plan.pdf", url: "#", timestamp: new Date(Date.now() - 259200000) },
    { id: "4", type: "doc", name: "Budget_Estimation.xlsx", url: "#", timestamp: new Date(Date.now() - 345600000) },
  ];
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white border-b shadow-sm"
    >
      <div className="p-4 flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-3 flex-1 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt={project?.name} />
              <AvatarFallback>{project?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="font-medium">{project?.name}</h2>
              <span className="text-xs text-gray-500">
                {members.filter(m => m.online).length} online • {members.length} members
              </span>
            </div>
          </div>
        </CollapsibleTrigger>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
      
      <CollapsibleContent>
        <div className="px-4 pb-4 space-y-4">
          {/* Chat Picture */}
          <div className="flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt={project?.name} />
              <AvatarFallback>{project?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Members */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-1" /> Members
            </h3>
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                  <div className="relative">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {member.online && (
                      <span className="absolute bottom-0 right-2 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{member.name}</span>
                    <span className="text-xs text-gray-500">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Media */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <ImageIcon className="h-4 w-4 mr-1" /> Media, Links and Docs
            </h3>
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2">
                {media.filter(item => item.type === 'image').map((item) => (
                  <Card key={item.id} className="aspect-square overflow-hidden">
                    <img src={item.url} alt="Media" className="w-full h-full object-cover" />
                  </Card>
                ))}
              </div>
              
              <div className="mt-2">
                {media.filter(item => item.type === 'doc').map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <ImageIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button variant="ghost" className="w-full mt-2 text-primary">
              <ImageIcon className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
