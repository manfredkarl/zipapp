
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Image as ImageIcon, 
  Star, 
  Palette, 
  Download, 
  MessageSquareLock, 
  Info, 
  Phone, 
  Video, 
  Search, 
  Flag, 
  X, 
  Archive
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Project } from "./types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChatMembersDialog } from "./ChatMembersDialog";

interface ChatInfoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | undefined;
}

export const ChatInfo = ({ isOpen, onOpenChange, project }: ChatInfoProps) => {
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  
  if (!project) return null;
  
  const memberCount = project.type === 'main' ? 5 : 3; // Mock data

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="overflow-y-auto">
          <SheetHeader className="text-center mb-6">
            <SheetTitle>{project.name}</SheetTitle>
          </SheetHeader>
          
          <div className="flex justify-center mb-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder.svg" alt={project.name} />
              <AvatarFallback>{project.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">{project.name}</h2>
            <p className="text-muted-foreground">
              {project.type === 'main' ? 'Project Group' : 'Sub-Project'} · {memberCount} Members
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full mb-1">
                <Phone className="h-6 w-6 text-green-500" />
              </Button>
              <span className="text-xs">Audio</span>
            </div>
            <div className="flex flex-col items-center">
              <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full mb-1">
                <Video className="h-6 w-6 text-green-500" />
              </Button>
              <span className="text-xs">Video</span>
            </div>
            <div className="flex flex-col items-center">
              <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full mb-1">
                <Search className="h-6 w-6 text-green-500" />
              </Button>
              <span className="text-xs">Search</span>
            </div>
          </div>
          
          <div className="space-y-1 mb-6">
            <Card className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center">
                <ImageIcon className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>Media, Links, and Docs</span>
              </div>
              <span className="text-muted-foreground">3,213</span>
            </Card>
            
            <Card className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors" 
                  onClick={() => setIsMembersDialogOpen(true)}>
              <div className="flex items-center">
                <Info className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>Members</span>
              </div>
              <span className="text-muted-foreground">{memberCount}</span>
            </Card>
            
            <Card className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center">
                <Star className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>Starred Messages</span>
              </div>
              <span className="text-muted-foreground">1</span>
            </Card>
            
            <Card className="p-4 flex items-center cursor-pointer hover:bg-accent/50 transition-colors">
              <Bell className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Notifications</span>
            </Card>
            
            <Card className="p-4 flex items-center cursor-pointer hover:bg-accent/50 transition-colors">
              <Palette className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Chat Design</span>
            </Card>
            
            <Card className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center">
                <Download className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>Save to Photos</span>
              </div>
              <span className="text-muted-foreground">Standard</span>
            </Card>
            
            <Card className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center">
                <MessageSquareLock className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>Self-deleting Messages</span>
              </div>
              <span className="text-muted-foreground">Off</span>
            </Card>
          </div>
          
          <div className="space-y-1">
            <Card className="p-4 flex items-center cursor-pointer hover:bg-accent/50 transition-colors">
              <Archive className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Archive Chat</span>
            </Card>
            
            <Card className="p-4 flex items-center cursor-pointer hover:bg-accent/50 transition-colors">
              <Flag className="mr-3 h-5 w-5 text-muted-foreground" />
              <span>Report Chat</span>
            </Card>
            
            <Card className="p-4 flex items-center cursor-pointer hover:bg-accent/50 transition-colors">
              <X className="mr-3 h-5 w-5 text-red-500" />
              <span className="text-red-500">Block Chat</span>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      
      <ChatMembersDialog 
        isOpen={isMembersDialogOpen}
        onOpenChange={setIsMembersDialogOpen}
        chatName={project.name}
      />
    </>
  );
};
