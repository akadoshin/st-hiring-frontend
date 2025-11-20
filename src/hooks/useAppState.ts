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
    openEventModal: (eventId: number, tickets?: unknown[]) =>
      dispatch(openEventModal({ eventId, tickets })),
    closeEventModal: () => dispatch(closeEventModal()),
    toggleUseOptimizedEvents: () =>
      dispatch(setUseOptimizedEvents(!state.useOptimizedEvents)),
    setClientId: (clientId: number) => dispatch(setClientId(clientId)),
  };
};
