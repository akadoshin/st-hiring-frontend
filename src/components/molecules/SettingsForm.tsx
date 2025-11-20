import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  Stack,
  Radio,
} from "@mui/material";

import type { FormikProps } from "formik";
import type { UserSettings } from "../../types/settings";

interface SettingsFormProps {
  formik: FormikProps<UserSettings>;
}

const SettingsForm = ({ formik }: SettingsFormProps) => {
  const deliveryMethods = formik.values.deliveryMethods || [];

  const handleDefaultChange = (index: number) => {
    const updated = deliveryMethods.map((method, i) => ({
      ...method,
      isDefault: i === index,
    }));
    formik.setFieldValue("deliveryMethods", updated);
  };

  return (
    <Stack spacing={4}>
      <Stack gap={2}>
        <Typography
          variant="subtitle1"
          color="secondary.main"
          fontWeight="bold"
        >
          Delivery Methods
        </Typography>
        <Stack gap={2}>
          {deliveryMethods.map((method, index) => (
            <Box
              key={method.enum}
              sx={{
                p: 2.5,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: "16px",
                backgroundColor: "grey.50",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: (theme) => theme.palette.primary.main,
                  backgroundColor: (theme) => theme.palette.primary.light,
                },
              }}
            >
              <Stack spacing={2}>
                {(() => {
                  const fieldName = `deliveryMethods.${index}.name` as const;
                  const touched = formik.touched.deliveryMethods?.[index]?.name;

                  const error =
                    typeof formik.errors.deliveryMethods?.[index] === "object"
                      ? formik.errors.deliveryMethods[index]?.name
                      : undefined;

                  return (
                    <TextField
                      fullWidth
                      label="Method Name"
                      value={method.name}
                      onChange={(e) => {
                        const updated = [...deliveryMethods];
                        updated[index] = {
                          ...updated[index],
                          name: e.target.value,
                        };
                        formik.setFieldValue("deliveryMethods", updated);
                      }}
                      onBlur={() => {
                        formik.setFieldTouched(fieldName, true);
                      }}
                      error={touched && Boolean(error)}
                      helperText={touched && error}
                      size="small"
                    />
                  );
                })()}
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={method.selected}
                        onChange={(e) => {
                          const updated = [...deliveryMethods];
                          updated[index] = {
                            ...updated[index],
                            selected: e.target.checked,
                          };
                          formik.setFieldValue("deliveryMethods", updated);
                        }}
                      />
                    }
                    label="Selected"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={method.isDefault}
                        onChange={() => handleDefaultChange(index)}
                        value={method.enum}
                      />
                    }
                    label="Set as Default"
                  />
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>

      {/* Fulfillment Format */}
      <Stack gap={2}>
        <Typography
          variant="subtitle1"
          color="secondary.main"
          fontWeight="bold"
        >
          Fulfillment Format
        </Typography>
        <Stack gap={2}>
          <Stack gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.fulfillmentFormat?.rfid || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "fulfillmentFormat.rfid",
                      e.target.checked
                    )
                  }
                />
              }
              label="RFID"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.fulfillmentFormat?.print || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "fulfillmentFormat.print",
                      e.target.checked
                    )
                  }
                />
              }
              label="Print"
            />
          </Stack>
        </Stack>

        {/* Printer */}
        <Stack gap={2}>
          <Typography
            variant="subtitle1"
            color="secondary.main"
            fontWeight="bold"
          >
            Printer
          </Typography>
          <Stack gap={2}>
            <TextField
              fullWidth
              label="Printer ID"
              value={formik.values.printer?.id || ""}
              onChange={(e) =>
                formik.setFieldValue("printer.id", e.target.value || null)
              }
              onBlur={() => {
                formik.setFieldTouched("printer.id", true);
              }}
              error={
                formik.touched.printer?.id && Boolean(formik.errors.printer?.id)
              }
              helperText={
                formik.touched.printer?.id && formik.errors.printer?.id
              }
            />
          </Stack>
        </Stack>

        {/* Printing Format */}
        <Stack gap={2}>
          <Stack gap={2}>
            <Stack gap={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.printingFormat?.formatA || false}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "printingFormat.formatA",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Format A"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.printingFormat?.formatB || false}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "printingFormat.formatB",
                        e.target.checked
                      )
                    }
                  />
                }
                label="Format B"
              />
            </Stack>
          </Stack>
        </Stack>

        {/* Scanning */}
        <Stack gap={2}>
          <Typography
            variant="subtitle1"
            color="secondary.main"
            fontWeight="bold"
          >
            Scanning
          </Typography>
          <Stack gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.scanning?.scanManually || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "scanning.scanManually",
                      e.target.checked
                    )
                  }
                />
              }
              label="Scan Manually"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.scanning?.scanWhenComplete || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "scanning.scanWhenComplete",
                      e.target.checked
                    )
                  }
                />
              }
              label="Scan When Complete"
            />
          </Stack>
        </Stack>

        {/* Payment Methods */}
        <Stack gap={2}>
          <Typography
            variant="subtitle1"
            color="secondary.main"
            fontWeight="bold"
          >
            Payment Methods
          </Typography>
          <Stack gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.paymentMethods?.cash || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "paymentMethods.cash",
                      e.target.checked
                    )
                  }
                />
              }
              label="Cash"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.paymentMethods?.creditCard || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "paymentMethods.creditCard",
                      e.target.checked
                    )
                  }
                />
              }
              label="Credit Card"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.paymentMethods?.comp || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "paymentMethods.comp",
                      e.target.checked
                    )
                  }
                />
              }
              label="Comp"
            />
          </Stack>
        </Stack>

        {/* Ticket Display */}
        <Stack gap={2}>
          <Typography
            variant="subtitle1"
            color="secondary.main"
            fontWeight="bold"
          >
            Ticket Display
          </Typography>
          <Stack gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    formik.values.ticketDisplay?.leftInAllotment || false
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      "ticketDisplay.leftInAllotment",
                      e.target.checked
                    )
                  }
                />
              }
              label="Left In Allotment"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.ticketDisplay?.soldOut || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "ticketDisplay.soldOut",
                      e.target.checked
                    )
                  }
                />
              }
              label="Sold Out"
            />
          </Stack>
        </Stack>

        {/* Customer Info */}
        <Stack>
          <Typography
            variant="subtitle1"
            color="secondary.main"
            fontWeight="bold"
          >
            Customer Info
          </Typography>
          <Stack gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.customerInfo?.active || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "customerInfo.active",
                      e.target.checked
                    )
                  }
                />
              }
              label="Active"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.customerInfo?.basicInfo || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "customerInfo.basicInfo",
                      e.target.checked
                    )
                  }
                />
              }
              label="Basic Info"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.customerInfo?.addressInfo || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "customerInfo.addressInfo",
                      e.target.checked
                    )
                  }
                />
              }
              label="Address Info"
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SettingsForm;
