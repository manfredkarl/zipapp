
import { Dialog, DialogContent } from "../ui/dialog";
import { ServiceForm } from "./ServiceForm";
import { OfferForm } from "./OfferForm";
import { OrderForm } from "./OrderForm";
import { ProgressForm } from "./ProgressForm";
import { InvoiceForm } from "./InvoiceForm";
import { PaymentForm } from "./PaymentForm";
import { ClosingForm } from "./ClosingForm";
import { 
  Service, 
  Offer, 
  Order, 
  Progress, 
  Invoice, 
  Payment, 
  Closing 
} from "@/hooks/use-chat-messages";

interface BusinessActionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  action: "service" | "offer" | "order" | "progress" | "invoice" | "payment" | "closing" | "";
  onSendService: (service: Service) => void;
  onSendOffer: (offer: Offer) => void;
  onSendOrder: (order: Order) => void;
  onSendProgress: (progress: Progress) => void;
  onSendInvoice: (invoice: Invoice) => void;
  onSendPayment: (payment: Payment) => void;
  onSendClosing: (closing: Closing) => void;
}

export function BusinessActionDialog({
  isOpen,
  onOpenChange,
  action,
  onSendService,
  onSendOffer,
  onSendOrder,
  onSendProgress,
  onSendInvoice,
  onSendPayment,
  onSendClosing
}: BusinessActionDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const renderContent = () => {
    switch (action) {
      case "service":
        return (
          <ServiceForm
            onSend={(service) => {
              onSendService(service);
              handleClose();
            }}
            onCancel={handleClose}
          />
        );
      case "offer":
        return (
          <OfferForm
            onSend={(offer) => {
              onSendOffer(offer);
              handleClose();
            }}
            onCancel={handleClose}
          />
        );
      case "order":
        return (
          <OrderForm
            onSend={(order) => {
              onSendOrder(order);
              handleClose();
            }}
            onCancel={handleClose}
          />
        );
      case "progress":
        return (
          <ProgressForm
            onSend={(progress) => {
              onSendProgress(progress);
              handleClose();
            }}
            onCancel={handleClose}
          />
        );
      case "invoice":
        return (
          <InvoiceForm
            onSend={(invoice) => {
              onSendInvoice(invoice);
              handleClose();
            }}
            onCancel={handleClose}
          />
        );
      case "payment":
        return (
          <PaymentForm
            onSend={(payment) => {
              onSendPayment(payment);
              handleClose();
            }}
            onCancel={handleClose}
          />
        );
      case "closing":
        return (
          <ClosingForm
            onSend={(closing) => {
              onSendClosing(closing);
              handleClose();
            }}
            onCancel={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
