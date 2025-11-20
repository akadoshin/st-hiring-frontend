import { Box, Container, Typography, Link, Stack } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: "white",
        py: { xs: 4, sm: 5 },
        mt: "auto",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        },
      }}
    >
      <Container maxWidth="lg">
        <Stack alignItems="center" gap={1}>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.95)",
              letterSpacing: "0.3px",
            }}
          >
            Made with
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                color: (theme) => theme.palette.error.main,
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": {
                    transform: "scale(1)",
                  },
                  "50%": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <FavoriteIcon
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  fill: "currentColor",
                }}
              />
            </Box>
            by
            <Box
              component="span"
              sx={{
                fontWeight: 600,
                background: (theme) =>
                  `linear-gradient(45deg, white, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Jhon Anderson Monroy
            </Box>
          </Typography>
          <Link
            href="https://github.com/akadoshin"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              color: "rgba(255, 255, 255, 0.7)",
              textDecoration: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "rgba(255, 255, 255, 0.95)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <GitHubIcon
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            />
            <Typography component="span" variant="caption" fontSize="small">
              Akadoshin
            </Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
