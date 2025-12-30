import { axiosInstance } from "@/lib/axios";
import type { Game } from "@/types/Game";
import { useEffect, useState } from "react";

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.get("/api/v1/games");

        setGames(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  return {
    games,
    isLoading,
  };
};
