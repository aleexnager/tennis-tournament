import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    surname?: string;
    phone?: string;
    username?: string;
    total_points?: number;
    total_sets_won?: number;
    total_games_won?: number;
    total_games_lost?: number;
    // Agrega más propiedades si es necesario
  }

  interface Session {
    user: User & {
      surname?: string;
      phone?: string;
      username?: string;
      total_points?: number;
      total_sets_won?: number;
      total_games_won?: number;
      total_games_lost?: number;
      // Agrega más propiedades si es necesario
    };
  }
}
