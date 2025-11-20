import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#139DF4",
      light: "rgba(19, 157, 244, 0.08)",
      dark: "#0c7fd1",
    },
    secondary: {
      main: "#202867",
      light: "rgba(32, 40, 103, 0.1)",
      dark: "#1a1f52",
    },
    text: {
      primary: "#1e293b",
      secondary: "#475569",
      disabled: "#94a3b8",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    divider: "rgba(0, 0, 0, 0.06)",
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          position: "sticky",
          elevation: 2,
          backgroundColor: theme.palette.secondary.main,
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            justifyContent: "space-between",
            minHeight: { xs: 72, sm: 80, md: 88 },
            py: { xs: 1, sm: 1.5 },
            px: { xs: 0 },
          }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.06)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            borderRadius: theme.shape.borderRadius,
          }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            borderRadius: theme.shape.borderRadius,
            fontWeight: 700,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              "& .MuiSvgIcon-root": {
                transform: "rotate(90deg)",
              },
            },
          }),
      },
      variants: [
        {
          props: { variant: "pretty" },
          style: ({ theme }) => ({
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: "white",
            "&:hover": {
              scale: "1.05",
              transition: "all 0.3s ease",
              boxShadow: theme.shadows[4],
            },
          }),
        },
      ],
    },
  },
});

export default theme;
