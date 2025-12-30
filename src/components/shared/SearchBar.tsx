import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search games...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 pl-12 pr-6 bg-card border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(187_92%_50%/0.2)] transition-all duration-300"
      />
    </div>
  );
}
