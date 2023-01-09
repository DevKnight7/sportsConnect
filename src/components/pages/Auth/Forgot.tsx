import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {  useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { forgotUserPassword } from "../../../actions/auth.actions";

import * as yup from "yup";
import { toast } from "react-toastify";

type FormType = "signIn" | "signUp" | "forgot" | "activate" | "reset";

// interface Props {
//   setCurrentForm: React.Dispatch<React.SetStateAction<FormType>>;
// }

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const Forgot :React.FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Forgot Password - SportsConnect";
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      forgotPassword(values, resetForm);
    },
  });

  async function forgotPassword(values: { email: string }, resetForm: any) {

    let resp = await forgotUserPassword(values.email);
    toast.success(resp.message);
    resetForm();
    navigate("/login");
    
  }

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: theme.colors.defaultBg }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      <p>
        Type In Your Email below and We'll send you instructions to reset your
        password.
      </p>

      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoFocus
        />

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
          Submit
        </Button>
        <Grid container>
          <Grid item>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontSize: "16px",
                color: theme.colors.defaultBg,
              }}
            >
              Back to Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}


export default Forgot;
