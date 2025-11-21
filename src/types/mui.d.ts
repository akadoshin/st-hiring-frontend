import "@mui/material/styles";
import "@mui/material/AppBar";
import "@mui/material/Toolbar";
import "@mui/material/Button";
import "@mui/material/Typography";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    pretty: true;
  }
}
