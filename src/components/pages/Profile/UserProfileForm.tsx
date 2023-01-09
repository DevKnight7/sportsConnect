import { useEffect } from 'react';
import {
    Button,
    Grid,
    TextField,
    useTheme
} from '@mui/material';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '../../../features/usersApi';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { updateProfileForm} from "../../../shared/customTypes";


const validationSchema = yup.object({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string(),
    username: yup.string()
        .required("Username is required")
        .min(5, "Username should be of minimum 8 characters length")
        .max(10, "Username should be of maximum 10 characters length"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required")
});

interface RouteProps {
    setCurrentUser: React.Dispatch<React.SetStateAction<{
        imageUrl: string;
        name: string;
    }>>
}


const UserProfileDetails: React.FunctionComponent<RouteProps> = ({ setCurrentUser }) => {
    const theme = useTheme();
    const { data: profile } = useGetUserProfileQuery();
    const [updateUserProfile, { isLoading: isUserProfileUpdating }] = useUpdateProfileMutation();

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            profile_pic: ""
        },
        validationSchema: validationSchema,
        onSubmit: (FormValues, { resetForm }) => {
            updateProfile(FormValues, resetForm);
            setCurrentUser(prevValue => {
                return {
                    ...prevValue,
                    name: `${FormValues.first_name}  ${FormValues.last_name}`
                }
            });
        },

    });

    useEffect(() => {
        if (profile) {
            formik.setValues(profile);
            setCurrentUser(prevValue => {
        return {
            imageUrl: profile.profile_pic,
            name: `${profile.first_name}  ${profile.last_name}`
        }
    });
        }
    }, [profile]);

    async function updateProfile(formData: updateProfileForm, resetForm: any) {

        if (!isUserProfileUpdating) {
            let userprofile = formData
            updateUserProfile({ userprofile }).unwrap().then(() => {
              toast.success("Profile Updated Successfully!");
            })
          }
    }

    return (

        <form
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
        >


            <Grid container spacing={2} >
                <Grid
                    item
                    lg={6}
                    md={6}
                    xs={12}
                    sm={12}

                >
                    <TextField
                        fullWidth
                        label="First name"
                        name="first_name"
                        required
                        variant="standard"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.first_name && Boolean(formik.errors.first_name)
                        }
                        helperText={formik.touched.first_name && formik.errors.first_name}
                    />
                </Grid>

                <Grid
                    item

                    lg={6}
                    md={6}
                    xs={12}
                    sm={12}

                >
                    <TextField
                        fullWidth
                        label="Last name"
                        name="last_name"
                        required
                        variant="standard"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.last_name && Boolean(formik.errors.last_name)
                        }
                        helperText={formik.touched.last_name && formik.errors.last_name}
                    />
                </Grid>

                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                    sm={12}
                >
                    <TextField
                        fullWidth
                        label="User Name"
                        name="username"
                        required
                        variant="standard"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                    sm={12}

                >
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        required
                        variant="standard"

                        disabled

                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>

                <Grid
                    container
                    item
                    sx={{
                        display: 'flex',

                        justifyContent: 'flex-end',

                        p: 2
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: theme.colors.defaultBg,
                            "&:hover": {
                                backgroundColor: theme.colors.defaultBg
                            }
                        }
                        }
                        variant="contained"
                        type="submit"
                    >
                        Save details
                    </Button>
                </Grid>
            </Grid>
        </form>

    );
};

export default UserProfileDetails;
