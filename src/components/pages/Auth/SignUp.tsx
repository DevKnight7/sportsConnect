import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { signUp } from "../../../actions/auth.actions";
import { signUpForm } from "../../../shared/customTypes";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required").matches(/^[^-\s][a-zA-Z0-9_\s-]+$/, "Please Enter Alphanumeric Characters"),
  last_name: yup.string().matches(/^[^-\s][a-zA-Z0-9_\s-]+$/, "Please Enter Alphanumeric Characters"),
  username: yup.string()
    .required("Username is required")
    .min(5, "Username should be of minimum 8 characters length")
    .max(10, "Username should be of maximum 10 characters length"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});


const SignUp: React.FunctionComponent = () => {
  const theme = useTheme();

  useEffect(() => {
    document.title = "SignUp-SportsConnect"
  }, [])



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      username:""
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      userSignUp(values, resetForm);
    },
  });

  async function userSignUp(formData: signUpForm, resetForm: any) {
    let response: any = await signUp(formData);
    if (response.status === 201) {
      toast.success(response.data.message);
      resetForm();
      // , {
      // theme: "colored"
      // }
    } else if (response.status > 400) {
      let errors = response.error;
      let error_message = "";
      Object.keys(errors).forEach((key) => {
        error_message += ` ${key} ${errors[key]}.\n`;
      });
      toast.error(error_message);
    } else {
      toast.error("An Unknown error occurred. Please  try again later.");
    }
  }

  return (
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
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="first_name"
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I am a gym person."
            />
          </Grid> */}
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
          Sign Up
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>

            <Link
              to="/login"
              style={{ textDecoration: "none", fontSize: "16px", color: theme.colors.defaultBg }}
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}


export default SignUp;

