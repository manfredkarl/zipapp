
import Sidebar from "@/components/Sidebar";
import ProjectHeader from "@/components/ProjectHeader";
import ChatThread from "@/components/ChatThread";
import ReceiptForm from "@/components/ReceiptForm";
import FileList from "@/components/FileList";

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
            <div className="flex-1 flex flex-col mb-4">
              <h2 className="text-lg font-medium mb-4">Project Chat</h2>
              <ChatThread />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-4">Project Files</h2>
              <FileList />
            </div>
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
