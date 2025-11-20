import { useState, useEffect, useCallback, useRef } from "react";

import { useGetEventsQuery, useGetOptimizedEventsQuery } from "../store/api";
import { useAppState } from "./useAppState";
import { useAppDispatch } from "./useAppState";
import { setRegularEvents } from "../store/stateSlice";

import type { Event } from "../types/event";

export function useEvents() {
  const { useOptimizedEvents } = useAppState();
  const dispatch = useAppDispatch();

  const [optimizedCursor, setOptimizedCursor] = useState<number | undefined>(
    undefined
  );
  const [accumulatedOptimizedEvents, setAccumulatedOptimizedEvents] = useState<
    Event[]
  >([]);
  const isLoadingMoreRef = useRef(false);

  useEffect(() => {
    setOptimizedCursor(undefined);
    setAccumulatedOptimizedEvents([]);
    isLoadingMoreRef.current = false;
  }, [useOptimizedEvents]);

  const {
    data: regularEvents = [],
    isLoading: loadingRegular,
    error: errorRegular,
  } = useGetEventsQuery(undefined, {
    skip: useOptimizedEvents,
  });

  useEffect(() => {
    if (!useOptimizedEvents && regularEvents.length > 0) {
      dispatch(setRegularEvents(regularEvents));
    }
  }, [regularEvents, useOptimizedEvents, dispatch]);

  const {
    data: optimizedEventsResponse,
    isLoading: loadingOptimized,
    error: errorOptimized,
  } = useGetOptimizedEventsQuery(
    useOptimizedEvents
      ? {
          limit: 12,
          cursor: optimizedCursor,
        }
      : undefined,
    {
      skip: !useOptimizedEvents,
    }
  );

  // Reset loading ref when loading completes
  useEffect(() => {
    if (!loadingOptimized) {
      isLoadingMoreRef.current = false;
    }
  }, [loadingOptimized]);

  useEffect(() => {
    if (optimizedEventsResponse?.events && useOptimizedEvents) {
      if (optimizedCursor === undefined) {
        setAccumulatedOptimizedEvents(optimizedEventsResponse.events);
      } else {
        setAccumulatedOptimizedEvents((prev) => [
          ...prev,
          ...optimizedEventsResponse.events,
        ]);
      }
    }
  }, [optimizedEventsResponse, optimizedCursor, useOptimizedEvents]);

  const events = useOptimizedEvents
    ? accumulatedOptimizedEvents
    : regularEvents;
  const loading = useOptimizedEvents ? loadingOptimized : loadingRegular;
  const error = useOptimizedEvents ? errorOptimized : errorRegular;
  const hasMoreOptimizedEvents =
    useOptimizedEvents &&
    optimizedEventsResponse?.nextCursor !== null &&
    optimizedEventsResponse?.nextCursor !== undefined;

  const loadMore = useCallback(() => {
    if (
      !loadingOptimized &&
      !isLoadingMoreRef.current &&
      optimizedEventsResponse?.nextCursor !== null &&
      optimizedEventsResponse?.nextCursor !== undefined
    ) {
      isLoadingMoreRef.current = true;
      const nextCursor = optimizedEventsResponse.nextCursor;
      setOptimizedCursor(nextCursor);
    }
  }, [loadingOptimized, optimizedEventsResponse?.nextCursor]);

  return {
    events,
    loading,
    error,
    useOptimizedEvents,
    hasMoreOptimizedEvents,
    loadingOptimized,
    loadMore,
  };
}
