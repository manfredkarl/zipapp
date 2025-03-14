
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  File, 
  CheckCircle2, 
  Clock, 
  Tool, 
  FileText, 
  Briefcase, 
  BarChart, 
  Receipt, 
  CreditCard, 
  CheckSquare 
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  Service, 
  Offer, 
  Order, 
  Progress as ProgressType, 
  Invoice, 
  Payment, 
  Closing, 
  MessageType 
} from "@/hooks/use-chat-messages";

interface MessageBubbleProps {
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  documentName?: string;
  isSent?: boolean;
  messageType: MessageType;
  service?: Service;
  offer?: Offer;
  order?: Order;
  progress?: ProgressType;
  invoice?: Invoice;
  payment?: Payment;
  closing?: Closing;
}

const MessageBubble = ({ 
  content, 
  sender, 
  timestamp, 
  imageUrl, 
  videoUrl, 
  documentUrl,
  documentName,
  isSent = false,
  messageType,
  service,
  offer,
  order,
  progress,
  invoice,
  payment,
  closing
}: MessageBubbleProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isMobile = useIsMobile();

  const renderSpecialContent = () => {
    switch (messageType) {
      case "service":
        return service ? (
          <div className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <Tool className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium">Service Offering</h4>
            </div>
            <h5 className="font-semibold text-lg">{service.name}</h5>
            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-medium">${service.price.toFixed(2)} / {service.unit}</span>
              <Button size="sm" variant="outline">Request Details</Button>
            </div>
          </div>
        ) : null;
      
      case "offer":
        return offer ? (
          <div className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <Briefcase className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium">Project Offer</h4>
            </div>
            
            <div className="space-y-2 mb-3">
              {offer.services.map(service => (
                <div key={service.id} className="p-2 bg-gray-50 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">{service.name}</span>
                    <span>${service.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-2 mb-2">
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>${offer.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Estimated Duration:</span>
                <span>{offer.estimatedDuration}</span>
              </div>
              {offer.notes && (
                <p className="text-xs text-gray-600 mt-1">{offer.notes}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button size="sm" variant="outline">Decline</Button>
              <Button size="sm">Accept Offer</Button>
            </div>
          </div>
        ) : null;
      
      case "order":
        return order ? (
          <div className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <CheckCircle2 className={`h-5 w-5 mr-2 ${order.status === 'accepted' ? 'text-green-600' : 'text-amber-600'}`} />
              <h4 className="font-medium">Order {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</h4>
            </div>
            
            <div className="flex justify-between text-sm mb-1">
              <span>Order ID:</span>
              <span className="font-mono">{order.id}</span>
            </div>
            
            <div className="flex justify-between text-sm mb-1">
              <span>Offer Reference:</span>
              <span className="font-mono">{order.offerId}</span>
            </div>
            
            {order.acceptedAt && (
              <div className="flex justify-between text-sm">
                <span>Accepted On:</span>
                <span>{order.acceptedAt.toLocaleDateString()} {order.acceptedAt.toLocaleTimeString()}</span>
              </div>
            )}
            
            <div className="flex justify-end mt-3">
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </div>
        ) : null;
      
      case "progress":
        return progress ? (
          <div className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <BarChart className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-medium">Progress Update</h4>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Status:</span>
                <span className={progress.status === 'completed' ? 'text-green-600 font-medium' : 
                    progress.status === 'in_progress' ? 'text-amber-600 font-medium' : 
                    'text-gray-600 font-medium'}>
                  {progress.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Completion:</span>
                  <span>{progress.percentage}%</span>
                </div>
                <Progress value={progress.percentage} className="h-2" />
              </div>
            </div>
            
            <p className="text-sm mt-2 p-2 bg-gray-50 rounded-md">
              {progress.description}
            </p>
          </div>
        ) : null;
      
      case "invoice":
        return invoice ? (
          <div className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <Receipt className={`h-5 w-5 mr-2 ${invoice.status === 'paid' ? 'text-green-600' : 
                invoice.status === 'overdue' ? 'text-red-600' : 'text-primary'}`} />
              <h4 className="font-medium">Invoice</h4>
              {invoice.status && (
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                  invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                  invoice.status === 'overdue' ? 'bg-red-100 text-red-800' : 
                  'bg-amber-100 text-amber-800'
                }`}>
                  {invoice.status.toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="text-xs grid grid-cols-4 gap-1">
                  <span className="col-span-2">{item.description}</span>
                  <span className="text-right">{item.quantity} x ${item.unitPrice.toFixed(2)}</span>
                  <span className="text-right">${item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-2">
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>${invoice.amount.toFixed(2)} {invoice.currency}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Due Date:</span>
                <span>{invoice.dueDate.toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-3">
              <Button size="sm" variant="outline">Download</Button>
              <Button size="sm">Pay Now</Button>
            </div>
          </div>
        ) : null;
      
      case "payment":
        return payment ? (
          <div className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="flex items-center mb-3">
              <CreditCard className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium">Payment Received</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">${payment.amount.toFixed(2)} {payment.currency}</span>
              
              <span className="text-gray-600">Payment Method:</span>
              <span>{payment.method}</span>
              
              <span className="text-gray-600">Date:</span>
              <span>{payment.date.toLocaleDateString()}</span>
              
              <span className="text-gray-600">Invoice:</span>
              <span className="font-mono">{payment.invoiceId}</span>
            </div>
            
            <div className="flex justify-end mt-3">
              <Button size="sm" variant="outline">View Receipt</Button>
            </div>
          </div>
        ) : null;
      
      case "closing":
        return closing ? (
          <div className="mt-2 p-3 bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="flex items-center mb-3">
              <CheckSquare className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium">Project Completed</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600">Date Closed:</span>
              <span>{closing.date.toLocaleDateString()}</span>
              
              <span className="text-gray-600">Order Reference:</span>
              <span className="font-mono">{closing.orderId}</span>
              
              {closing.rating && (
                <>
                  <span className="text-gray-600">Rating:</span>
                  <span>{"★".repeat(closing.rating)}</span>
                </>
              )}
            </div>
            
            {closing.feedback && (
              <div className="mt-2">
                <span className="text-gray-600 text-sm">Feedback:</span>
                <p className="text-sm mt-1 p-2 bg-gray-50 rounded-md">{closing.feedback}</p>
              </div>
            )}
            
            <div className="flex justify-center mt-3">
              <Button size="sm" variant="outline">Archive Project</Button>
            </div>
          </div>
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "flex w-full animate-slideIn",
        isMobile ? "max-w-[85%]" : "max-w-xs md:max-w-md lg:max-w-lg",
        isSent ? "ml-auto" : "mr-auto"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-full break-words",
          isSent ? "bg-primary/10" : "bg-gray-100"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-xs md:text-sm">{sender}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm md:text-base">{content}</p>
        
        {imageUrl && (
          <div className="mt-2 relative">
            <img
              src={imageUrl}
              alt="Message attachment"
              className={cn(
                "rounded-md max-w-full transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
            )}
          </div>
        )}
        
        {videoUrl && (
          <div className="mt-2">
            <video
              src={videoUrl}
              controls
              className={cn(
                "rounded-md max-w-full transition-opacity duration-300",
                videoLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoadedData={() => setVideoLoaded(true)}
            />
          </div>
        )}
        
        {documentUrl && documentName && (
          <div className="mt-2">
            <a 
              href={documentUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-2 bg-white rounded-md border hover:bg-gray-50 transition-colors"
            >
              <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                <File className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[200px]">{documentName}</span>
                <span className="text-xs text-gray-500">Document</span>
              </div>
            </a>
          </div>
        )}
        
        {renderSpecialContent()}
      </div>
    </div>
  );
};

export default MessageBubble;
