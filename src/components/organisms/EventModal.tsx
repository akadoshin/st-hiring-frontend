import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  Dialog,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { VirtuosoGrid } from "react-virtuoso";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppState";
import { closeEventModal } from "../../store/stateSlice";
import type { RootState } from "../../store/store";
import { useGetOptimizedTicketsQuery } from "../../store/api";
import type { Ticket } from "../../types/ticket";
import { formatDate, formatTime, formatDay } from "../../utils/dateUtils";

const EventModal = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(
    (state: RootState) => state.state.eventModalOpen
  );
  const selectedEventId = useAppSelector(
    (state: RootState) => state.state.selectedEventId
  );
  const event = useAppSelector((state: RootState) => state.state.selectedEvent);
  const useOptimizedEvents = useAppSelector(
    (state: RootState) => state.state.useOptimizedEvents
  );

  const [optimizedTicketsCursor, setOptimizedTicketsCursor] = useState<
    number | undefined
  >(undefined);
  const [accumulatedOptimizedTickets, setAccumulatedOptimizedTickets] =
    useState<Ticket[]>([]);
  const isLoadingMoreTicketsRef = useRef(false);

  useEffect(() => {
    if (!isOpen || !selectedEventId) {
      setOptimizedTicketsCursor(undefined);
      setAccumulatedOptimizedTickets([]);
      isLoadingMoreTicketsRef.current = false;
    }
  }, [isOpen, selectedEventId, useOptimizedEvents]);

  const { data: optimizedTicketsResponse, isLoading: ticketsLoading } =
    useGetOptimizedTicketsQuery(
      {
        eventId: selectedEventId?.toString() || "",
        limit: 12,
        ...(optimizedTicketsCursor !== undefined && {
          cursor: optimizedTicketsCursor,
        }),
      },
      {
        skip: !useOptimizedEvents || !isOpen || !selectedEventId,
      }
    );

  useEffect(() => {
    if (!ticketsLoading) {
      isLoadingMoreTicketsRef.current = false;
    }
  }, [ticketsLoading]);

  useEffect(() => {
    if (optimizedTicketsResponse?.tickets && useOptimizedEvents && isOpen) {
      if (optimizedTicketsCursor === undefined) {
        setAccumulatedOptimizedTickets(optimizedTicketsResponse.tickets);
      } else {
        setAccumulatedOptimizedTickets((prev) => [
          ...prev,
          ...optimizedTicketsResponse.tickets,
        ]);
      }
    }
  }, [
    optimizedTicketsResponse,
    optimizedTicketsCursor,
    useOptimizedEvents,
    isOpen,
  ]);

  const tickets = useMemo(() => {
    if (useOptimizedEvents) {
      return accumulatedOptimizedTickets;
    }
    return event?.availableTickets || [];
  }, [
    useOptimizedEvents,
    accumulatedOptimizedTickets,
    event?.availableTickets,
  ]);

  const handleLoadMoreTickets = useCallback(() => {
    if (
      useOptimizedEvents &&
      !ticketsLoading &&
      !isLoadingMoreTicketsRef.current &&
      optimizedTicketsResponse?.nextCursor !== null &&
      optimizedTicketsResponse?.nextCursor !== undefined
    ) {
      isLoadingMoreTicketsRef.current = true;
      setOptimizedTicketsCursor(optimizedTicketsResponse.nextCursor);
    }
  }, [
    useOptimizedEvents,
    ticketsLoading,
    optimizedTicketsResponse?.nextCursor,
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return theme.palette.success.main;
      case "sold_out":
        return theme.palette.error.main;
      case "unavailable":
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace("_", " ").toUpperCase();
  };

  const handleClose = () => {
    dispatch(closeEventModal());
  };

  const TicketCard = ({ ticket }: { ticket: Ticket }) => {
    const isAvailable = ticket.status === "available";

    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `2px solid ${
              isAvailable ? theme.palette.primary.main : theme.palette.divider
            }`,
            borderRadius: 2,
            p: 2.5,
            transition: "all 0.3s ease-in-out",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: theme.palette.background.paper,
            "&:hover": {
              transform: "translateY(-4px)",
              borderColor: isAvailable
                ? theme.palette.primary.dark
                : theme.palette.divider,
            },
          }}
        >
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  fontSize: "1.1rem",
                  mb: 0.5,
                }}
              >
                {ticket.type}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mb: 1,
                }}
              >
                <ConfirmationNumberIcon sx={{ fontSize: 14 }} />
                ID: {ticket.id}
              </Typography>
              <Chip
                label={getStatusLabel(ticket.status)}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(ticket.status),
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  height: "24px",
                }}
              />
            </Box>

            <Box
              sx={{
                mt: "auto",
                pt: 2,
                borderTop: `1px dashed ${theme.palette.divider}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  display: "block",
                  mb: 0.5,
                }}
              >
                Price
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: isAvailable
                    ? theme.palette.primary.main
                    : theme.palette.text.disabled,
                  fontSize: "1.75rem",
                  lineHeight: 1,
                }}
              >
                {ticket.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    );
  };

  if (!event) return null;

  const formattedDate = formatDate(event.date);
  const formattedTime = formatTime(event.date);
  const dayOfWeek = formatDay(event.date);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 2 },
          maxWidth: { xs: "100%", sm: 800 },
          maxHeight: { xs: "100vh", sm: "90vh" },
          m: { xs: 0, sm: 2 },
          background: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxHeight: { xs: "100vh", sm: "90vh" },
          height: { xs: "100vh", sm: "90vh" },
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* Close Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton
              onClick={handleClose}
              sx={{
                backgroundColor: theme.palette.background.paper,
                "&:hover": {
                  backgroundColor: theme.palette.grey[100],
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Event Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              borderRadius: 2,
              p: { xs: 2.5, sm: 3 },
              mb: 3,
              color: "white",
              flexShrink: 0,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "2rem" },
                mb: 2,
              }}
            >
              {event.name}
            </Typography>

            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CalendarTodayIcon sx={{ fontSize: 20 }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, display: "block", fontSize: "0.75rem" }}
                  >
                    {dayOfWeek.toUpperCase()}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formattedDate} at {formattedTime}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <LocationOnIcon sx={{ fontSize: 20 }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {event.location}
                </Typography>
              </Box>
            </Stack>

            {/* Description */}
            {event.description && (
              <Box
                sx={{
                  mt: 2.5,
                  pt: 2.5,
                  borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.6,
                  }}
                >
                  {event.description}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Tickets Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              Available Tickets ({tickets.length})
            </Typography>

            {ticketsLoading && tickets.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: 1,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress size={40} />
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Loading tickets...
                </Typography>
              </Box>
            ) : tickets.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: 1,
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  No tickets available for this event
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  flex: 1,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
                  <VirtuosoGrid
                    data={tickets}
                    overscan={200}
                    style={{ height: "100%", flex: 1 }}
                    listClassName="tickets-grid-wrapper"
                    itemClassName="ticket-grid-item"
                    endReached={
                      useOptimizedEvents ? handleLoadMoreTickets : undefined
                    }
                    components={{
                      Item: ({ children, ...props }) => (
                        <div {...props}>{children}</div>
                      ),
                      List: React.forwardRef<
                        HTMLDivElement,
                        {
                          children?: React.ReactNode;
                          style?: React.CSSProperties;
                        }
                      >(({ children, style, ...props }, ref) => (
                        <div
                          ref={ref}
                          {...props}
                          style={{
                            ...style,
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: theme.spacing(2),
                          }}
                        >
                          {children}
                        </div>
                      )),
                    }}
                    itemContent={(_index, ticket: Ticket) => (
                      <TicketCard ticket={ticket} />
                    )}
                  />
                  {useOptimizedEvents &&
                    ticketsLoading &&
                    tickets.length > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          display: "flex",
                          justifyContent: "center",
                          py: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          pointerEvents: "none",
                        }}
                      >
                        <CircularProgress size={24} />
                      </Box>
                    )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default EventModal;
