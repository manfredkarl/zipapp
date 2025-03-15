
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Payment } from "@/hooks/use-chat-messages";

interface PaymentFormProps {
  onSend: (payment: Payment) => void;
  onCancel: () => void;
}

export function PaymentForm({ onSend, onCancel }: PaymentFormProps) {
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    method: "Credit Card"
  });

  const handleSend = () => {
    if (paymentData.amount <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid payment amount",
        variant: "destructive"
      });
      return;
    }
    
    onSend({
      id: `payment-${Date.now()}`,
      invoiceId: "inv1", // In a real app, we'd use the active invoice ID
      amount: paymentData.amount,
      currency: "USD",
      method: paymentData.method,
      date: new Date()
    });
  };

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
