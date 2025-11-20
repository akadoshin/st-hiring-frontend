import React, { useCallback, useEffect, useRef } from "react";
import {
  Typography,
  Box,
  Alert,
  Switch,
  FormControlLabel,
  Stack,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { VirtuosoGrid } from "react-virtuoso";

import Layout from "./components/templates/Layout";
import EventCard from "./components/molecules/EventCard";
import EventCardSkeleton from "./components/molecules/EventCardSkeleton";

import { useEvents } from "./hooks";
import { useAppState } from "./hooks/useAppState";

function App() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  const {
    events,
    loading,
    error,
    hasMoreOptimizedEvents,
    loadingOptimized,
    loadMore,
  } = useEvents();

  const { useOptimizedEvents, toggleUseOptimizedEvents } = useAppState();
  const endReachedCalledRef = useRef(false);

  useEffect(() => {
    if (!loadingOptimized) {
      endReachedCalledRef.current = false;
    }
  }, [loadingOptimized]);

  const handleEndReached = useCallback(() => {
    if (
      useOptimizedEvents &&
      hasMoreOptimizedEvents &&
      !loadingOptimized &&
      !endReachedCalledRef.current
    ) {
      endReachedCalledRef.current = true;
      loadMore();
    }
  }, [useOptimizedEvents, hasMoreOptimizedEvents, loadingOptimized, loadMore]);

  return (
    <Layout>
      <Stack gap={2}>
        <Stack>
          <Typography
            variant="h3"
            component="h1"
            color="secondary.main"
            fontWeight="bold"
          >
            Events
          </Typography>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={useOptimizedEvents}
                  onChange={toggleUseOptimizedEvents}
                />
              }
              label="Optimized Fetching"
            />
          </Box>
        </Stack>

        {loading && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {"status" in error
              ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
              : "Failed to fetch events"}
          </Alert>
        )}

        {!loading && !error && events.length === 0 && (
          <Stack alignItems="center" mt={6} justifyContent="center" gap={0.5}>
            <Typography variant="h6" color="text.secondary">
              No events found
            </Typography>
            <Typography variant="body1" color="grey.500">
              Check back later for upcoming events
            </Typography>
          </Stack>
        )}

        {!loading && !error && events.length > 0 && (
          <>
            <VirtuosoGrid
              data={events}
              useWindowScroll
              endReached={handleEndReached}
              overscan={200}
              listClassName="mui-grid-wrapper"
              itemClassName="mui-grid-item"
              components={{
                Item: ({ children, ...props }) => (
                  <div {...props} style={{ display: "flex" }}>
                    {children}
                  </div>
                ),
                List: React.forwardRef<
                  HTMLDivElement,
                  { children?: React.ReactNode; style?: React.CSSProperties }
                >(({ children, style, ...props }, ref) => (
                  <div
                    ref={ref}
                    {...props}
                    style={{
                      ...style,
                      display: "grid",
                      gridTemplateColumns: isXs
                        ? "1fr"
                        : isSm
                        ? "repeat(2, 1fr)"
                        : "repeat(3, 1fr)",
                      gap: theme.spacing(isXs ? 2 : isSm ? 3 : 4),
                    }}
                  >
                    {children}
                  </div>
                )),
              }}
              itemContent={(_index, event) => <EventCard event={event} />}
            />
            {useOptimizedEvents &&
              hasMoreOptimizedEvents &&
              loadingOptimized && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    py: 2,
                  }}
                >
                  <CircularProgress size={40} />
                </Box>
              )}
          </>
        )}
      </Stack>
    </Layout>
  );
}

export default App;
