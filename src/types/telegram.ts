export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface User {
  id: string;
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  createdAt: Date;
  lastLogin: Date;
}

declare global {
  interface Window {
    Telegram?: {
      Login: {
        auth: (
          options: {
            bot_id: string;
            request_access?: string;
            lang?: string;
          },
          callback: (user: TelegramUser | false) => void
        ) => void;
      };
    };
  }
}
