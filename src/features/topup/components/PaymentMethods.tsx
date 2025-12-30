import { cn } from "@/lib/utils";

interface PaymentMethodProps {
  method: {
    slug: string;
    name: string;
    type: string;
    logo_path: string;
  };
  selected: boolean;
  onClick: () => void;
}

export function PaymentMethod({
  method,
  selected,
  onClick,
}: PaymentMethodProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 w-full text-left overflow-hidden",
        selected
          ? "border-primary glass-premium"
          : "border-border/50 glass-card hover:border-primary/40"
      )}
    >
      {selected && (
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-accent/5 pointer-events-none" />
      )}

      <img src={method.logo_path} alt="" className="size-10 w-15" />
      <div className="flex-1 relative z-10">
        <p
          className={cn(
            "font-medium transition-colors",
            selected ? "text-primary" : "text-foreground"
          )}
        >
          {method.name}
        </p>
        <p className="text-xs text-muted-foreground capitalize">
          {method.type.replace("-", " ")}
        </p>
      </div>

      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all relative z-10",
          selected
            ? "border-primary bg-primary glow-primary"
            : "border-muted-foreground/30"
        )}
      >
        {selected && <div className="w-2 h-2 bg-foreground rounded-full" />}
      </div>
    </button>
  );
}
