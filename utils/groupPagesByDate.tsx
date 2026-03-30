import { PageType } from "@/database/schema";
import { isToday, isYesterday, subDays, isAfter } from "date-fns"; // date-fns 라이브러리 추천

export const groupPagesByDate = (pages: PageType[]) => {
  const groups = {
    today: [] as PageType[],
    yesterday: [] as PageType[],
    last30Days: [] as PageType[],
    older: [] as PageType[],
  };

  const thirtyDaysAgo = subDays(new Date(), 30);

  pages.forEach((page) => {
    const date = new Date(page.updated_at);

    if (isToday(date)) {
      groups.today.push(page);
    } else if (isYesterday(date)) {
      groups.yesterday.push(page);
    } else if (isAfter(date, thirtyDaysAgo)) {
      groups.last30Days.push(page);
    } else {
      groups.older.push(page);
    }
  });

  return groups;
};
