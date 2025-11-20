export type TicketStatus = "available" | "sold_out" | "unavailable";

export interface Ticket {
  id: string;
  eventId: string;
  type: string;
  status: TicketStatus;
  price: number;
  createdAt: string;
  updatedAt: string;
}
