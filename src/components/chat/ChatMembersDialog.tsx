
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMember {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

interface ChatMembersDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  chatName: string;
}

// Mock data - in a real app this would come from your backend
const chatMembers: ChatMember[] = [
  { id: "1", name: "John Smith", avatar: "/placeholder.svg", role: "Project Manager" },
  { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg", role: "Architect" },
  { id: "3", name: "Mike Davis", avatar: "/placeholder.svg", role: "Construction Lead" },
];

const availableUsers: ChatMember[] = [
  { id: "4", name: "Lisa Chen", avatar: "/placeholder.svg", role: "Designer" },
  { id: "5", name: "David Wilson", avatar: "/placeholder.svg", role: "Engineer" },
];

export const ChatMembersDialog = ({ isOpen, onOpenChange, chatName }: ChatMembersDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{chatName}</DialogTitle>
          <DialogDescription>
            Manage chat members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 max-h-[60vh]">
          <div className="space-y-6 p-1">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Current Members</h3>
              {chatMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      {member.role && <div className="text-sm text-gray-500">{member.role}</div>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600">
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500">Add Members</h3>
              {availableUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      {user.role && <div className="text-sm text-gray-500">{user.role}</div>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-green-600">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
