import { useQuery } from "@tanstack/react-query";
import { getCoversData } from "@/lib/apiManager";
import { CategoryWithCovers } from "@/services/coverService";

export function useCovers() {
  return useQuery<CategoryWithCovers[]>({
    queryKey: ["covers"],
    queryFn: getCoversData,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
