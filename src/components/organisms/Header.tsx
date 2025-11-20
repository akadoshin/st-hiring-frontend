import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  TextField,
  Stack,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { useAppState } from "../../hooks/useAppState";

const Header = () => {
  const { clientId, setClientId, openSettingsDrawer } = useAppState();

  const handleClientIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      return;
    }

    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setClientId(numericValue);
    }
  };

  const handleClientIdBlur = () => {
    if (clientId < 1) {
      setClientId(1);
    }
  };

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar>
          <Box
            component="img"
            src="https://c.ststat.net/content/seeticketsv2/eventim/svgs/see-by-eventim-white-yellow.svg"
            alt="See Tickets Logo"
            sx={{
              height: { xs: 48, sm: 56, md: 64 },
              width: "auto",
            }}
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              type="number"
              label="Client ID"
              value={clientId}
              onChange={handleClientIdChange}
              onBlur={handleClientIdBlur}
              inputProps={{ min: 1, step: 1 }}
              size="small"
              sx={{
                width: { xs: 100, sm: 120 },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "& input": {
                    color: "white",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.7)",
                      opacity: 1,
                    },
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "rgba(255, 255, 255, 0.7)",
                  "&.Mui-focused": {
                    color: "rgba(255, 255, 255, 0.9)",
                  },
                },
              }}
            />
            <Button
              onClick={openSettingsDrawer}
              variant="outlined"
              size="large"
              startIcon={
                <SettingsIcon
                  sx={{
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    transition: "transform 0.3s ease",
                  }}
                />
              }
              sx={{
                color: "white",
              }}
            >
              Settings
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
