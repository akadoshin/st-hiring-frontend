import {
  Card,
  CardContent,
  Stack,
  useTheme,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";

interface CardBaseProps {
  headerContent: ReactNode;
  bodyContent: ReactNode;
  cardSx?: SxProps<Theme>;
  cardContentSx?: SxProps<Theme>;
}

const CardBase = ({
  headerContent,
  bodyContent,
  cardSx,
  cardContentSx,
}: CardBaseProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        overflow: "hidden",
        position: "relative",
        background: theme.palette.background.paper,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: theme.palette.primary.main,
        },
        ...cardSx,
      }}
    >
      <Stack
        sx={{
          background: theme.palette.primary.light,
          p: { xs: 2, sm: 3 },
          position: "relative",
          borderBottom: `2px dashed ${theme.palette.divider}`,
          // minHeight: "140px",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2.5 }}
          alignItems={{ xs: "flex-start", sm: "flex-start" }}
        >
          {headerContent}
        </Stack>
      </Stack>

      <CardContent
        sx={{
          p: { xs: 2, sm: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          ...cardContentSx,
        }}
      >
        {bodyContent}
      </CardContent>
    </Card>
  );
};

export default CardBase;
