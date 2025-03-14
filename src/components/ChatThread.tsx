
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessageArea } from "./chat/ChatMessageArea";
import { ChatInputArea } from "./chat/ChatInputArea";
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
import { useState } from "react";
import { Button } from "./ui/button";
import { 
  PlusCircle, 
  Package, 
  Tag, 
  ClipboardEdit, 
  BarChart, 
  Receipt, 
  CreditCard, 
  CheckCircle 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useToast } from "@/hooks/use-toast";

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

  // State for form inputs
  const [serviceData, setServiceData] = useState<Service>({
    id: "",
    name: "",
    description: "",
    price: 0,
    unit: "job"
  });

  const [offerData, setOfferData] = useState({
    selectedServices: [] as string[],
    notes: "",
    estimatedDuration: "1-2 weeks"
  });

  const [orderStatus, setOrderStatus] = useState<Order["status"]>("accepted");

  const [progressData, setProgressData] = useState<{
    percentage: number;
    description: string;
    status: ProgressType["status"];
  }>({
    percentage: 0,
    description: "",
    status: "in_progress"
  });

  const [invoiceData, setInvoiceData] = useState({
    amount: 0,
    dueDate: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }]
  });

  const [paymentData, setPaymentData] = useState({
    amount: 0,
    method: "Credit Card"
  });

  const [closingData, setClosingData] = useState({
    feedback: "",
    rating: 5
  });

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
    
    // Reset form data when opening dialog
    if (type === "service") {
      setServiceData({
        id: `service-${Date.now()}`,
        name: "",
        description: "",
        price: 0,
        unit: "job"
      });
    } else if (type === "offer") {
      setOfferData({
        selectedServices: [],
        notes: "",
        estimatedDuration: "1-2 weeks"
      });
    } else if (type === "progress") {
      setProgressData({
        percentage: 0,
        description: "",
        status: "in_progress"
      });
    } else if (type === "invoice") {
      setInvoiceData({
        amount: 0,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
        items: [{ description: "", quantity: 1, unitPrice: 0 }]
      });
    } else if (type === "payment") {
      setPaymentData({
        amount: 0,
        method: "Credit Card"
      });
    } else if (type === "closing") {
      setClosingData({
        feedback: "",
        rating: 5
      });
    }
    
    setIsBusinessActionOpen(true);
  };

  const calculateTotalPrice = () => {
    return offerData.selectedServices.reduce((total, serviceId) => {
      const service = sampleServices.find(s => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const calculateInvoiceTotal = () => {
    return invoiceData.items.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  };

  const handleSendBusinessAction = () => {
    switch (businessAction) {
      case "service":
        if (!serviceData.name || !serviceData.description || serviceData.price <= 0) {
          toast({
            title: "Validation Error",
            description: "Please fill in all service details with valid values",
            variant: "destructive"
          });
          return;
        }
        addServiceMessage(serviceData);
        break;
        
      case "offer":
        if (offerData.selectedServices.length === 0) {
          toast({
            title: "Validation Error", 
            description: "Please select at least one service",
            variant: "destructive"
          });
          return;
        }
        
        const selectedServiceObjects = sampleServices.filter(
          service => offerData.selectedServices.includes(service.id)
        );
        
        const totalPrice = calculateTotalPrice();
        
        addOfferMessage({
          id: `offer-${Date.now()}`,
          services: selectedServiceObjects,
          totalPrice,
          estimatedDuration: offerData.estimatedDuration,
          notes: offerData.notes
        });
        break;
        
      case "order":
        addOrderMessage({
          id: `order-${Date.now()}`,
          offerId: "o1", // In a real app, we'd use the latest offer ID
          status: orderStatus,
          acceptedAt: new Date()
        });
        break;
        
      case "progress":
        if (progressData.percentage < 0 || progressData.percentage > 100 || !progressData.description) {
          toast({
            title: "Validation Error",
            description: "Please enter a valid percentage (0-100) and description",
            variant: "destructive"
          });
          return;
        }
        
        addProgressMessage({
          id: `progress-${Date.now()}`,
          orderId: "ord1", // In a real app, we'd use the active order ID
          status: progressData.status,
          description: progressData.description,
          percentage: progressData.percentage
        });
        break;
        
      case "invoice":
        if (calculateInvoiceTotal() <= 0 || !invoiceData.dueDate) {
          toast({
            title: "Validation Error",
            description: "Please enter valid invoice items and due date",
            variant: "destructive"
          });
          return;
        }
        
        const invoiceItems = invoiceData.items.filter(item => 
          item.description && item.quantity > 0 && item.unitPrice > 0
        );
        
        if (invoiceItems.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please add at least one valid invoice item",
            variant: "destructive"
          });
          return;
        }
        
        addInvoiceMessage({
          id: `invoice-${Date.now()}`,
          orderId: "ord1", // In a real app, we'd use the active order ID
          amount: calculateInvoiceTotal(),
          currency: "USD",
          dueDate: new Date(invoiceData.dueDate),
          status: "pending",
          items: invoiceItems.map(item => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.quantity * item.unitPrice
          }))
        });
        break;
        
      case "payment":
        if (paymentData.amount <= 0) {
          toast({
            title: "Validation Error",
            description: "Please enter a valid payment amount",
            variant: "destructive"
          });
          return;
        }
        
        addPaymentMessage({
          id: `payment-${Date.now()}`,
          invoiceId: "inv1", // In a real app, we'd use the active invoice ID
          amount: paymentData.amount,
          currency: "USD",
          method: paymentData.method,
          date: new Date()
        });
        break;
        
      case "closing":
        addClosingMessage({
          id: `closing-${Date.now()}`,
          orderId: "ord1", // In a real app, we'd use the active order ID
          date: new Date(),
          feedback: closingData.feedback,
          rating: closingData.rating
        });
        break;
    }
    
    setIsBusinessActionOpen(false);
    toast({
      title: "Action Completed",
      description: `Successfully sent the ${businessAction} message`,
    });
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
              <div>
                <Label htmlFor="service-name">Service Name</Label>
                <Input 
                  id="service-name"
                  value={serviceData.name}
                  onChange={e => setServiceData({...serviceData, name: e.target.value})}
                  placeholder="e.g., Foundation Repair"
                />
              </div>
              
              <div>
                <Label htmlFor="service-description">Description</Label>
                <Textarea 
                  id="service-description"
                  value={serviceData.description}
                  onChange={e => setServiceData({...serviceData, description: e.target.value})}
                  placeholder="Describe the service details..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service-price">Price ($)</Label>
                  <Input 
                    id="service-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={serviceData.price}
                    onChange={e => setServiceData({...serviceData, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="service-unit">Unit</Label>
                  <select
                    id="service-unit"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={serviceData.unit}
                    onChange={e => setServiceData({...serviceData, unit: e.target.value})}
                  >
                    <option value="job">Per Job</option>
                    <option value="hour">Per Hour</option>
                    <option value="day">Per Day</option>
                    <option value="sqft">Per Sq.Ft.</option>
                  </select>
                </div>
              </div>
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
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
                  {sampleServices.map(service => (
                    <div key={service.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                      <input 
                        type="checkbox" 
                        id={`service-${service.id}`}
                        checked={offerData.selectedServices.includes(service.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setOfferData({
                              ...offerData, 
                              selectedServices: [...offerData.selectedServices, service.id]
                            });
                          } else {
                            setOfferData({
                              ...offerData, 
                              selectedServices: offerData.selectedServices.filter(id => id !== service.id)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <label htmlFor={`service-${service.id}`} className="flex-1 cursor-pointer">
                        <span className="font-medium">{service.name}</span>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">{service.description}</span>
                          <span className="text-sm font-medium">${service.price}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">${calculateTotalPrice()}</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="estimated-duration">Estimated Duration</Label>
                <select
                  id="estimated-duration"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={offerData.estimatedDuration}
                  onChange={e => setOfferData({...offerData, estimatedDuration: e.target.value})}
                >
                  <option value="1-2 days">1-2 days</option>
                  <option value="3-5 days">3-5 days</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="3-4 weeks">3-4 weeks</option>
                  <option value="1-2 months">1-2 months</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="offer-notes">Additional Notes</Label>
                <Textarea
                  id="offer-notes"
                  placeholder="Add any terms, conditions, or details about the offer..."
                  value={offerData.notes}
                  onChange={e => setOfferData({...offerData, notes: e.target.value})}
                />
              </div>
            </div>
          </>
        );
      
      case "order":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Update Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="order-status">Order Status</Label>
                <select
                  id="order-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={orderStatus}
                  onChange={e => setOrderStatus(e.target.value as Order["status"])}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
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
                <Label htmlFor="progress-percentage">Completion Percentage</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="progress-percentage"
                    type="number" 
                    min="0" 
                    max="100" 
                    value={progressData.percentage}
                    onChange={e => setProgressData({
                      ...progressData, 
                      percentage: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                    })}
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="progress-status">Status</Label>
                <select
                  id="progress-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={progressData.status}
                  onChange={e => setProgressData({...progressData, status: e.target.value as ProgressType["status"]})}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="progress-description">Description</Label>
                <Textarea 
                  id="progress-description"
                  placeholder="Describe the current progress..."
                  value={progressData.description}
                  onChange={e => setProgressData({...progressData, description: e.target.value})}
                />
              </div>
            </div>
          </>
        );
      
      case "invoice":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Send Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="invoice-due-date">Due Date</Label>
                <Input 
                  id="invoice-due-date"
                  type="date" 
                  value={invoiceData.dueDate}
                  onChange={e => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <Label>Invoice Items</Label>
                <div className="space-y-2 mt-2">
                  {invoiceData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 border p-2 rounded-md">
                      <Input 
                        className="col-span-5" 
                        placeholder="Description"
                        value={item.description}
                        onChange={e => {
                          const newItems = [...invoiceData.items];
                          newItems[index].description = e.target.value;
                          setInvoiceData({...invoiceData, items: newItems});
                        }}
                      />
                      <Input 
                        className="col-span-2" 
                        type="number" 
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={e => {
                          const newItems = [...invoiceData.items];
                          newItems[index].quantity = parseInt(e.target.value) || 1;
                          setInvoiceData({...invoiceData, items: newItems});
                        }}
                      />
                      <Input 
                        className="col-span-3" 
                        type="number" 
                        min="0"
                        step="0.01"
                        placeholder="Price"
                        value={item.unitPrice}
                        onChange={e => {
                          const newItems = [...invoiceData.items];
                          newItems[index].unitPrice = parseFloat(e.target.value) || 0;
                          setInvoiceData({...invoiceData, items: newItems});
                        }}
                      />
                      <button 
                        type="button"
                        className="col-span-2 text-red-500 flex items-center justify-center"
                        onClick={() => {
                          if (invoiceData.items.length > 1) {
                            setInvoiceData({
                              ...invoiceData, 
                              items: invoiceData.items.filter((_, i) => i !== index)
                            });
                          }
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInvoiceData({
                        ...invoiceData,
                        items: [...invoiceData.items, { description: "", quantity: 1, unitPrice: 0 }]
                      });
                    }}
                  >
                    Add Item
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">${calculateInvoiceTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        );
      
      case "payment":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="payment-amount">Amount</Label>
                <div className="flex items-center">
                  <span className="mr-2">$</span>
                  <Input 
                    id="payment-amount"
                    type="number" 
                    min="0"
                    step="0.01"
                    value={paymentData.amount}
                    onChange={e => setPaymentData({...paymentData, amount: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="payment-method">Payment Method</Label>
                <select
                  id="payment-method"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={paymentData.method}
                  onChange={e => setPaymentData({...paymentData, method: e.target.value})}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash">Cash</option>
                  <option value="Check">Check</option>
                </select>
              </div>
            </div>
          </>
        );
      
      case "closing":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Close Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="closing-feedback">Feedback</Label>
                <Textarea 
                  id="closing-feedback"
                  placeholder="Add any feedback about the project..."
                  value={closingData.feedback}
                  onChange={e => setClosingData({...closingData, feedback: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="closing-rating">Rating</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="closing-rating"
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={closingData.rating}
                    onChange={e => setClosingData({...closingData, rating: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <span>{closingData.rating} / 5</span>
                </div>
                <div className="text-yellow-500 text-xl mt-1">
                  {"★".repeat(closingData.rating)}{"☆".repeat(5 - closingData.rating)}
                </div>
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
                <Package className="h-4 w-4 mr-2" />
                Add Service
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("offer")}
              >
                <Tag className="h-4 w-4 mr-2" />
                Create Offer
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("order")}
              >
                <ClipboardEdit className="h-4 w-4 mr-2" />
                Update Order
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("progress")}
              >
                <BarChart className="h-4 w-4 mr-2" />
                Update Progress
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("invoice")}
              >
                <Receipt className="h-4 w-4 mr-2" />
                Send Invoice
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("payment")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleBusinessAction("closing")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
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
