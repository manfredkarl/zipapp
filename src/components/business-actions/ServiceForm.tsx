
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Service } from "@/hooks/use-chat-messages";

interface ServiceFormProps {
  onSend: (service: Service) => void;
  onCancel: () => void;
}

export function ServiceForm({ onSend, onCancel }: ServiceFormProps) {
  const { toast } = useToast();
  const [serviceData, setServiceData] = useState<Service>({
    id: `service-${Date.now()}`,
    name: "",
    description: "",
    price: 0,
    unit: "job"
  });

  const handleSend = () => {
    if (!serviceData.name || !serviceData.description || serviceData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all service details with valid values",
        variant: "destructive"
      });
      return;
    }
    onSend(serviceData);
  };

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
