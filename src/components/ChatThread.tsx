
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageArea } from "./chat/ChatMessageArea";
import { ChatInputArea } from "./chat/ChatInputArea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BusinessActionMenu } from "./business-actions/BusinessActionMenu";
import { BusinessActionDialog } from "./business-actions/BusinessActionDialog";
import { 
  useChatMessages, 
  Service, 
  Offer, 
  Order,
  Progress as ProgressType,
  Invoice,
  Payment,
  Closing
} from "@/hooks/use-chat-messages";

interface ChatThreadProps {
  projectId?: string;
}

const ChatThread = ({ projectId = "main" }: ChatThreadProps) => {
  const { toast } = useToast();
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

  const handleBusinessAction = (type: typeof businessAction) => {
    setBusinessAction(type);
    setIsBusinessActionOpen(true);
  };

  const handleSendService = (service: Service) => {
    addServiceMessage(service);
    toast({
      title: "Action Completed",
      description: `Successfully sent the service message`,
    });
  };

  const handleSendOffer = (offer: Offer) => {
    addOfferMessage(offer);
    toast({
      title: "Action Completed",
      description: `Successfully sent the offer message`,
    });
  };

  const handleSendOrder = (order: Order) => {
    addOrderMessage(order);
    toast({
      title: "Action Completed",
      description: `Successfully sent the order message`,
    });
  };

  const handleSendProgress = (progress: ProgressType) => {
    addProgressMessage(progress);
    toast({
      title: "Action Completed",
      description: `Successfully sent the progress message`,
    });
  };

  const handleSendInvoice = (invoice: Invoice) => {
    addInvoiceMessage(invoice);
    toast({
      title: "Action Completed",
      description: `Successfully sent the invoice message`,
    });
  };

  const handleSendPayment = (payment: Payment) => {
    addPaymentMessage(payment);
    toast({
      title: "Action Completed",
      description: `Successfully sent the payment message`,
    });
  };

  const handleSendClosing = (closing: Closing) => {
    addClosingMessage(closing);
    toast({
      title: "Action Completed",
      description: `Successfully sent the closing message`,
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader projectId={projectId} />
      
      <ChatMessageArea messages={messages} />
      
      <div className="px-4 py-2 border-t bg-white">
        <BusinessActionMenu onActionSelect={handleBusinessAction} />
        
        <ChatInputArea 
          onSendMessage={addTextMessage}
          onFileUpload={handleFileUpload}
        />
      </div>

      <BusinessActionDialog 
        isOpen={isBusinessActionOpen}
        onOpenChange={setIsBusinessActionOpen}
        action={businessAction}
        onSendService={handleSendService}
        onSendOffer={handleSendOffer}
        onSendOrder={handleSendOrder}
        onSendProgress={handleSendProgress}
        onSendInvoice={handleSendInvoice}
        onSendPayment={handleSendPayment}
        onSendClosing={handleSendClosing}
      />
    </div>
  );
};

export default ChatThread;
