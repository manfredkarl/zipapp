
import { useState, useEffect } from "react";

interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  imageUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
  documentName?: string;
  isSent?: boolean;
  projectId: string;
}

// Initial message data - in a real app this would come from a database
const projectMessages: Record<string, ChatMessage[]> = {
  main: [
    {
      id: "1",
      content: "Started work on the foundation today.",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 3600000),
      projectId: "main"
    },
    {
      id: "2",
      content: "Here's the progress photo",
      sender: "John Doe",
      timestamp: new Date(Date.now() - 3500000),
      imageUrl: "/placeholder.svg",
      projectId: "main"
    },
    {
      id: "3",
      content: "Looks good! Keep up the great work.",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 1800000),
      isSent: true,
      projectId: "main"
    },
    {
      id: "4",
      content: "I've attached the updated project timeline.",
      sender: "Project Manager",
      timestamp: new Date(Date.now() - 900000),
      documentUrl: "#",
      documentName: "Project_Timeline.pdf",
      isSent: true,
      projectId: "main"
    }
  ],
  "1": [
    {
      id: "4", 
      content: "Foundation work is progressing well.",
      sender: "Team Lead",
      timestamp: new Date(Date.now() - 7200000),
      projectId: "1"
    }
  ],
  "2": [
    {
      id: "5",
      content: "Landscaping designs are ready for review.",
      sender: "Design Team", 
      timestamp: new Date(Date.now() - 7200000),
      projectId: "2"
    }
  ],
  "3": [
    {
      id: "6",
      content: "Fountain installation scheduled for next month.",
      sender: "Project Coordinator",
      timestamp: new Date(Date.now() - 7200000),
      projectId: "3" 
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
      projectId
    });
  };

  const addImageMessage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    addMessage({
      content: `Sent an image: ${file.name}`,
      sender: "Project Manager",
      imageUrl,
      isSent: true,
      projectId
    });
  };

  const addVideoMessage = (file: File) => {
    const videoUrl = URL.createObjectURL(file);
    addMessage({
      content: `Sent a video: ${file.name}`,
      sender: "Project Manager",
      videoUrl,
      isSent: true,
      projectId
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
      projectId
    });
  };

  return {
    messages,
    addTextMessage,
    addImageMessage,
    addVideoMessage,
    addDocumentMessage
  };
};
