import { cn } from "@/lib/utils";
import type { Products } from "@/types/TopUp";
import { Gem } from "lucide-react";

interface DiamondOptionProps {
  package_: Products;
  selected: boolean;
  onClick: () => void;
  currency: string;
}

export function DiamondOption({
  package_,
  selected,
  onClick,
  currency,
}: DiamondOptionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-xl border-2 transition-all duration-300 text-left group overflow-hidden",
        selected
          ? "border-primary glass-premium"
          : "border-border/50 glass-card hover:border-primary/40"
      )}
    >
      {selected && (
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />
      )}

      <div className="flex items-center gap-3 relative z-10">
        <div
          className={cn(
            "p-2 rounded-lg transition-all duration-300",
            selected ? " glow-primary" : "bg-muted/50"
          )}
        >
          <Gem
            className={cn(
              "h-5 w-5 transition-colors",
              selected ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "font-gaming text-lg font-bold transition-colors",
                selected ? "text-gradient" : "text-foreground"
              )}
            >
              {package_.amount.toLocaleString()}
            </span>
          </div>
          <span className="text-xs capitalize text-muted-foreground">
            {currency}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/30 relative z-10">
        <span
          className={cn(
            "font-semibold transition-colors",
            selected ? "text-primary" : "text-foreground"
          )}
        >
          {formatPrice(package_.price)}
        </span>
      </div>

      {/* Selection indicator */}
      <div
        className={cn(
          "absolute top-3 left-3 w-4 h-4 rounded-full border-2 transition-all duration-300",
          selected
            ? "border-primary bg-primary glow-primary"
            : "border-muted-foreground/30"
        )}
      >
        {selected && (
          <div className="absolute inset-1 bg-foreground rounded-full" />
        )}
      </div>
    </button>
  );
}
