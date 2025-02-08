
import Sidebar from "@/components/Sidebar";
import ProjectHeader from "@/components/ProjectHeader";
import ChatThread from "@/components/ChatThread";
import ReceiptForm from "@/components/ReceiptForm";

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader />
        <div className="flex-1 flex overflow-hidden p-4">
          <div className="flex-1 flex flex-col mr-4">
            <h2 className="text-lg font-medium mb-4">Project Chat</h2>
            <ChatThread />
          </div>
          <div className="w-96">
            <h2 className="text-lg font-medium mb-4">New Receipt</h2>
            <ReceiptForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
