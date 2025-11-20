import type { Ticket } from "./ticket";

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  availableTickets?: Ticket[];
  createdAt: string;
  updatedAt: string;
}
