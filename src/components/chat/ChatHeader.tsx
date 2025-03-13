
import { Button } from "../ui/button";
import { Settings, Users, Info } from "lucide-react";
import { chatList } from "./types";

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
  return (
    <div className="bg-white border-b p-4 flex items-center justify-between">
      <div 
        className="flex items-center flex-1 cursor-pointer"
        onClick={onInfoClick}
      >
        <h2 className="font-medium">{chatList[projectId]?.name}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="text-gray-500 hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onMembersClick}
          className="text-gray-500 hover:text-gray-900"
        >
          <Users className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onInfoClick}
          className="text-gray-500 hover:text-gray-900"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
