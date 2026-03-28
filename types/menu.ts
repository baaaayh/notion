import { PageType } from "@/database/schema"; // Drizzle에서 정의한 모델

export type CreatePageResponse = {
  success: boolean;
  data?: PageType;
  error?: string;
};

export type MenuProps = {
  pages: PageType[];
  createPageAction: () => void;
};
