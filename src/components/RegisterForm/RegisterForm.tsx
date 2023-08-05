import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Stepper, Step, StepLabel, Button, TextField, Container, Stack, Avatar, FormControl, InputLabel, MenuItem, Select, Typography, Box } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { MuiFileInput } from "mui-file-input";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import '../shared/css/DatePickerCustom.css';
import { FacebookSignUpButton,GoogleSignUpButton, TwitterSignUpButton } from '../socials/customButtons';
import {signInWithPopup} from 'firebase/auth'
import { auth, twitterprovider, googleprovider } from '../../../firebaseconfig.js';
const steps = ['Profile Info', 'Demographic Info', 'Security Questions']; // Add your desired steps here

const RegisterForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [signUpWithEmailStepper, setSignUpWithEmailStepper] = useState(false);
    const [formData, setFormData] = useState({}); // Store form data
    const [defaultAvatarContent, setDefaultAvatarContent] = useState({ fInitial: 'N', lInitial: 'A' });
    const [value, setValue] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [response, setResponse] = useState({
        email: '',
        token: '',
        uid: '',
    });

    const createSubscription = async (email) =>{
        let response = await fetch("https://6418qzn2i7.execute-api.us-east-1.amazonaws.com/dev/auth/register/subscribe", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({email})
        })
        console.log(response);
        handleAppRedirect()
        return response;
      }
    
      
      const handleAppRedirect = async () => {
        navigate('/auth/login')
    }  
    const handleGoogleSignUp = async () => {
        
        signInWithPopup(auth, googleprovider).then(async (result) => {
            const {displayName, email, photoURL, uid} = result.user;
            const accessToken = result.user.stsTokenManager.accessToken;

            console.log(result.user)
            const data = {
                username: displayName,
                email: email,
                uid: uid,
                profile_pic: photoURL,
            }
            
            if (result.user) {

                const response = await fetch('https://register-kku3a2biga-uc.a.run.app/register/thirdparty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                
                console.log(response);
                await createSubscription(data.email);
                if (response.ok) {
                    await handleAppRedirect(result.user)
                }
            }
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const handleTwitterSignUp = () => {
        signInWithPopup(auth, twitterprovider).then(async (result) => {
            const {displayName, email, photoURL, uid} = result.user;
            const accessToken = result.user.stsTokenManager.accessToken;

            console.log(result.user)
            const data = {
                username: displayName,
                email: email,
                uid: uid,
                profile_pic: photoURL,
            }
            if (result.user) {

                const response = await fetch('https://register-kku3a2biga-uc.a.run.app/register/thirdparty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                await createSubscription(data.email);
                console.log(response);
                if (response.ok) {
                    await handleAppRedirect(result.user)
                }
            }
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const handleChange = (file) => {

        let reader = new FileReader();
        reader.onload = () => {
            setValue(reader.result);
            formData['profile_pic'] = reader.result;
            setFormData(formData);
        }

        if (file) {
            reader.readAsDataURL(file);
        }

        // setValue(newValue);
    };


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setErrorMessage('');
    };

    const handleStepSubmit = () => {
        try {
            // Format the formData object to match the API request body
            const requestBody = {
                "username": formData.username,
                "email": formData.email, // Use a temporary email, as it's not provided in the form data
                "password": formData.password, // Use a strong password here
                "fname": formData.fname,
                "lname": formData.lname,
                "gender": formData.gender, // Replace with the actual gender value from the formData if it's different
                "dob": formData.dob, // Replace with the actual date of birth value from the formData
                "city": formData.city, // Replace with the actual city value from the formData
                "country": formData.country, // Replace with the actual country value from the formData
                "profile_pic": formData.profile_pic, // As the API request expects an empty string for profile_pic
                "security_questions": [
                    {
                        "question": "What city were you born in?",
                        "answer": formData.sec_q1_ans // Replace with the actual answer value from the formData
                    },
                    {
                        "question": "In what city or town did your parents meet?",
                        "answer": formData.sec_q2_ans // Replace with the actual answer value from the formData
                    },
                    {
                        "question": "What was the first concert you attended?",
                        "answer": formData.sec_q3_ans // Replace with the actual answer value from the formData
                    }
                ]
            };

            // Make the API request using the fetch function
            fetch("https://register-kku3a2biga-uc.a.run.app/register/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => response.json())
                .then(async (data) => {
                    if (data.status == true && data.response == "User registered successfully.") {
                        await createSubscription(formData.email);
                        // navigate('/auth/login')
                    }
                    else {
                        setErrorMessage(data.response);
                    }
                })
                .catch(error => {
                    // Handle any errors that occurred during the API request
                    console.error("Error occurred:", error);
                });
        }
        catch (error){
            console.error('Error occurred:', error);
        }
    };



    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleAvatarContentChange = (event) => {
        let key = event.target.name;
        let keyExists = formData[key] !== null && formData[key] !== undefined;
        let validValue = keyExists && formData[key].length > 0 && isNaN(parseFloat(formData[key]))
        if (validValue) {
            if (key === 'fname') {
                let value = event.target.value;
                defaultAvatarContent.fInitial = value[0];
            }
            if (key === 'lname') {
                let value = event.target.value;
                defaultAvatarContent.lInitial = value[0];
            }
            setDefaultAvatarContent(defaultAvatarContent);
        }
    }

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    // repeated
                    <Stack spacing={2}>
                        <TextField onChange={(event) => {
                            handleFormChange(event);
                        }} value={formData['username'] || ''} fullWidth label="Username" id="email" name="username" />
                        <Stack direction="row" spacing={2}>
                            <TextField onChange={(event) => {

                                handleFormChange(event);
                                handleAvatarContentChange(event);
                            }} type="text" value={formData['fname'] || ''} fullWidth label="First Name" id="fname" name="fname"
                                       onBlur={(event) => {
                                           handleAvatarContentChange(event)
                                       }}
                            />
                            <TextField onChange={(event) => {

                                handleFormChange(event);
                                handleAvatarContentChange(event);
                            }} value={formData['lname'] || ''} fullWidth label="Last Name" id="lname" name="lname"
                                       onBlur={(event) => {
                                           handleAvatarContentChange(event)
                                       }} />
                        </Stack>
                        <TextField onChange={(event) => {

                            handleFormChange(event);
                        }} value={formData['email'] || ''} fullWidth label="Email Address" id="email" name="email" />
                        <TextField onChange={(event) => {

                            handleFormChange(event);
                        }} type="password" value={formData['password'] || ''} fullWidth label="Password" id="password" name="password" />

                        <Stack direction="row" spacing={2} alignItems="center">
                            {value === null ? <Avatar sx={{ bgcolor: deepOrange[500] }}>{Object.values(defaultAvatarContent).join('')}</Avatar> : <Avatar src={value} alt="Profile Pic" />}
                            <MuiFileInput
                                placeholder='Insert an image'
                                value={value}
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                                getInputText={(value) => value !== null ? 'Inserted. Click Again to Change' : ''}
                                inputProps={{
                                    accept: "image/png, image/gif, image/jpeg"
                                }}
                            />
                        </Stack>

                    </Stack>

                );
            case 1:
                return (
                    <Stack spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={formData['gender'] || ''}
                                label="Gender"
                                name="gender"
                                onChange={(event) => {

                                    handleFormChange(event);
                                }}
                            >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack direction="row" spacing={2} alignItems="center">

                            <Typography variant="button" gutterBottom> DOB</Typography>
                            <DatePicker onChange={(event) => {
                                let passingEvent = { target: { name: "dob", value: event } }
                                handleFormChange(passingEvent);
                            }} value={formData['dob'] || ''} />
                        </Stack>
                        <TextField onChange={(event) => {
                            handleFormChange(event);
                        }} value={formData['city'] || ''} fullWidth label="City" id="city" name="city" />

                        <TextField onChange={(event) => {
                            handleFormChange(event);
                        }} value={formData['country'] || ''} fullWidth label="Country" id="country" name="country" />

                    </Stack>
                );
            case 2:
                return (<Stack spacing={2}>
                    <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
                        <Stack spacing={1}>
                            <FormControl fullWidth>
                                <InputLabel>Security Question 1</InputLabel>
                                <Select
                                    value={formData['sec_q1'] || ''}
                                    label="Security Question 1"
                                    name="sec_q1"
                                    onChange={(event) => {
                                        handleFormChange(event);
                                    }}
                                >
                                    <MenuItem value={"option 1"}>What city were you born in?</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField onChange={(event) => {
                                handleFormChange(event);
                            }} value={formData['sec_q1_ans'] || ''} fullWidth label="Security Question 1 Answer" id="sec_q1_ans" name="sec_q1_ans"></TextField>

                        </Stack>
                    </Box>
                    <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
                        <Stack spacing={1}>
                            <FormControl fullWidth>
                                <InputLabel>Security Question 2</InputLabel>
                                <Select
                                    value={formData['sec_q2'] || ''}
                                    label="Security Question 2"
                                    name="sec_q2"
                                    onChange={(event) => {
                                        handleFormChange(event);
                                    }}
                                >
                                    <MenuItem value={"option 2"}>In what city or town did your parents meet?</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField onChange={(event) => {
                                handleFormChange(event);
                            }} value={formData['sec_q2_ans'] || ''} fullWidth label="Security Question 2 Answer" id="sec_q2_ans" name="sec_q2_ans"></TextField>

                        </Stack>
                    </Box>
                    <Box sx={{ backgroundColor: '#dfdfdf', padding: 3, borderRadius: 4 }}>
                        <Stack spacing={1}>
                            <FormControl fullWidth>
                                <InputLabel>Security Question 3</InputLabel>
                                <Select
                                    value={formData['sec_q3'] || ''}
                                    label="Security Question 3"
                                    name="sec_q3"
                                    onChange={(event) => {
                                        handleFormChange(event);
                                    }}
                                >
                                    <MenuItem value={"option 3"}>What was the first concert you attended?</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField onChange={(event) => {
                                handleFormChange(event);
                            }} value={formData['sec_q3_ans'] || ''} fullWidth label="Security Question 3 Answer" id="sec_q3_ans" name="sec_q3_ans"></TextField>

                        </Stack>
                    </Box>
                </Stack>)
            default:
                return null;
        }
    };

    return (
        <Container fixed>



            {signUpWithEmailStepper ? (<>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2em 0'
                    }}>{renderStepContent(activeStep)}</div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        {errorMessage && (
                            <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
                        )}
                        <Button onClick={()=>{
                            if(activeStep > 0){
                                handleBack()
                            } else {
                                setSignUpWithEmailStepper(false)
                            }
                        }}>
                            Back
                        </Button>
                        {activeStep < steps.length - 1 ? (
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
                            </Button>) : (
                            <Button variant="contained" color="primary" onClick={handleStepSubmit}>
                                Submit
                            </Button>
                        )}

                    </div>
                </div>
            </>): <>
                <Stack spacing={2}>
                    <Button variant="contained" color="primary" onClick={()=>{
                        setSignUpWithEmailStepper(!signUpWithEmailStepper)
                    }} style={{marginLeft: 5, marginRight: 5}}>
                        Sign Up with Email
                    </Button>
                    <Stack direction="row" spacing={2}>
                        <TwitterSignUpButton onClick={() => handleTwitterSignUp()} />
                        <GoogleSignUpButton onClick={() => handleGoogleSignUp()} />
                    </Stack>
                </Stack>
            </>}
        </Container>
    );
};

export default RegisterForm;
