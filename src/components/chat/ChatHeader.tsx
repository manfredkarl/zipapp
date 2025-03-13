
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageIcon, Users } from "lucide-react";
import { chatList } from "./types";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface ChatHeaderProps {
  projectId: string;
  onInfoClick: () => void;
  onSettingsClick: () => void;
  onMembersClick: () => void;
}

export const ChatHeader = ({
  projectId,
  onInfoClick,
  onSettingsClick,
  onMembersClick
}: ChatHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const project = chatList[projectId];
  
  // Mock data for members and media
  const members = [
    { id: "1", name: "John Smith", avatar: "/placeholder.svg" },
    { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg" },
    { id: "3", name: "Mike Davis", avatar: "/placeholder.svg" },
  ];
  
  const media = [
    { id: "1", type: "image", url: "/placeholder.svg" },
    { id: "2", type: "image", url: "/placeholder.svg" },
    { id: "3", type: "image", url: "/placeholder.svg" },
    { id: "4", type: "image", url: "/placeholder.svg" },
  ];
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white border-b"
    >
      <div className="p-4 flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <div className="flex items-center flex-1 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
            <h2 className="font-medium">{project?.name}</h2>
          </div>
        </CollapsibleTrigger>
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
            <h3 className="text-sm font-medium text-gray-500 mb-2">Members</h3>
            <div className="space-y-2">
              {members.map((member) => (
                <div key={member.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Media */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Media, Links and Docs</h3>
            <div className="grid grid-cols-4 gap-2">
              {media.map((item) => (
                <Card key={item.id} className="aspect-square overflow-hidden">
                  <img src={item.url} alt="Media" className="w-full h-full object-cover" />
                </Card>
              ))}
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
