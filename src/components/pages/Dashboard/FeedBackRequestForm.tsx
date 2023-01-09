import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { toast } from 'react-toastify';
import { useTheme } from "@mui/material/styles";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AsyncSelect from 'react-select/async';
import './formStyles.css'
import { useGetSportsQuery } from '../../../features/sportsApi';
import { useCreateFeedbackRequestMutation } from '../../../features/feedbackApi';
//custom imports
import {

    searchUserByName,
} from "../../../actions/users.actions";


interface User {
    id: number
    name: string
    username: string
}

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        //   borderBottom: '1px dotted pink',
        color: "black",
        backgroundColor: "white",
        padding: 20,
        opacity: 1,
        zIndex: 100,
        "&:hover": {
            borderColor: "red",
            color: "red"
        }
    }),

    input: (styles: any) => ({ ...styles, borderColor: 'gray', minHeight: '48px', width: '300px' }),
    singleValue: (provided: any, state: any) => {
        const opacity = 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition, color: "inherit" };
    },
    container: (styles: any) => ({ ...styles, borderColor: 'gray', minHeight: '48px', width: '300' }),

}


const FeedBackRequestForm: React.FunctionComponent = () => {
    const theme = useTheme();
    //states for Select Sport Field
    const [selectedSport, setSelectedSport] = useState<number>(0);
    const { data: sportsList} = useGetSportsQuery();
    const [creatingFeedbackRequest, { isLoading: isCreatingFeedbackRequest }] = useCreateFeedbackRequestMutation();
    //States for select user field
    const [searchInputValue, setInputValue] = useState<User>();


    const handleSelectChange = (
        event: SelectChangeEvent<typeof selectedSport>
    ) => {
        const {
            target: { value },
        } = event;
        setSelectedSport(Number(value));
    };

    const loadOptions = (inputValue: string, callback: (options: User[]) => void) => {
        const pattern = /^[a-zA-Z0-9 ]+$/
        if (inputValue.length > 0  && pattern.test(inputValue) ) {
            let ob: User = { id: 0, name: "", username: "" }
            setInputValue(ob)
            searchUserByName(inputValue).then(resp => {
                let users: User[] = resp.data || [];
                callback(users)
            }).catch(err => {
                callback([])
            });
        } else {
            callback([])
        }
    }

    function handleUserSelectChange(event: any) {
        setInputValue(event)

    }

    function resetForm(){
        let ob: User = { id: 0, name: "", username: "" }
        setInputValue(ob)
        setSelectedSport(0)
    }

    async function handleFeedbackRequestForm() {
        if (searchInputValue && selectedSport !== 0) {
            let requestObject = {
                requested_to_id: searchInputValue.id,
                sport_id: selectedSport
            }

            if (!isCreatingFeedbackRequest) {
                creatingFeedbackRequest( { createFeedbackRequestPayload: requestObject} ).unwrap().then(() => {  
                  toast.success("Feedback Request has been created successfully!");
                  resetForm()     
              })
            }  
         }

    }

    return (
        // <Paper elevation={8} sx={{ padding: 5, backgroundColor: "#ffffff" }}>
        <Card elevation={3} >
            <CardHeader
                title="Request Feedback"
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative',
                        mt: 2
                    }}
                    style={{ justifyContent: 'center' }}
                    component="form"
                >
                    <p>Select User To Request From</p>


                    <AsyncSelect
                        cacheOptions
                        value={searchInputValue}
                        loadOptions={loadOptions}
                        defaultOptions
                        styles={customStyles}
                        getOptionLabel={(e) => `${e.name.toString()}  ${'@'.concat(e.username.toString())} `}
                        
                        onChange={event => handleUserSelectChange(event)}
                    />


                    <p>Select Sport To Request For</p>
                    <FormControl sx={{ mt: 3, width: 300 }}>


                        <Select
                            // labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedSport}
                            // label="Age"
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={0} key="select">
                                Select Sport
                            </MenuItem>
                            {sportsList && sportsList.length > 0 && sportsList.map((sp) => (
                                <MenuItem value={sp.id} key={sp.name}>
                                    {sp.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ mt: 3, width: 300 }}>

                        <Button
                            variant="contained"
                            onClick={() => {
                                handleFeedbackRequestForm();
                            }}
                            style={{
                                //   height: "80%",
                                // width: "82%",
                                marginTop: "15px",
                                borderRadius: "25px",
                                backgroundColor: theme.colors.defaultBg,
                            }}
                        >
                            Request Feedback
                        </Button>
                    </FormControl>

                </Box>
            </CardContent>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
            </Box>
        </Card>
        // </Paper>


    )

}


export default FeedBackRequestForm;
