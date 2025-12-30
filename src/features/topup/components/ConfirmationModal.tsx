import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Gem, CreditCard, User, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { PaymentMethods, Products } from "@/types/TopUp";
import { formatPrice } from "@/lib/toRupiah";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
  currency: string;
  userId: string;
  zoneId: string;
  selectedPackage: Products | null;
  selectedPayment: PaymentMethods | null;
}

export function ConfirmationModal({
  open,
  onClose,
  gameName,
  currency,
  userId,
  zoneId,
  selectedPackage,
  selectedPayment,
}: ConfirmationModalProps) {
  const [processing, setProcessing] = useState(false);

  const handleConfirm = async () => {
    setProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setProcessing(false);
    onClose();

    toast.success("Order placed successfully!", {
      description: `Your ${selectedPackage?.amount} ${currency} will be delivered shortly.`,
    });
  };

  if (!selectedPackage || !selectedPayment) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl text-center">
            Confirm Your Order
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Please review your order details before proceeding
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Game
            </h4>
            <p className="font-gaming text-lg text-primary">{gameName}</p>
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Account Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="font-mono text-foreground">{userId}</p>
              </div>
              {zoneId && (
                <div>
                  <p className="text-xs text-muted-foreground">Zone ID</p>
                  <p className="font-mono text-foreground">{zoneId}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Gem className="h-4 w-4" />
              Package
            </h4>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-gaming text-lg text-foreground">
                  {selectedPackage.amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">{currency}</p>
              </div>
              <p className="font-gaming text-xl text-primary">
                {formatPrice(selectedPackage.price)}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h4>
            <div className="flex items-center gap-3">
              <img src={selectedPayment.logo_path} alt="" className="size-10" />
              <p className="font-medium text-foreground">
                {selectedPayment.name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30">
            <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Please ensure your User ID and Zone ID are correct. Wrong IDs
              cannot be refunded.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            className="flex-1 gap-2"
            disabled={processing}
          >
            {processing ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Confirm Order
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
