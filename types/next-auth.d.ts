import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name?: string;
    surname?: string;
    phone?: string;
    username?: string;
    password?: string;
    role?: string;
    total_points?: number;
    total_sets_won?: number;
    total_games_won?: number;
    total_games_lost?: number;
  }

  interface Tournament {
    _id: string;
    name: string;
    start_date: string;
    end_date: string;
    inscription_limit_date: string;
  }

  interface Session {
    user: User & {
      name?: string;
      surname?: string;
      phone?: string;
      username?: string;
      password?: string;
      role?: string;
      total_points?: number;
      total_sets_won?: number;
      total_games_won?: number;
      total_games_lost?: number;
    };
  }
}
