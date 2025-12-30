import { useNavigate } from "react-router-dom";
import type { Game } from "@/types/Game";

type GameCardProps = {
  game: Game;
};

const GameCard = ({ game }: GameCardProps) => {
  const navigate = useNavigate();
  return (
    <button
      key={game.slug}
      onClick={() => navigate(`/topup/${game.slug}`)}
      className="group relative overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(263_84%_66%/0.3)] hover:scale-[1.03] active:scale-[0.98] text-left w-full border border-primary/25"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={game.image}
          alt={game.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-90" />

        <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 relative">
        <h3 className="font-gaming text-lg font-semibold text-foreground group-hover:text-gradient transition-colors duration-300">
          {game.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{game.publisher}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-primary">{game.currency}</span>
          <span className="text-xs text-muted-foreground">•</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default GameCard;
