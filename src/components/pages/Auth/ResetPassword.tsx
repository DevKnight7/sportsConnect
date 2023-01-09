import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {  Navigate, useLocation , useNavigate } from "react-router-dom";
import {  useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { resetUserPassword } from "../../../actions/auth.actions";
import { resetPasswordForm } from "../../../shared/customTypes";

import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPassword: React.FunctionComponent = () => {
  const theme = useTheme();
  let params = useQuery();
  let resetCode = params.get("code");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetPassword(values.password, resetForm);
    },
  });

  useEffect(() => {
    document.title = "Reset Password - SportsConnect";
  }, []);

  async function resetPassword(password: string, resetForm: any) {
    console.log(password);
    if (resetCode) {
      let resetData: resetPasswordForm = { code: resetCode, new_password:password };
      let activeResp = await resetUserPassword(resetData);

      if (activeResp.status === 200) {
        toast.success("Password reset successfully.!");
      } else {
        toast.error(`Password reset failed. Error:${activeResp.message}.`);
      }
      navigate("/login");
    }
  }

  return (
    <>
      {!resetCode && <Navigate to="/login" replace={true} />}

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.colors.defaultBg }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                id="passwordConfirmation"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                error={
                  formik.touched.passwordConfirmation &&
                  Boolean(formik.errors.passwordConfirmation)
                }
                helperText={
                  formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: theme.colors.defaultBg,
              color: "white",
              "&:hover": {
                backgroundColor: theme.colors.defaultBg,
                color: "#white",
              },
            }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
