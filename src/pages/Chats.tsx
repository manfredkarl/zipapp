
import ChatThread from "@/components/ChatThread";
import ProjectHeader from "@/components/ProjectHeader";
import Sidebar from "@/components/Sidebar";

const Chats = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader />
        <div className="flex-1 p-4">
          <h2 className="text-lg font-medium mb-4">Project Chat</h2>
          <ChatThread />
        </div>
      </div>
    </div>
  );
};

export default Chats;
