import { Header } from "@/components/shared/Header";
import { SearchBar } from "@/components/shared/SearchBar";
import { Sparkles } from "lucide-react";
import Features from "../components/Features";
import GameCard from "../components/GameCard";
import { useGames } from "../api/useGames";
import { useState } from "react";

const HomePage = () => {
  const { games } = useGames();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-slow" />
          <div className="absolute top-40 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse-slow" />

          <div className="container relative pt-16 pb-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-slide-up">
                <Sparkles className="h-4 w-4" />
                Instant Top-up for All Your Games
              </div>

              <h1 className="font-gaming text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up">
                <span className="text-foreground">Level Up Your</span>
                <br />
                <span className="text-gradient">Gaming Experience</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-slide-up">
                Fast, secure, and reliable game top-ups. Get your diamonds,
                credits, and in-game currencies in seconds.
              </p>

              <div className="pt-6 animate-slide-up">
                <SearchBar
                  onChange={setSearchQuery}
                  placeholder="Search your favorite game..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <Features />

        <section className="container pb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-gaming text-2xl md:text-3xl font-bold text-foreground">
                Popular Games
              </h2>
              <p className="text-muted-foreground mt-1">
                Choose your game and top-up instantly
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {games.length} games available
            </span>
          </div>
          {/* Games Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4 gap-4">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => {
                return <GameCard game={game} key={game.slug} />;
              })
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  No games found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 bg-card/30">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 GameTop. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
