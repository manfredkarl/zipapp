
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Progress as ProgressType } from "@/hooks/use-chat-messages";

interface ProgressFormProps {
  onSend: (progress: ProgressType) => void;
  onCancel: () => void;
}

export function ProgressForm({ onSend, onCancel }: ProgressFormProps) {
  const { toast } = useToast();
  const [progressData, setProgressData] = useState<{
    percentage: number;
    description: string;
    status: ProgressType["status"];
  }>({
    percentage: 0,
    description: "",
    status: "in_progress"
  });

  const handleSend = () => {
    if (progressData.percentage < 0 || progressData.percentage > 100 || !progressData.description) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid percentage (0-100) and description",
        variant: "destructive"
      });
      return;
    }
    
    onSend({
      id: `progress-${Date.now()}`,
      orderId: "ord1", // In a real app, we'd use the active order ID
      status: progressData.status,
      description: progressData.description,
      percentage: progressData.percentage
    });
  };

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
