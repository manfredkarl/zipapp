import { useState, useEffect } from "react";

export type MessageType = 
  | "text" 
  | "image" 
  | "video" 
  | "document" 
  | "service" 
  | "offer" 
  | "order" 
  | "progress" 
  | "invoice" 
  | "payment" 
  | "closing";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
}

export interface Offer {
  id: string;
  services: Service[];
  totalPrice: number;
  estimatedDuration: string;
  notes?: string;
}

export interface Order {
  id: string;
  offerId: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  acceptedAt?: Date;
}

export interface Progress {
  id: string;
  orderId: string;
  status: "pending" | "in_progress" | "completed";
  description: string;
  percentage: number;
}

export interface Invoice {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  dueDate: Date;
  status: "pending" | "paid" | "overdue";
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  currency: string;
  method: string;
  date: Date;
}

export interface Closing {
  id: string;
  orderId: string;
  date: Date;
  feedback?: string;
  rating?: number;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  documentName?: string;
  messageType: MessageType;
  isSent?: boolean;
  projectId: string;
  service?: Service;
  offer?: Offer;
  order?: Order;
  progress?: Progress;
  invoice?: Invoice;
  payment?: Payment;
  closing?: Closing;
}

// Initial message data - in a real app this would come from a database
const projectMessages: Record<string, ChatMessage[]> = {
  main: [
    {
      id: "1",
      content: "Started work on the foundation today.",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 3600000),
      projectId: "main",
      messageType: "text"
    },
    {
      id: "2",
      content: "Here's the progress photo",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 3500000),
      imageUrl: "/placeholder.svg",
      projectId: "main",
      messageType: "image"
    },
    {
      id: "3",
      content: "Looks good! Keep up the great work.",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 1800000),
      isSent: true,
      projectId: "main",
      messageType: "text"
    },
    {
      id: "4",
      content: "I've attached the updated project timeline.",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 900000),
      documentUrl: "#",
      documentName: "Project_Timeline.pdf",
      isSent: true,
      projectId: "main",
      messageType: "document"
    },
    {
      id: "5",
      content: "Here's our available service for foundation repair:",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 800000),
      isSent: true,
      projectId: "main",
      messageType: "service",
      service: {
        id: "s1",
        name: "Foundation Repair",
        description: "Complete repair of foundation cracks and structural issues",
        price: 2500,
        unit: "job"
      }
    },
    {
      id: "6",
      content: "Based on our assessment, I've prepared this offer for your foundation repair:",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 700000),
      isSent: true,
      projectId: "main",
      messageType: "offer",
      offer: {
        id: "o1",
        services: [
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
          }
        ],
        totalPrice: 3700,
        estimatedDuration: "5-7 business days",
        notes: "Includes all materials and labor"
      }
    },
    {
      id: "7",
      content: "I accept your offer for the foundation repair",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 600000),
      projectId: "main",
      messageType: "order",
      order: {
        id: "ord1",
        offerId: "o1",
        status: "accepted",
        acceptedAt: new Date(Date.now() - 600000)
      }
    },
    {
      id: "8",
      content: "Progress update: We've completed 40% of the foundation repair",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 500000),
      isSent: true,
      projectId: "main",
      messageType: "progress",
      progress: {
        id: "p1",
        orderId: "ord1",
        status: "in_progress",
        description: "Excavation completed, foundation reinforcement in progress",
        percentage: 40
      }
    }
  ],
  "1": [
    {
      id: "4", 
      content: "Foundation work is progressing well.",
      sender: "Team Lead",
      timestamp: new Date(Date.now() - 7200000),
      projectId: "1",
      messageType: "text"
    }
  ],
  "2": [
    {
      id: "5",
      content: "Landscaping designs are ready for review.",
      sender: "Design Team", 
      timestamp: new Date(Date.now() - 7200000),
      projectId: "2",
      messageType: "text"
    }
  ],
  "3": [
    {
      id: "6",
      content: "Fountain installation scheduled for next month.",
      sender: "Project Coordinator",
      timestamp: new Date(Date.now() - 7200000),
      projectId: "3",
      messageType: "text"
    }
  ]
};

export const useChatMessages = (projectId: string = "main") => {
  const [messages, setMessages] = useState<ChatMessage[]>(projectMessages[projectId] || []);

  useEffect(() => {
    setMessages(projectMessages[projectId] || []);
  }, [projectId]);

  const addMessage = (newMessage: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const message: ChatMessage = {
      ...newMessage,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    projectMessages[projectId] = [...(projectMessages[projectId] || []), message];
  };

  const addTextMessage = (content: string) => {
    addMessage({
      content,
      sender: "Project Manager",
      isSent: true,
      projectId,
      messageType: "text"
    });
  };

  const addImageMessage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    addMessage({
      content: `Sent an image: ${file.name}`,
      sender: "Project Manager",
      imageUrl,
      isSent: true,
      projectId,
      messageType: "image"
    });
  };

  const addVideoMessage = (file: File) => {
    const videoUrl = URL.createObjectURL(file);
    addMessage({
      content: `Sent a video: ${file.name}`,
      sender: "Project Manager",
      videoUrl,
      isSent: true,
      projectId,
      messageType: "video"
    });
  };

  const addDocumentMessage = (file: File) => {
    const documentUrl = URL.createObjectURL(file);
    addMessage({
      content: `Sent a document`,
      sender: "Project Manager",
      documentUrl,
      documentName: file.name,
      isSent: true,
      projectId,
      messageType: "document"
    });
  };

  const addServiceMessage = (service: Service) => {
    addMessage({
      content: `Sent a service: ${service.name}`,
      sender: "Project Manager",
      isSent: true,
      projectId,
      messageType: "service",
      service
    });
  };

  const addOfferMessage = (offer: Offer) => {
    addMessage({
      content: `Sent an offer with ${offer.services.length} services, total: $${offer.totalPrice}`,
      sender: "Project Manager",
      isSent: true,
      projectId,
      messageType: "offer",
      offer
    });
  };

  const addOrderMessage = (order: Order) => {
    addMessage({
      content: `Order ${order.status === 'accepted' ? 'accepted' : 'updated'} for offer ID: ${order.offerId}`,
      sender: "Project Manager",
      isSent: true,
      projectId,
      messageType: "order",
      order
    });
  };

  const addProgressMessage = (progress: Progress) => {
    addMessage({
      content: `Progress update: ${progress.percentage}% complete - ${progress.description}`,
      sender: "Project Manager",
      isSent: true,
      projectId,
      messageType: "progress",
      progress
    });
  };

  const addInvoiceMessage = (invoice: Invoice) => {
    addMessage({
      content: `Invoice sent: $${invoice.amount} due by ${invoice.dueDate.toLocaleDateString()}`,
      sender: "Project Manager",
      isSent: true,
      projectId,
      messageType: "invoice",
      invoice
    });
  };

  const addPaymentMessage = (payment: Payment) => {
    addMessage({
      content: `Payment received: $${payment.amount} via ${payment.method}`,
      sender: "Project Manager",
      isSent: true,
      projectId,
      messageType: "payment",
      payment
    });
  };

  const addClosingMessage = (closing: Closing) => {
    addMessage({
      content: `Project closed on ${closing.date.toLocaleDateString()}${closing.feedback ? ` with feedback: ${closing.feedback}` : ''}`,
      sender: "Project Manager",
      isSent: true,
      projectId,
      messageType: "closing",
      closing
    });
  };

  return {
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
  };
};
