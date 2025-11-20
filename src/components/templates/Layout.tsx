import { Container, Stack } from "@mui/material";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import SettingsDrawer from "../organisms/SettingsDrawer";
import EventModal from "../organisms/EventModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: { xs: 3, sm: 4, md: 5 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Container>
      <Footer />
      <SettingsDrawer />
      <EventModal />
    </Stack>
  );
};

export default Layout;
