
import { HomeIcon, MessageSquareIcon, ReceiptIcon, FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Chats", href: "/chats", icon: MessageSquareIcon },
  { name: "Receipts", href: "/receipts", icon: ReceiptIcon },
  { name: "Files", href: "/files", icon: FolderIcon },
];

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col bg-white border-r animate-fadeIn">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-semibold">Construction Hub</h1>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
