
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Offer, Service } from "@/hooks/use-chat-messages";

interface OfferFormProps {
  onSend: (offer: Offer) => void;
  onCancel: () => void;
}

// Sample service data for demo
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

export function OfferForm({ onSend, onCancel }: OfferFormProps) {
  const { toast } = useToast();
  const [offerData, setOfferData] = useState({
    selectedServices: [] as string[],
    notes: "",
    estimatedDuration: "1-2 weeks"
  });

  const calculateTotalPrice = () => {
    return offerData.selectedServices.reduce((total, serviceId) => {
      const service = sampleServices.find(s => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  const handleSend = () => {
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
    
    onSend({
      id: `offer-${Date.now()}`,
      services: selectedServiceObjects,
      totalPrice,
      estimatedDuration: offerData.estimatedDuration,
      notes: offerData.notes
    });
  };

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
