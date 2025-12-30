import { axiosInstance } from "@/lib/axios";
import type { TopUp } from "@/types/TopUp";
import { useEffect, useState } from "react";

export const useTopUp = () => {
  const [game, setGame] = useState<TopUp | null>(null);
  const [isLoading, setIsLoading] = useState(false);
};
