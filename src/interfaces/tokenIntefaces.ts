export interface TokenPayload {
  id: number;
  email: string;
  role: "admin" | "user" | "moderator";
}