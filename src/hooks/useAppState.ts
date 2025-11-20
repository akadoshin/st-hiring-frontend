import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  openSettingsDrawer,
  closeSettingsDrawer,
  openEventModal,
  closeEventModal,
  setUseOptimizedEvents,
  setClientId,
} from "../store/stateSlice";
import type { Event } from "../types/event";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppState = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((rootState) => rootState.state);

  return {
    settingsDrawerOpen: state.settingsDrawerOpen,
    eventModalOpen: state.eventModalOpen,
    selectedEventId: state.selectedEventId,
    useOptimizedEvents: state.useOptimizedEvents,
    clientId: state.clientId,

    openSettingsDrawer: () => dispatch(openSettingsDrawer()),
    closeSettingsDrawer: () => dispatch(closeSettingsDrawer()),
    openEventModal: (eventId: number, event: Event, tickets?: unknown[]) =>
      dispatch(openEventModal({ eventId, event, tickets })),
    closeEventModal: () => dispatch(closeEventModal()),
    toggleUseOptimizedEvents: () =>
      dispatch(setUseOptimizedEvents(!state.useOptimizedEvents)),
    setClientId: (clientId: number) => dispatch(setClientId(clientId)),
  };
};
