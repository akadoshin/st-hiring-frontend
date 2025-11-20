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

// declare module "@mui/material/styles" {
//   interface TypographyVariants {
//     eventTitle: React.CSSProperties;
//     eventDescription: React.CSSProperties;
//     eventLocation: React.CSSProperties;
//     eventLabel: React.CSSProperties;
//     dateMonth: React.CSSProperties;
//     dateDay: React.CSSProperties;
//     dateWeekday: React.CSSProperties;
//     timeChip: React.CSSProperties;
//     buttonText: React.CSSProperties;
//   }

//   interface TypographyVariantsOptions {
//     eventTitle?: React.CSSProperties;
//     eventDescription?: React.CSSProperties;
//     eventLocation?: React.CSSProperties;
//     eventLabel?: React.CSSProperties;
//     dateMonth?: React.CSSProperties;
//     dateDay?: React.CSSProperties;
//     dateWeekday?: React.CSSProperties;
//     timeChip?: React.CSSProperties;
//     buttonText?: React.CSSProperties;
//   }
// }

// declare module "@mui/material/Typography" {
//   interface TypographyPropsVariantOverrides {
//     eventTitle: true;
//     eventDescription: true;
//     eventLocation: true;
//     eventLabel: true;
//     dateMonth: true;
//     dateDay: true;
//     dateWeekday: true;
//     timeChip: true;
//     buttonText: true;
//   }
// }
