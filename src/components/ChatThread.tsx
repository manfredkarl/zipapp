
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageArea } from "./chat/ChatMessageArea";
import { ChatInputArea } from "./chat/ChatInputArea";
import { useChatMessages } from "@/hooks/use-chat-messages";
import { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter, 
  DialogTrigger 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ChatThreadProps {
  projectId?: string;
}

const ChatThread = ({ projectId = "main" }: ChatThreadProps) => {
  const { 
    messages, 
    addTextMessage, 
    addImageMessage, 
    addVideoMessage, 
    addDocumentMessage,
    addServiceMessage,
    addOfferMessage,
    addOrderMessage,
    addProgressMessage,
    addInvoiceMessage,
    addPaymentMessage,
    addClosingMessage
  } = useChatMessages(projectId);
  
  const [isBusinessActionOpen, setIsBusinessActionOpen] = useState(false);
  const [businessAction, setBusinessAction] = useState<
    "service" | "offer" | "order" | "progress" | "invoice" | "payment" | "closing" | ""
  >("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fileType = file.type.split('/')[0];
    if (fileType === 'image') {
      addImageMessage(file);
    } else if (fileType === 'video') {
      addVideoMessage(file);
    } else {
      addDocumentMessage(file);
    }
  };

  // Mock service data for demo
  const sampleServices = [
    {
      id: "s1",
      name: "Foundation Repair",
      description: "Complete repair of foundation cracks and structural issues",
      price: 2500,
      unit: "job"
    },
    {
      id: "s2",
      name: "Waterproofing",
      description: "Basement waterproofing treatment",
      price: 1200,
      unit: "job"
    },
    {
      id: "s3",
      name: "Roof Replacement",
      description: "Complete roof tear-off and replacement with quality materials",
      price: 8500,
      unit: "job"
    }
  ];

  const handleBusinessAction = (type: typeof businessAction) => {
    setBusinessAction(type);
    setIsBusinessActionOpen(true);
  };

  const handleSendBusinessAction = () => {
    switch (businessAction) {
      case "service":
        addServiceMessage(sampleServices[0]);
        break;
      case "offer":
        addOfferMessage({
          id: Date.now().toString(),
          services: sampleServices.slice(0, 2),
          totalPrice: 3700,
          estimatedDuration: "5-7 business days",
          notes: "Includes all materials and labor"
        });
        break;
      case "order":
        addOrderMessage({
          id: Date.now().toString(),
          offerId: "o1",
          status: "accepted",
          acceptedAt: new Date()
        });
        break;
      case "progress":
        addProgressMessage({
          id: Date.now().toString(),
          orderId: "ord1",
          status: "in_progress",
          description: "Excavation completed, foundation reinforcement in progress",
          percentage: 40
        });
        break;
      case "invoice":
        addInvoiceMessage({
          id: Date.now().toString(),
          orderId: "ord1",
          amount: 3700,
          currency: "USD",
          dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
          status: "pending",
          items: [
            {
              description: "Foundation Repair",
              quantity: 1,
              unitPrice: 2500,
              total: 2500
            },
            {
              description: "Waterproofing",
              quantity: 1,
              unitPrice: 1200,
              total: 1200
            }
          ]
        });
        break;
      case "payment":
        addPaymentMessage({
          id: Date.now().toString(),
          invoiceId: "inv1",
          amount: 3700,
          currency: "USD",
          method: "Credit Card",
          date: new Date()
        });
        break;
      case "closing":
        addClosingMessage({
          id: Date.now().toString(),
          orderId: "ord1",
          date: new Date(),
          feedback: "Great work on the foundation repairs! Everything looks solid and was completed on schedule.",
          rating: 5
        });
        break;
    }
    setIsBusinessActionOpen(false);
  };

  const renderBusinessActionContent = () => {
    switch (businessAction) {
      case "service":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Add Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {sampleServices.map(service => (
                <div key={service.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{service.name}</h4>
                    <span>${service.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </>
        );
      
      case "offer":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Create Offer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Services</Label>
                {sampleServices.map(service => (
                  <div key={service.id} className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="rounded" />
                    <span>{service.name} - ${service.price}</span>
                  </div>
                ))}
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Add any additional notes..." />
              </div>
            </div>
          </>
        );
      
      case "progress":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Update Progress</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Completion Percentage</Label>
                <Input type="number" min="0" max="100" placeholder="40" />
              </div>
              <div>
                <Label>Status Update</Label>
                <Textarea placeholder="Describe the current progress..." />
              </div>
            </div>
          </>
        );
      
      default:
        return (
          <div className="py-4">
            <p>Configure {businessAction} details...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader projectId={projectId} />
      
      <ChatMessageArea messages={messages} />
      
      <div className="px-4 py-2 border-t bg-white">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="mb-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Business Action
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="start">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("service")}
              >
                Add Service
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("offer")}
              >
                Create Offer
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("order")}
              >
                Update Order
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("progress")}
              >
                Update Progress
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("invoice")}
              >
                Send Invoice
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("payment")}
              >
                Record Payment
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("closing")}
              >
                Close Project
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <ChatInputArea 
          onSendMessage={addTextMessage}
          onFileUpload={handleFileUpload}
        />
      </div>

      <Dialog open={isBusinessActionOpen} onOpenChange={setIsBusinessActionOpen}>
        <DialogContent>
          {renderBusinessActionContent()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBusinessActionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendBusinessAction}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatThread;
