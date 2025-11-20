import { Chip, Stack, Typography, Button, useTheme, Box } from "@mui/material";

import CardBase from "../atoms/CardBase";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppState";
import { openEventModal } from "../../store/stateSlice";

import type { Event } from "../../types/event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  formatMonth,
  getDay,
  formatTime,
  formatDayShort,
} from "../../utils/dateUtils";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const useOptimizedEvents = useAppSelector(
    (state) => state.state.useOptimizedEvents
  );

  const dateInfo = {
    month: formatMonth(event.date),
    day: getDay(event.date),
    time: formatTime(event.date),
    weekday: formatDayShort(event.date),
  };

  const handleViewTicket = () => {
    // Pass tickets only when not using optimized events
    const tickets = !useOptimizedEvents ? event.availableTickets : undefined;
    dispatch(openEventModal({ eventId: event.id, tickets }));
  };

  const headerContent = (
    <Stack direction="row" alignItems="center" spacing={2.5}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          borderRadius: { xs: "12px", sm: "16px" },
          background: theme.palette.background.paper,
          border: `2px solid ${theme.palette.primary.main}`,
          p: 1,
          px: 2.25,
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          color={theme.palette.primary.main}
          letterSpacing="0.5px"
          textTransform="uppercase"
        >
          {dateInfo.month}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={800}
          color={theme.palette.primary.dark}
          lineHeight={1}
        >
          {dateInfo.day}
        </Typography>
        <Typography
          variant="caption"
          fontWeight={600}
          color={theme.palette.grey[500]}
          textTransform="uppercase"
        >
          {dateInfo.weekday}
        </Typography>
      </Stack>

      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        spacing={1.5}
        minHeight="100%"
      >
        <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
          {event.name}
        </Typography>
        <Box>
          <Chip
            label={dateInfo.time}
            icon={<AccessTimeIcon />}
            size="small"
            color="primary"
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.primary.main,
              borderRadius: "8px",
              border: `1.5px solid ${theme.palette.primary.main}`,
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );

  const bodyContent = (
    <Stack direction="column" spacing={2}>
      <Stack sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
            color: "grey.500",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: { xs: 2, sm: 3 },
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.description}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        mb={{ xs: 2, sm: 3 }}
      >
        <LocationOnIcon
          sx={{
            fontSize: 20,
            color: "grey.500",
          }}
        />
        <Typography
          variant="body2"
          fontWeight={500}
          color={theme.palette.text.secondary}
        >
          {event.location}
        </Typography>
      </Stack>

      <Stack
        direction="column"
        alignItems="flex-end"
        spacing={{ xs: 1, sm: 1.5 }}
      >
        <Button onClick={handleViewTicket} variant="pretty">
          View Tickets&nbsp;
          {event.availableTickets?.length &&
            `(${event.availableTickets.length})`}
        </Button>
      </Stack>
    </Stack>
  );

  return <CardBase headerContent={headerContent} bodyContent={bodyContent} />;
};

export default EventCard;
