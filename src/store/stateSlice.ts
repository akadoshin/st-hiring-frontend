import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Event } from "../types/event";

const STORAGE_KEY_OPTIMIZED = "useOptimizedEvents";
const STORAGE_KEY_CLIENT_ID = "clientId";
const DEFAULT_CLIENT_ID = 1;

function getInitialUseOptimizedEvents(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_OPTIMIZED);
    return stored !== null ? JSON.parse(stored) : false;
  } catch {
    return false;
  }
}

function getInitialClientId(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CLIENT_ID);
    const parsed = stored !== null ? parseInt(stored) : DEFAULT_CLIENT_ID;
    return isNaN(parsed) || parsed < 1 ? DEFAULT_CLIENT_ID : parsed;
  } catch {
    return DEFAULT_CLIENT_ID;
  }
}

export interface StateState {
  settingsDrawerOpen: boolean;
  eventModalOpen: boolean;
  selectedEventId: number | null;
  selectedEvent: Event | null;
  useOptimizedEvents: boolean;
  clientId: number;
  regularEvents: Event[];
}

const initialState: StateState = {
  settingsDrawerOpen: false,
  eventModalOpen: false,
  selectedEventId: null,
  selectedEvent: null,
  useOptimizedEvents: getInitialUseOptimizedEvents(),
  clientId: getInitialClientId(),
  regularEvents: [],
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    openSettingsDrawer: (state) => {
      state.settingsDrawerOpen = true;
    },
    closeSettingsDrawer: (state) => {
      state.settingsDrawerOpen = false;
    },
    openEventModal: (
      state,
      action: PayloadAction<{
        eventId: number;
        event: Event;
        tickets?: unknown[];
      }>
    ) => {
      state.eventModalOpen = true;
      state.selectedEventId = action.payload.eventId;
      state.selectedEvent = action.payload.event;
    },
    setRegularEvents: (state, action: PayloadAction<Event[]>) => {
      state.regularEvents = action.payload;
    },
    closeEventModal: (state) => {
      state.eventModalOpen = false;
      state.selectedEventId = null;
      state.selectedEvent = null;
    },
    setUseOptimizedEvents: (state, action: PayloadAction<boolean>) => {
      state.useOptimizedEvents = action.payload;
      try {
        localStorage.setItem(
          STORAGE_KEY_OPTIMIZED,
          JSON.stringify(action.payload)
        );
      } catch (error) {
        console.error(
          "Failed to save useOptimizedEvents to localStorage:",
          error
        );
      }
    },
    setClientId: (state, action: PayloadAction<number>) => {
      state.clientId = action.payload;
      try {
        localStorage.setItem(STORAGE_KEY_CLIENT_ID, action.payload.toString());
      } catch (error) {
        console.error("Failed to save clientId to localStorage:", error);
      }
    },
  },
});

export const {
  openSettingsDrawer,
  closeSettingsDrawer,
  openEventModal,
  closeEventModal,
  setUseOptimizedEvents,
  setClientId,
  setRegularEvents,
} = stateSlice.actions;
export default stateSlice.reducer;
