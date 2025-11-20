import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Event } from "../types/event";
import type { UserSettings } from "../types/settings";
import type { Ticket } from "../types/ticket";

export type OptimizedResponse<T extends Event | Ticket> = (T extends Event
  ? { events: T[] }
  : { tickets: T[] }) & {
  nextCursor?: number | null;
};

const baseUrl = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Events", "Settings", "Tickets"],
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], void>({
      query: () => "/events",
      providesTags: ["Events"],
    }),

    getSettings: builder.query<UserSettings, number>({
      query: (clientId) => `/client-settings/${clientId}`,
      providesTags: (_, __, clientId) => [
        { type: "Settings" as const, id: clientId },
      ],
    }),

    updateSettings: builder.mutation<
      UserSettings,
      { clientId: number; settings: UserSettings }
    >({
      query: ({ clientId, settings }) => {
        return {
          url: `/client-settings/${clientId}`,
          method: "PUT",
          body: settings,
        };
      },
      invalidatesTags: (_, __, { clientId }) => [
        { type: "Settings" as const, id: clientId },
      ],
    }),

    // Optimized endpoints

    getOptimizedEvents: builder.query<
      OptimizedResponse<Event>,
      { limit?: number; cursor?: number }
    >({
      query: ({ limit, cursor }) => {
        const searchParams = new URLSearchParams();
        if (limit !== undefined) {
          searchParams.set("limit", limit.toString());
        }
        if (cursor !== undefined) {
          searchParams.set("cursor", cursor.toString());
        }
        const queryString = searchParams.toString();
        return `/optimized-events${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.events.map((event) => ({
                type: "Events" as const,
                id: event.id,
              })),
              { type: "Events" as const, id: "LIST" },
            ]
          : [{ type: "Events" as const, id: "LIST" }],
    }),

    getOptimizedTickets: builder.query<
      OptimizedResponse<Ticket>,
      { eventId: string; limit?: number; cursor?: number }
    >({
      query: ({ eventId, limit, cursor }) => {
        const searchParams = new URLSearchParams();
        if (limit !== undefined) {
          searchParams.set("limit", limit.toString());
        }
        if (cursor !== undefined) {
          searchParams.set("cursor", cursor.toString());
        }
        const queryString = searchParams.toString();
        return `/optimized-events/${eventId}/tickets${
          queryString ? `?${queryString}` : ""
        }`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.tickets.map((ticket) => ({
                type: "Tickets" as const,
                id: ticket.id,
              })),
              { type: "Tickets" as const, id: "LIST" },
            ]
          : [{ type: "Tickets" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useGetOptimizedEventsQuery,
  useGetTicketsQuery,
  useGetOptimizedTicketsQuery,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} = apiSlice as any;
