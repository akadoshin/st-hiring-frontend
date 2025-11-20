import { useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";

import { useFormik } from "formik";
import * as yup from "yup";

import { useAppState } from "../../hooks/useAppState";
import {
  useUpdateSettingsMutation,
  useGetSettingsQuery,
} from "../../store/api";
import SettingsForm from "../molecules/SettingsForm";

import type { UserSettings } from "../../types/settings";

const validationSchema = yup.object({
  deliveryMethods: yup.array().of(
    yup.object({
      name: yup.string().required("Method name is required"),
      enum: yup.string().required(),
      order: yup.number().required(),
      isDefault: yup.boolean().required(),
      selected: yup.boolean().required(),
    })
  ),
  fulfillmentFormat: yup.object({
    rfid: yup.boolean().required(),
    print: yup.boolean().required(),
  }),
  printer: yup.object({
    id: yup.string().nullable(),
  }),
  printingFormat: yup.object({
    formatA: yup.boolean().required(),
    formatB: yup.boolean().required(),
  }),
  scanning: yup.object({
    scanManually: yup.boolean().required(),
    scanWhenComplete: yup.boolean().required(),
  }),
  paymentMethods: yup.object({
    cash: yup.boolean().required(),
    creditCard: yup.boolean().required(),
    comp: yup.boolean().required(),
  }),
  ticketDisplay: yup.object({
    leftInAllotment: yup.boolean().required(),
    soldOut: yup.boolean().required(),
  }),
  customerInfo: yup.object({
    active: yup.boolean().required(),
    basicInfo: yup.boolean().required(),
    addressInfo: yup.boolean().required(),
  }),
});

const SettingsDrawer = () => {
  const { settingsDrawerOpen, clientId, closeSettingsDrawer } = useAppState();
  const [updateSettingsMutation] = useUpdateSettingsMutation();

  const {
    data: fetchedSettings,
    isLoading: isLoadingSettings,
    error: fetchError,
  } = useGetSettingsQuery(clientId, {
    skip: !settingsDrawerOpen || !clientId || clientId <= 0,
  });

  const formik = useFormik<UserSettings>({
    initialValues: fetchedSettings ?? {},
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        await updateSettingsMutation({ clientId, settings: values }).unwrap();
        closeSettingsDrawer();
      } catch (error) {
        console.error("Failed to save settings to API:", error);
      }
    },
  });

  useEffect(() => {
    if (fetchedSettings && settingsDrawerOpen) {
      formik.setValues(fetchedSettings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedSettings, settingsDrawerOpen]);

  const handleClose = () => {
    closeSettingsDrawer();
    formik.resetForm();
  };

  return (
    <Drawer
      anchor="right"
      open={settingsDrawerOpen}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          width: { xs: "100%", sm: 480, md: 520 },
          maxWidth: "100%",
        },
      }}
    >
      <Stack
        direction="column"
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ height: "100%" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={{ xs: 2, sm: 3 }}
          color="white"
          bgcolor={(theme) => theme.palette.secondary.main}
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            <SettingsIcon fontSize="medium" />
            <Typography variant="h6" fontWeight={700}>
              Settings
            </Typography>
          </Stack>
          <IconButton
            size="medium"
            onClick={handleClose}
            sx={{
              color: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                transform: "rotate(90deg)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack
          direction="column"
          flexGrow={1}
          overflow="auto"
          p={{ xs: 2, sm: 3 }}
        >
          {isLoadingSettings ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
            >
              <CircularProgress />
            </Stack>
          ) : fetchError ? (
            <Typography variant="body1" color="error.main">
              Failed to load settings. Please try again.
            </Typography>
          ) : (
            <SettingsForm formik={formik} />
          )}
        </Stack>

        <Box borderTop={1} borderColor="divider" p={2} bgcolor="grey.50">
          <Stack direction="row" gap={2} justifyContent="flex-end">
            <Button
              type="button"
              variant="outlined"
              onClick={handleClose}
              size="large"
            >
              Cancel
            </Button>
            <Button type="submit" variant="pretty" size="large">
              Save Settings
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default SettingsDrawer;
