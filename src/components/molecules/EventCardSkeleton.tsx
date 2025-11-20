import { Stack, Skeleton } from "@mui/material";
import CardBase from "../atoms/CardBase";

const EventCardSkeleton = () => {
  const headerContent = (
    <Stack direction="row" alignItems="center" spacing={1.5} flex={1}>
      <Skeleton
        variant="rectangular"
        sx={{
          width: { xs: "60px", sm: "70px" },
          height: { xs: "60px", sm: "80px" },
          minWidth: { xs: "60px", sm: "70px" },
          borderRadius: { xs: "12px", sm: "16px" },
        }}
      />

      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        flex={1}
        spacing={1.5}
      >
        <Skeleton
          variant="text"
          sx={{
            width: "80%",
            height: { xs: "20px", sm: "24px" },
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "80px",
            height: { xs: "24px", sm: "28px" },
            borderRadius: "8px",
          }}
        />
      </Stack>
    </Stack>
  );

  const bodyContent = (
    <>
      <Stack sx={{ mb: { xs: 2, sm: 3 } }}>
        <Skeleton
          variant="text"
          sx={{
            width: "100%",
            height: "18px",
            mb: 1,
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            width: "90%",
            height: "18px",
            mb: { xs: 0, sm: 1 },
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            width: "75%",
            height: "18px",
            display: { xs: "none", sm: "block" },
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 0.5, sm: 1 }}
        sx={{ mb: { xs: 2, sm: 3 } }}
      >
        <Skeleton
          variant="circular"
          sx={{
            width: { xs: "16px", sm: "16px" },
            height: { xs: "16px", sm: "16px" },
          }}
        />
        <Skeleton
          variant="text"
          sx={{
            width: "60%",
            height: "16px",
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <Skeleton
          variant="rectangular"
          sx={{
            width: "120px",
            height: { xs: "40px", sm: "48px" },
            borderRadius: "24px",
          }}
        />
      </Stack>
    </>
  );

  return (
    <CardBase
      headerContent={headerContent}
      bodyContent={bodyContent}
      cardSx={{ height: "auto" }}
      cardContentSx={{ flex: "none" }}
    />
  );
};

export default EventCardSkeleton;
