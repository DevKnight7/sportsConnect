import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import jsCookie from "js-cookie";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signIn } from "../../../actions/auth.actions";
import { toast } from "react-toastify";
import { signInForm } from "../../../shared/customTypes";
import { useDispatch } from 'react-redux';
import {setIsLoggedIn} from "../../../redux/slices/authSlice"
import {socket} from "../../../utils/socket"


import * as yup from "yup";
import { baseApi } from "../../../features/baseApi";


const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  // rememberMe: yup.boolean(),
});

const SignIn: React.FunctionComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = "Login-SportsConnect";
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      userSignIn(values, resetForm);
    },
  });

  // function onLoginSuccess() {
  //   toast.success("Login Success!");
  //   jsCookie.set("login", "yes");
  //   // resetForm();
  //   navigate("/dashboard");
  // }

  async function userSignIn(formData: signInForm, resetForm: any) {
    let response: any = await signIn(formData);
    // console.log(response);
    if (response.status === 200) {
      toast.success("Login Success!");
      console.log(response)
      // jsCookie.set("login", "yes");
      let respData= response.data.data
      resetForm();
      dispatch(setIsLoggedIn(respData))

      socket.loginAction(`${respData?.first_name} ${respData?.last_name}` , respData.id)

      dispatch(baseApi.util.resetApiState());

      navigate("/dashboard");

    } else if (response.status > 400) {
      if (response.status === 401) {
        toast.error("Invalid credentials")
        return;
      }
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
        Sign in
      </Typography>
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
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              value="remember"
              name="rememberMe"
              color="primary"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
            />
          }
          label="Remember me"
        /> */}
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
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link
              to="/forgot"
              style={{
                textDecoration: "none",
                fontSize: "16px",
                color: theme.colors.defaultBg,
              }}
            >
              Forgot Password?
            </Link>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                fontSize: "16px",
                color: theme.colors.defaultBg,
              }}
            >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
