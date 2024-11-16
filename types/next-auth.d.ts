import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: number;
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
    _id: number;
    name: string;
    start_date: date;
    end_date: date;
    inscription_limit_date: date;
    max_num_participants: number;
    active: boolean;
  }

  interface Participants {
    _id: number;
    user_id: number;
    tournament_id: number;
    total_points: number;
    total_sets_won: number;
    total_games_won: number;
    total_games_lost: number;
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
