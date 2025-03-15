
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Closing } from "@/hooks/use-chat-messages";

interface ClosingFormProps {
  onSend: (closing: Closing) => void;
  onCancel: () => void;
}

export function ClosingForm({ onSend, onCancel }: ClosingFormProps) {
  const [closingData, setClosingData] = useState({
    feedback: "",
    rating: 5
  });

  const handleSend = () => {
    onSend({
      id: `closing-${Date.now()}`,
      orderId: "ord1", // In a real app, we'd use the active order ID
      date: new Date(),
      feedback: closingData.feedback,
      rating: closingData.rating
    });
  };

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
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSend}>
          Send
        </Button>
      </DialogFooter>
    </>
  );
}
