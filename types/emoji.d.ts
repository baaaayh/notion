export interface Emoji {
  id: string;
  keywords: string[];
  name: string;
  skins: {
    native: string;
    unified: string;
  }[];
  version: number;
}

interface EmojiMartData {
  emojis: Record<string, Emoji>; // 키는 문자열, 값은 Emoji 객체
  categories: { id: string; emojis: string[] }[];
  aliases: Record<string, string>;
}
